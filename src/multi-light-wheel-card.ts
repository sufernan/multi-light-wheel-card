import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";

interface MultiLightWheelCardEntityConfig {
  entity: string;
  icon?: string;
}

interface MultiLightWheelCardConfig {
  type: string;
  title?: string;
  showTitle?: boolean | string;
  show_title?: boolean | string;
  entities: Array<string | MultiLightWheelCardEntityConfig>;
  icon?: string;
  buttonColumns?: number | string;
  button_columns?: number | string;
  columns?: number | string;
}

type WheelMode = "color" | "white";

interface Marker {
  entityId: string;
  name: string;
  icon: string;
  hue: number;
  saturation: number;
  brightness: number;
  colorTempKelvin: number | null;
  minColorTempKelvin: number;
  maxColorTempKelvin: number;
  x: number;
  y: number;
  color: string;
  state: string;
}

interface MarkerGroup {
  id: string;
  markers: Marker[];
  entityIds: string[];
  x: number;
  y: number;
  hue: number;
  saturation: number;
  color: string;
  count: number;
}

@customElement("multi-light-wheel-card")
export class MultiLightWheelCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: MultiLightWheelCardConfig;
  @state() private markers: Marker[] = [];
  @state() private activeEntityId: string | null = null;
  @state() private activeEntityIds: string[] = [];
  @state() private expandedGroupId: string | null = null;
  @state() private brightnessExpanded = false;
  @state() private wheelMode: WheelMode = "color";

  private readonly wheelSize = 260;
  private readonly wheelRadius = 120;
  private readonly center = 130;
  private readonly groupDistancePx = 32;
  private readonly dragThresholdPx = 10;

  private ignoreHassUpdatesUntil = 0;

  public setConfig(config: MultiLightWheelCardConfig): void {
    if (!config.entities || !Array.isArray(config.entities)) {
      throw new Error("You need to define entities");
    }

    if (!config.entities.length) {
      throw new Error("You need to define at least one entity");
    }

    this.config = config;
  }

  protected updated(changedProps: PropertyValues): void {
    if (changedProps.has("hass")) {
      if (Date.now() < this.ignoreHassUpdatesUntil) {
        return;
      }

      this.updateMarkersFromEntities();
    }
  }

  private pauseHassUpdates(ms = 900): void {
    this.ignoreHassUpdatesUntil = Date.now() + ms;
  }

  private getEntityId(
  entityConfig: string | MultiLightWheelCardEntityConfig
): string {
  return typeof entityConfig === "string" ? entityConfig : entityConfig.entity;
}

  private getEntityIcon(
    entityConfig: string | MultiLightWheelCardEntityConfig,
    stateObjIcon?: string
  ): string {
    if (typeof entityConfig !== "string" && entityConfig.icon) {
      return entityConfig.icon;
    }

    if (this.config?.icon) {
      return this.config.icon;
    }

    return stateObjIcon ?? "mdi:lightbulb";
  }

  private updateMarkersFromEntities(): void {
    if (!this.hass || !this.config?.entities) return;

    this.markers = this.config.entities
      .map((entityConfig) => {
        const entityId = this.getEntityId(entityConfig);
        const stateObj = this.hass.states[entityId];

        if (!stateObj) return null;

        const hs = stateObj.attributes.hs_color ?? [0, 0];
        const hue = Number(hs[0] ?? 0);
        const saturation = Number(hs[1] ?? 0);
        const brightness = Number(stateObj.attributes.brightness ?? 0);

        const colorTempKelvin =
          Number(stateObj.attributes.color_temp_kelvin ?? 0) || null;

        const minColorTempKelvin = Number(
          stateObj.attributes.min_color_temp_kelvin ??
            stateObj.attributes.min_mireds
              ? this.miredToKelvin(Number(stateObj.attributes.max_mireds))
              : 2000
        );

        const maxColorTempKelvin = Number(
          stateObj.attributes.max_color_temp_kelvin ??
            stateObj.attributes.max_mireds
              ? this.miredToKelvin(Number(stateObj.attributes.min_mireds))
              : 6500
        );

        const effectiveKelvin =
          colorTempKelvin ??
          Math.round((minColorTempKelvin + maxColorTempKelvin) / 2);

        const position =
          this.wheelMode === "white"
            ? this.kelvinToPosition(
                effectiveKelvin,
                minColorTempKelvin,
                maxColorTempKelvin
              )
            : this.hsToPosition(hue, saturation);

        return {
          entityId,
          name: stateObj.attributes.friendly_name ?? entityId,
          icon: this.getEntityIcon(entityConfig, stateObj.attributes.icon),
          hue,
          saturation,
          brightness,
          colorTempKelvin,
          minColorTempKelvin,
          maxColorTempKelvin,
          x: position.x,
          y: position.y,
          color:
            this.wheelMode === "white"
              ? this.kelvinToCssColor(effectiveKelvin)
              : `hsl(${hue}, ${saturation}%, 50%)`,
          state: stateObj.state,
        };
      })
      .filter(Boolean) as Marker[];
  }

  private miredToKelvin(mired: number): number {
    if (!mired) return 0;

    return Math.round(1000000 / mired);
  }

  private hsToPosition(hue: number, saturation: number): { x: number; y: number } {
    const angle = ((hue - 90) * Math.PI) / 180;
    const radius = (saturation / 100) * this.wheelRadius;

    return {
      x: this.center + radius * Math.cos(angle),
      y: this.center + radius * Math.sin(angle),
    };
  }

  private positionToHs(
    clientX: number,
    clientY: number,
    rect: DOMRect
  ): { hue: number; saturation: number } {
    const x = clientX - rect.left - this.center;
    const y = clientY - rect.top - this.center;

    const distance = Math.sqrt(x * x + y * y);
    const clampedDistance = Math.min(distance, this.wheelRadius);

    let hue = (Math.atan2(y, x) * 180) / Math.PI + 90;

    if (hue < 0) {
      hue += 360;
    }

    if (hue >= 360) {
      hue -= 360;
    }

    return {
      hue: Math.round(hue),
      saturation: Math.round((clampedDistance / this.wheelRadius) * 100),
    };
  }

  private kelvinToPosition(
    kelvin: number,
    minKelvin: number,
    maxKelvin: number
  ): { x: number; y: number } {
    const safeMin = minKelvin || 2000;
    const safeMax = maxKelvin || 6500;
    const safeKelvin = this.clamp(kelvin, safeMin, safeMax);

    const ratio = (safeKelvin - safeMin) / (safeMax - safeMin);
    const x = this.center - this.wheelRadius + ratio * this.wheelRadius * 2;

    return {
      x,
      y: this.center,
    };
  }

  private positionToKelvin(
    clientX: number,
    rect: DOMRect,
    minKelvin: number,
    maxKelvin: number
  ): number {
    const safeMin = minKelvin || 2000;
    const safeMax = maxKelvin || 6500;

    const relativeX = clientX - rect.left;
    const left = this.center - this.wheelRadius;
    const right = this.center + this.wheelRadius;

    const clampedX = this.clamp(relativeX, left, right);
    const ratio = (clampedX - left) / (right - left);

    return Math.round(safeMin + ratio * (safeMax - safeMin));
  }

  private kelvinToCssColor(kelvin: number): string {
    if (kelvin <= 2300) return "rgb(255, 168, 82)";
    if (kelvin <= 2700) return "rgb(255, 190, 115)";
    if (kelvin <= 3500) return "rgb(255, 220, 165)";
    if (kelvin <= 4500) return "rgb(255, 244, 220)";
    if (kelvin <= 5500) return "rgb(230, 242, 255)";

    return "rgb(200, 225, 255)";
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  private getMarkerGroups(): MarkerGroup[] {
    const groups: MarkerGroup[] = [];

    for (const marker of this.markers) {
      const existingGroup = groups.find((group) => {
        const dx = group.x - marker.x;
        const dy = group.y - marker.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance <= this.groupDistancePx;
      });

      if (existingGroup) {
        existingGroup.markers.push(marker);
        existingGroup.entityIds.push(marker.entityId);
        existingGroup.count = existingGroup.markers.length;

        existingGroup.x =
          existingGroup.markers.reduce((sum, item) => sum + item.x, 0) /
          existingGroup.count;

        existingGroup.y =
          existingGroup.markers.reduce((sum, item) => sum + item.y, 0) /
          existingGroup.count;

        existingGroup.hue =
          existingGroup.markers.reduce((sum, item) => sum + item.hue, 0) /
          existingGroup.count;

        existingGroup.saturation =
          existingGroup.markers.reduce((sum, item) => sum + item.saturation, 0) /
          existingGroup.count;

        existingGroup.color =
          this.wheelMode === "white"
            ? this.kelvinToCssColor(
                existingGroup.markers.reduce(
                  (sum, item) =>
                    sum +
                    (item.colorTempKelvin ??
                      Math.round(
                        (item.minColorTempKelvin + item.maxColorTempKelvin) / 2
                      )),
                  0
                ) / existingGroup.count
              )
            : `hsl(${existingGroup.hue}, ${existingGroup.saturation}%, 50%)`;
      } else {
        groups.push({
          id: marker.entityId,
          markers: [marker],
          entityIds: [marker.entityId],
          x: marker.x,
          y: marker.y,
          hue: marker.hue,
          saturation: marker.saturation,
          color: marker.color,
          count: 1,
        });
      }
    }

    return groups;
  }

  private isGroupActive(group: MarkerGroup): boolean {
    if (this.activeEntityIds.length) {
      return group.entityIds.some((entityId) =>
        this.activeEntityIds.includes(entityId)
      );
    }

    if (!this.activeEntityId) return false;

    return group.entityIds.includes(this.activeEntityId);
  }

  private isEntitySelected(entityId: string): boolean {
    if (this.activeEntityIds.length) {
      return this.activeEntityIds.includes(entityId);
    }

    return this.activeEntityId === entityId;
  }

  private toggleExpandedGroup(group: MarkerGroup): void {
    if (group.count <= 1) return;

    this.expandedGroupId = this.expandedGroupId === group.id ? null : group.id;
  }

  private getExpandedMarkerPosition(
    group: MarkerGroup,
    index: number
  ): { x: number; y: number } {
    const total = group.markers.length;
    const angle = (2 * Math.PI * index) / total - Math.PI / 2;
    const distance = 38;

    return {
      x: group.x + Math.cos(angle) * distance,
      y: group.y + Math.sin(angle) * distance,
    };
  }

  private updateMarkersLocally(
    entityIds: string[],
    hue: number,
    saturation: number
  ): void {
    this.markers = this.markers.map((marker) => {
      if (!entityIds.includes(marker.entityId)) return marker;

      const position = this.hsToPosition(hue, saturation);

      return {
        ...marker,
        hue,
        saturation,
        x: position.x,
        y: position.y,
        color: `hsl(${hue}, ${saturation}%, 50%)`,
        state: "on",
      };
    });
  }

  private updateWhiteMarkersLocally(entityIds: string[], kelvin: number): void {
    this.markers = this.markers.map((marker) => {
      if (!entityIds.includes(marker.entityId)) return marker;

      const safeKelvin = this.clamp(
        kelvin,
        marker.minColorTempKelvin,
        marker.maxColorTempKelvin
      );

      const position = this.kelvinToPosition(
        safeKelvin,
        marker.minColorTempKelvin,
        marker.maxColorTempKelvin
      );

      return {
        ...marker,
        colorTempKelvin: safeKelvin,
        x: position.x,
        y: position.y,
        color: this.kelvinToCssColor(safeKelvin),
        state: "on",
      };
    });
  }

  private async setLightColor(
    entityIds: string[],
    hue: number,
    saturation: number
  ): Promise<void> {
    await this.hass.callService("light", "turn_on", {
      entity_id: entityIds,
      hs_color: [hue, saturation],
    });
  }

  private async setLightWhiteTemperature(
    entityIds: string[],
    kelvin: number
  ): Promise<void> {
    await this.hass.callService("light", "turn_on", {
      entity_id: entityIds,
      color_temp_kelvin: kelvin,
    });
  }

  private async toggleLight(entityId: string): Promise<void> {
    await this.hass.callService("light", "toggle", {
      entity_id: entityId,
    });
  }

  private getSelectedEntityIds(): string[] {
    if (this.activeEntityIds.length) {
      return this.activeEntityIds;
    }

    if (this.activeEntityId) {
      return [this.activeEntityId];
    }

    return this.markers.map((marker) => marker.entityId);
  }

  private getSelectedBrightness(): number {
    const selectedIds = this.getSelectedEntityIds();

    const selectedMarkers = this.markers.filter((marker) =>
      selectedIds.includes(marker.entityId)
    );

    if (!selectedMarkers.length) return 100;

    const averageBrightness =
      selectedMarkers.reduce((sum, marker) => sum + marker.brightness, 0) /
      selectedMarkers.length;

    return Math.round((averageBrightness / 255) * 100);
  }

  private setSelectedBrightnessLocally(value: number): void {
    this.pauseHassUpdates();

    const selectedIds = this.getSelectedEntityIds();
    const brightness = Math.round((value / 100) * 255);

    this.markers = this.markers.map((marker) => {
      if (!selectedIds.includes(marker.entityId)) return marker;

      return {
        ...marker,
        brightness,
        state: "on",
      };
    });
  }

  private async setSelectedBrightness(value: number): Promise<void> {
    const selectedIds = this.getSelectedEntityIds();
    const brightness = Math.round((value / 100) * 255);

    this.pauseHassUpdates(1400);
    this.setSelectedBrightnessLocally(value);

    await this.hass.callService("light", "turn_on", {
      entity_id: selectedIds,
      brightness,
    });

    this.pauseHassUpdates(500);
  }

  private getBrightnessFromPointer(clientY: number, rect: DOMRect): number {
    const relativeY = clientY - rect.top;
    const ratio = 1 - relativeY / rect.height;
    const clampedRatio = Math.max(0.01, Math.min(1, ratio));

    return Math.round(clampedRatio * 100);
  }

  private onBrightnessPointerDown(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.brightnessExpanded = true;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const applyFromPointer = (clientY: number, commit: boolean) => {
      const value = this.getBrightnessFromPointer(clientY, rect);

      this.setSelectedBrightnessLocally(value);

      if (commit) {
        void this.setSelectedBrightness(value);
      }
    };

    applyFromPointer(event.clientY, false);

    const move = (moveEvent: PointerEvent) => {
      applyFromPointer(moveEvent.clientY, false);
    };

    const up = (upEvent: PointerEvent) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);

      applyFromPointer(upEvent.clientY, true);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  private toggleBrightnessExpanded(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.brightnessExpanded = !this.brightnessExpanded;
  }

  private toggleWheelMode(): void {
    this.wheelMode = this.wheelMode === "color" ? "white" : "color";
    this.expandedGroupId = null;
    this.brightnessExpanded = false;

    this.updateMarkersFromEntities();
  }

  private onMarkerGroupPointerDown(event: PointerEvent, group: MarkerGroup): void {
    event.preventDefault();
    event.stopPropagation();

    this.activeEntityId = group.entityIds[0];
    this.activeEntityIds = [...group.entityIds];
    this.expandedGroupId = null;
    this.brightnessExpanded = false;

    const wheel = this.shadowRoot?.querySelector(".wheel") as HTMLElement | null;

    if (!wheel) return;

    const rect = wheel.getBoundingClientRect();

    const move = (moveEvent: PointerEvent) => {
      this.pauseHassUpdates();

      if (this.wheelMode === "white") {
        const firstMarker = group.markers[0];
        const kelvin = this.positionToKelvin(
          moveEvent.clientX,
          rect,
          firstMarker.minColorTempKelvin,
          firstMarker.maxColorTempKelvin
        );

        this.updateWhiteMarkersLocally(group.entityIds, kelvin);
        return;
      }

      const { hue, saturation } = this.positionToHs(
        moveEvent.clientX,
        moveEvent.clientY,
        rect
      );

      this.updateMarkersLocally(group.entityIds, hue, saturation);
    };

    const up = async (upEvent: PointerEvent) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);

      this.pauseHassUpdates(1400);

      if (this.wheelMode === "white") {
        const firstMarker = group.markers[0];
        const kelvin = this.positionToKelvin(
          upEvent.clientX,
          rect,
          firstMarker.minColorTempKelvin,
          firstMarker.maxColorTempKelvin
        );

        this.updateWhiteMarkersLocally(group.entityIds, kelvin);
        await this.setLightWhiteTemperature(group.entityIds, kelvin);
        this.pauseHassUpdates(500);
        return;
      }

      const { hue, saturation } = this.positionToHs(
        upEvent.clientX,
        upEvent.clientY,
        rect
      );

      this.updateMarkersLocally(group.entityIds, hue, saturation);
      await this.setLightColor(group.entityIds, hue, saturation);
      this.pauseHassUpdates(500);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  private onSingleMarkerPointerDown(event: PointerEvent, marker: Marker): void {
    event.preventDefault();
    event.stopPropagation();

    this.activeEntityId = marker.entityId;
    this.activeEntityIds = [marker.entityId];
    this.brightnessExpanded = false;

    const wheel = this.shadowRoot?.querySelector(".wheel") as HTMLElement | null;

    if (!wheel) return;

    const rect = wheel.getBoundingClientRect();

    const startClientX = event.clientX;
    const startClientY = event.clientY;

    let hasDragged = false;
    let lastClientX = event.clientX;
    let lastClientY = event.clientY;

    const move = (moveEvent: PointerEvent) => {
      lastClientX = moveEvent.clientX;
      lastClientY = moveEvent.clientY;

      const dx = moveEvent.clientX - startClientX;
      const dy = moveEvent.clientY - startClientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (!hasDragged && distance < this.dragThresholdPx) {
        return;
      }

      hasDragged = true;
      this.pauseHassUpdates();

      if (this.wheelMode === "white") {
        const kelvin = this.positionToKelvin(
          moveEvent.clientX,
          rect,
          marker.minColorTempKelvin,
          marker.maxColorTempKelvin
        );

        this.updateWhiteMarkersLocally([marker.entityId], kelvin);
        return;
      }

      const { hue, saturation } = this.positionToHs(
        moveEvent.clientX,
        moveEvent.clientY,
        rect
      );

      this.updateMarkersLocally([marker.entityId], hue, saturation);
    };

    const up = async (upEvent: PointerEvent) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);

      lastClientX = upEvent.clientX;
      lastClientY = upEvent.clientY;

      if (!hasDragged) {
        this.activeEntityId = marker.entityId;
        this.activeEntityIds = [marker.entityId];
        this.brightnessExpanded = false;

        // Importante:
        // No modificamos color.
        // No llamamos a Home Assistant.
        // No cerramos expandedGroupId.
        // Así el grupo sigue agrupado/desplegado y solo cambia la selección.
        return;
      }

      this.pauseHassUpdates(1400);

      if (this.wheelMode === "white") {
        const kelvin = this.positionToKelvin(
          lastClientX,
          rect,
          marker.minColorTempKelvin,
          marker.maxColorTempKelvin
        );

        this.updateWhiteMarkersLocally([marker.entityId], kelvin);
        await this.setLightWhiteTemperature([marker.entityId], kelvin);
        this.pauseHassUpdates(500);

        this.expandedGroupId = null;
        return;
      }

      const { hue, saturation } = this.positionToHs(
        lastClientX,
        lastClientY,
        rect
      );

      this.updateMarkersLocally([marker.entityId], hue, saturation);
      await this.setLightColor([marker.entityId], hue, saturation);
      this.pauseHassUpdates(500);

      this.expandedGroupId = null;
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  private selectGroup(group: MarkerGroup): void {
    this.activeEntityId = group.entityIds[0];
    this.activeEntityIds = [...group.entityIds];
    this.brightnessExpanded = false;
  }

  private selectSingleEntity(entityId: string): void {
    this.activeEntityId = entityId;
    this.activeEntityIds = [entityId];
    this.brightnessExpanded = false;
  }

  private shouldShowTitle(): boolean {
    const rawValue = this.config.showTitle ?? this.config.show_title;

    if (rawValue === false || rawValue === "false") {
      return false;
    }

    return Boolean(this.config.title);
  }

  private getButtonColumns(): number {
    const rawValue =
      this.config.buttonColumns ??
      this.config.button_columns ??
      this.config.columns ??
      2;

    const value = Number(rawValue);

    if (!Number.isFinite(value)) return 2;

    return Math.max(1, Math.min(4, Math.round(value)));
  }

  private getShortName(name: string): string {
    return name
      .replace("Hue jardin luces ", "")
      .replace("Hue Jardín Luces ", "")
      .replace("hue_jardin_luces_", "")
      .trim();
  }

  protected render() {
    if (!this.config) return html``;

    const markerGroups = this.getMarkerGroups();
    const selectedBrightness = this.getSelectedBrightness();

    return html`
      <ha-card>
        <div class="card">
          ${this.shouldShowTitle()
            ? html`<div class="title">${this.config.title}</div>`
            : null}

          <div class="wheel-control-row">
            <div class="mode-side">
              <button
                class=${this.wheelMode === "color"
                  ? "mode-button color"
                  : "mode-button white"}
                @click=${() => this.toggleWheelMode()}
              >
                <span class="mode-icon">
                  ${this.wheelMode === "color" ? "🎨" : "☀"}
                </span>
                <span class="mode-label">
                  ${this.wheelMode === "color" ? "Color" : "White"}
                </span>
              </button>
            </div>

            <div class="wheel-wrapper">
              <div
                class=${this.wheelMode === "white"
                  ? "wheel white-wheel"
                  : "wheel color-wheel"}
                style="width:${this.wheelSize}px; height:${this.wheelSize}px;"
                @click=${() => {
                  this.expandedGroupId = null;
                  this.brightnessExpanded = false;
                }}
              >
                ${markerGroups.map((group) => {
                  const isExpanded = this.expandedGroupId === group.id;

                  return html`
                    <div
                      class=${this.isGroupActive(group)
                        ? group.count > 1
                          ? "marker group active"
                          : "marker active"
                        : group.count > 1
                          ? "marker group"
                          : "marker"}
                      style="
                        left: ${group.x}px;
                        top: ${group.y}px;
                        background: ${group.color};
                      "
                      title=${group.markers.map((marker) => marker.name).join(", ")}
                      @click=${(ev: MouseEvent) => {
                        ev.stopPropagation();

                        this.selectGroup(group);
                        this.toggleExpandedGroup(group);
                      }}
                      @pointerdown=${(ev: PointerEvent) => {
                        if (group.count > 1 && this.expandedGroupId === group.id) {
                          this.onMarkerGroupPointerDown(ev, group);
                          return;
                        }

                        if (group.count > 1) {
                          return;
                        }

                        this.onMarkerGroupPointerDown(ev, group);
                      }}
                    >
                      ${group.count > 1
                        ? html`<span class="group-count">${group.count}</span>`
                        : ""}
                    </div>

                    ${isExpanded && group.count > 1
                      ? group.markers.map((marker, index) => {
                          const position = this.getExpandedMarkerPosition(group, index);

                          return html`
                            <div
                              class=${this.isEntitySelected(marker.entityId)
                                ? "marker expanded-single selected-single"
                                : "marker expanded-single"}
                              style="
                                left: ${position.x}px;
                                top: ${position.y}px;
                                background: ${marker.color};
                              "
                              title=${marker.name}
                              @click=${(ev: MouseEvent) => {
                                ev.preventDefault();
                                ev.stopPropagation();
                                this.selectSingleEntity(marker.entityId);
                              }}
                              @pointerdown=${(ev: PointerEvent) =>
                                this.onSingleMarkerPointerDown(ev, marker)}
                            ></div>
                          `;
                        })
                      : ""}
                  `;
                })}
              </div>
            </div>

            <div
              class=${this.brightnessExpanded
                ? "brightness-side expanded"
                : "brightness-side"}
            >
              <div class="brightness-value">${selectedBrightness} %</div>

              <div
                class=${this.brightnessExpanded
                  ? "brightness-control expanded"
                  : "brightness-control"}
                @click=${(ev: MouseEvent) => this.toggleBrightnessExpanded(ev)}
                @pointerdown=${(ev: PointerEvent) => {
                  if (this.brightnessExpanded) {
                    this.onBrightnessPointerDown(ev);
                  }
                }}
              >
                <div
                  class="brightness-fill"
                  style="height: ${selectedBrightness}%;"
                ></div>

                <div class="brightness-icon">☼</div>
              </div>
            </div>
          </div>

          <div
            class="lights-row"
            style=${`--button-columns: ${this.getButtonColumns()};`}
          >
            ${this.markers.map(
              (marker) => html`
                <button
                  class=${this.isEntitySelected(marker.entityId)
                    ? "light-tile selected"
                    : "light-tile"}
                  style=${marker.state === "on"
                    ? `
                      --tile-color: ${marker.color};
                      background:
                        linear-gradient(
                          135deg,
                          color-mix(in srgb, var(--tile-color) 78%, white 10%),
                          color-mix(in srgb, var(--tile-color) 55%, black 18%)
                        );
                    `
                    : `
                      --tile-color: rgba(255, 255, 255, 0.08);
                      background: rgba(255, 255, 255, 0.08);
                    `}
                  @click=${() => {
                    this.selectSingleEntity(marker.entityId);
                  }}
                  @dblclick=${() => this.toggleLight(marker.entityId)}
                >
                  <div class="tile-main">
                    <div class="tile-icon-wrap">
                      <ha-icon
                        class=${marker.state === "on" ? "tile-icon on" : "tile-icon off"}
                        .icon=${marker.icon}
                      ></ha-icon>
                    </div>

                    <div class="tile-text">
                      <div class="name">${this.getShortName(marker.name)}</div>
                      <div class="brightness">
                        ${marker.state === "on"
                          ? `${Math.round((marker.brightness / 255) * 100)} %`
                          : "Off"}
                      </div>
                    </div>
                  </div>
                </button>
              `
            )}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    .card {
      padding: 16px;
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
      overflow: hidden;
    }

    .title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .wheel-control-row {
      display: grid;
      grid-template-columns: 76px 1fr 90px;
      align-items: center;
      gap: 18px;
      margin-bottom: 18px;
    }

    .mode-side {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mode-button {
      width: 66px;
      min-height: 68px;
      border: none;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--primary-text-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.08),
        0 4px 12px rgba(0, 0, 0, 0.22);
    }

    .mode-button.color {
      background:
        linear-gradient(
          135deg,
          rgba(255, 0, 120, 0.22),
          rgba(0, 160, 255, 0.22)
        );
    }

    .mode-button.white {
      background:
        linear-gradient(
          135deg,
          rgba(255, 185, 90, 0.28),
          rgba(205, 225, 255, 0.28)
        );
    }

    .mode-icon {
      font-size: 22px;
      line-height: 1;
    }

    .mode-label {
      font-size: 12px;
      opacity: 0.85;
    }

    .wheel-wrapper {
      display: flex;
      justify-content: center;
    }

    .wheel {
      position: relative;
      border-radius: 50%;
      touch-action: none;
      box-shadow:
        inset 0 0 24px rgba(0, 0, 0, 0.25),
        0 6px 18px rgba(0, 0, 0, 0.35);
    }

    .color-wheel {
      background:
        radial-gradient(circle, white 0%, transparent 65%),
        conic-gradient(red, yellow, lime, cyan, blue, magenta, red);
    }

    .white-wheel {
      background:
        radial-gradient(
          circle,
          rgba(255, 255, 255, 0.95) 0%,
          rgba(255, 255, 255, 0.35) 42%,
          transparent 70%
        ),
        linear-gradient(
          90deg,
          rgb(255, 170, 80),
          rgb(255, 245, 210),
          rgb(190, 220, 255)
        );
    }

    .brightness-side {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 80px;
    }

    .brightness-value {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--primary-text-color);
      background: rgba(0, 0, 0, 0.25);
      padding: 3px 8px;
      border-radius: 999px;
      min-width: 42px;
      text-align: center;
    }

    .brightness-control {
      position: relative;
      width: 72px;
      height: 44px;
      border-radius: 999px;
      background: rgba(70, 70, 70, 0.75);
      box-shadow:
        inset 0 0 12px rgba(0, 0, 0, 0.22),
        0 4px 12px rgba(0, 0, 0, 0.28);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      cursor: pointer;
      touch-action: none;
      transition:
        width 160ms ease,
        height 160ms ease,
        border-radius 160ms ease;
    }

    .brightness-control.expanded {
      width: 82px;
      height: 220px;
      border-radius: 28px;
      align-items: flex-end;
    }

    .brightness-fill {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      background: rgba(245, 245, 245, 0.9);
      pointer-events: none;
    }

    .brightness-icon {
      position: relative;
      z-index: 2;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.92);
      color: rgba(60, 60, 60, 0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow:
        0 1px 4px rgba(0, 0, 0, 0.35),
        inset 0 0 4px rgba(255, 255, 255, 0.6);
      pointer-events: none;
      margin-bottom: 10px;
    }

    .brightness-control:not(.expanded) .brightness-icon {
      margin-bottom: 0;
    }

    .marker {
      position: absolute;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
      cursor: grab;
      z-index: 2;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #222;
      font-size: 13px;
      font-weight: 700;
      user-select: none;
    }

    .marker.active {
      width: 38px;
      height: 38px;
      border: 3px solid white;
      z-index: 7;
      border-radius: 50% 50% 50% 8px;
      transform: translate(-50%, -50%) rotate(-45deg);
      box-shadow:
        0 0 0 3px rgba(255, 255, 255, 0.35),
        0 6px 16px rgba(0, 0, 0, 0.5);
    }

    .marker.group {
      width: 46px;
      height: 46px;
      border-radius: 50% 50% 50% 8px;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 15px;
      z-index: 4;
      color: #1f1f1f;
    }

    .marker.group.active {
      width: 52px;
      height: 52px;
      border: 3px solid white;
      z-index: 6;
    }

    .group-count {
      transform: rotate(45deg);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .marker.expanded-single {
      width: 24px;
      height: 24px;
      border: 2px solid white;
      z-index: 10;
      box-shadow:
        0 0 0 3px rgba(255, 255, 255, 0.25),
        0 4px 10px rgba(0, 0, 0, 0.45);
    }
    
    .marker.expanded-single.selected-single {
      width: 30px;
      height: 30px;
      border: 3px solid white;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 14;
      box-shadow:
        0 0 0 3px color-mix(in srgb, var(--primary-color) 70%, transparent),
        0 0 0 6px rgba(255, 255, 255, 0.28),
        0 6px 14px rgba(0, 0, 0, 0.55);
    }

    .marker:active {
      cursor: grabbing;
    }

    .marker:not(.group):not(.active):active {
      transform: translate(-50%, -50%) scale(1.12);
    }

    .marker.active:not(.group):active {
      transform: translate(-50%, -50%) rotate(-45deg) scale(1.08);
    }

    .marker.group.active {
      width: 56px;
      height: 56px;
      border: 3px solid white;
      z-index: 8;
      box-shadow:
        0 0 0 4px rgba(255, 255, 255, 0.35),
        0 8px 18px rgba(0, 0, 0, 0.55);
    }

    .marker.expanded-single:not(.selected-single):active {
      transform: translate(-50%, -50%) scale(1.18);
    }

    .marker.expanded-single.selected-single:active {
      transform: translate(-50%, -50%) scale(1.12);
    }

    .lights-row {
      display: grid;
      grid-template-columns: repeat(var(--button-columns, 2), minmax(0, 1fr));
      grid-auto-rows: 64px;
      gap: 12px;
      max-height: calc(64px * 4 + 36px);
      overflow-y: auto;
      padding: 6px;
    }

    .light-tile {
      min-width: 0;
      height: 64px;
      border: none;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--primary-text-color);
      cursor: pointer;
      padding: 8px 14px 8px 8px;
      box-sizing: border-box;
      text-align: left;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
      transition:
        background 180ms ease,
        box-shadow 180ms ease,
        transform 120ms ease;
    }

    .light-tile.selected {
      outline: none;
      box-shadow:
        inset 0 0 0 2px rgba(255, 255, 255, 0.95),
        inset 0 0 0 6px color-mix(in srgb, var(--primary-color) 82%, transparent),
        0 6px 16px rgba(0, 0, 0, 0.38);
    }

    .light-tile:active {
      transform: scale(0.98);
    }

    .tile-main {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      height: 100%;
      min-width: 0;
    }

    .tile-icon-wrap {
      width: 46px;
      height: 46px;
      min-width: 46px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.18);
      box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.08),
        0 2px 7px rgba(0, 0, 0, 0.22);
    }

    .tile-text {
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 3px;
      flex: 1;
    }

    .tile-icon {
      --mdc-icon-size: 24px;
      width: 24px;
      height: 24px;
      color: white;
      filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.55));
    }

    .tile-icon.on {
      opacity: 1;
      color: white;
    }

    .tile-icon.off {
      opacity: 0.42;
      color: rgba(255, 255, 255, 0.75);
      filter: none;
    }

    .name {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.12em;
    }

    .brightness {
      font-size: 11px;
      opacity: 0.82;
    }

    @media (max-width: 500px) {
      .lights-row {
        grid-template-columns: 1fr;
        grid-auto-rows: 62px;
        max-height: calc(62px * 5 + 48px);
      }

      .wheel-control-row {
        grid-template-columns: 1fr;
        gap: 12px;
      }

      .mode-side {
        order: 1;
      }

      .wheel-wrapper {
        order: 2;
      }

      .brightness-side {
        order: 3;
        flex-direction: column;
        gap: 6px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "multi-light-wheel-card": MultiLightWheelCard;
  }
}