import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";

interface MultiLightWheelCardConfig {
  type: string;
  title?: string;
  entities: string[];
}

interface Marker {
  entityId: string;
  name: string;
  hue: number;
  saturation: number;
  brightness: number;
  x: number;
  y: number;
  color: string;
  state: string;
}

@customElement("multi-light-wheel-card")
export class MultiLightWheelCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: MultiLightWheelCardConfig;
  @state() private markers: Marker[] = [];
  @state() private activeEntityId: string | null = null;

  private readonly wheelSize = 260;
  private readonly wheelRadius = 120;
  private readonly center = 130;

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
      this.updateMarkersFromEntities();
    }
  }

  private updateMarkersFromEntities(): void {
    if (!this.hass || !this.config?.entities) return;

    this.markers = this.config.entities
      .map((entityId) => {
        const stateObj = this.hass.states[entityId];
        if (!stateObj) return null;

        const hs = stateObj.attributes.hs_color ?? [0, 0];
        const hue = Number(hs[0] ?? 0);
        const saturation = Number(hs[1] ?? 0);
        const brightness = Number(stateObj.attributes.brightness ?? 0);
        const { x, y } = this.hsToPosition(hue, saturation);

        return {
          entityId,
          name: stateObj.attributes.friendly_name ?? entityId,
          hue,
          saturation,
          brightness,
          x,
          y,
          color: `hsl(${hue}, ${saturation}%, 50%)`,
          state: stateObj.state,
        };
      })
      .filter(Boolean) as Marker[];
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

    if (hue < 0) hue += 360;
    if (hue >= 360) hue -= 360;

    return {
      hue: Math.round(hue),
      saturation: Math.round((clampedDistance / this.wheelRadius) * 100),
    };
  }

  private updateMarkerLocally(entityId: string, hue: number, saturation: number): void {
    this.markers = this.markers.map((marker) => {
      if (marker.entityId !== entityId) return marker;

      const position = this.hsToPosition(hue, saturation);

      return {
        ...marker,
        hue,
        saturation,
        x: position.x,
        y: position.y,
        color: `hsl(${hue}, ${saturation}%, 50%)`,
      };
    });
  }

  private async setLightColor(entityId: string, hue: number, saturation: number): Promise<void> {
    await this.hass.callService("light", "turn_on", {
      entity_id: entityId,
      hs_color: [hue, saturation],
    });
  }

  private async toggleLight(entityId: string): Promise<void> {
    await this.hass.callService("light", "toggle", {
      entity_id: entityId,
    });
  }

  private onMarkerPointerDown(event: PointerEvent, marker: Marker): void {
    event.preventDefault();
    event.stopPropagation();

    this.activeEntityId = marker.entityId;

    const wheel = this.shadowRoot?.querySelector(".wheel") as HTMLElement | null;
    if (!wheel) return;

    const rect = wheel.getBoundingClientRect();

    const move = (moveEvent: PointerEvent) => {
      const { hue, saturation } = this.positionToHs(
        moveEvent.clientX,
        moveEvent.clientY,
        rect
      );

      this.updateMarkerLocally(marker.entityId, hue, saturation);
    };

    const up = async (upEvent: PointerEvent) => {
      const { hue, saturation } = this.positionToHs(
        upEvent.clientX,
        upEvent.clientY,
        rect
      );

      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);

      this.updateMarkerLocally(marker.entityId, hue, saturation);
      await this.setLightColor(marker.entityId, hue, saturation);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
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

    return html`
      <ha-card>
        <div class="card">
          ${this.config.title ? html`<div class="title">${this.config.title}</div>` : null}

          <div class="wheel-wrapper">
            <div class="wheel" style="width:${this.wheelSize}px; height:${this.wheelSize}px;">
              ${this.markers.map(
                (marker) => html`
                  <div
                    class=${marker.entityId === this.activeEntityId ? "marker active" : "marker"}
                    style="
                      left: ${marker.x}px;
                      top: ${marker.y}px;
                      background: ${marker.color};
                    "
                    title=${marker.name}
                    @pointerdown=${(ev: PointerEvent) => this.onMarkerPointerDown(ev, marker)}
                  ></div>
                `
              )}
            </div>
          </div>

          <div class="lights-row">
            ${this.markers.map(
              (marker) => html`
                <button
                  class=${marker.entityId === this.activeEntityId
                    ? "light-tile selected"
                    : "light-tile"}
                  @click=${() => {
                    this.activeEntityId = marker.entityId;
                  }}
                  @dblclick=${() => this.toggleLight(marker.entityId)}
                >
                  <div
                    class=${marker.state === "on" ? "bulb on" : "bulb off"}
                    style="background: ${marker.state === "on"
                      ? marker.color
                      : "rgba(255, 255, 255, 0.35)"};"
                  ></div>

                  <div class="name">${this.getShortName(marker.name)}</div>

                  <div class="brightness">
                    ${marker.state === "on"
                      ? `${Math.round((marker.brightness / 255) * 100)} %`
                      : "Off"}
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

    .wheel-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 18px;
    }

    .wheel {
      position: relative;
      border-radius: 50%;
      background:
        radial-gradient(circle, white 0%, transparent 65%),
        conic-gradient(red, yellow, lime, cyan, blue, magenta, red);
      touch-action: none;
      box-shadow:
        inset 0 0 24px rgba(0, 0, 0, 0.25),
        0 6px 18px rgba(0, 0, 0, 0.35);
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
    }

    .marker.active {
      width: 28px;
      height: 28px;
      border: 3px solid white;
      z-index: 5;
    }

    .marker:active {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.12);
    }

    .lights-row {
      display: grid;
      grid-template-columns: repeat(4, minmax(80px, 1fr));
      grid-auto-rows: 105px;
      gap: 10px;
      max-height: calc(105px * 2 + 10px);
      overflow-y: auto;
      padding-bottom: 4px;
    }

    .light-tile {
      min-width: 0;
      height: 105px;
      border: none;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--primary-text-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 9px;
      text-align: center;
      font-size: 13px;
      cursor: pointer;
      padding: 8px;
      box-sizing: border-box;
    }

    .light-tile.selected {
      outline: 2px solid var(--primary-color);
      background: rgba(255, 255, 255, 0.14);
    }

    .bulb {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }

    .bulb.on {
      box-shadow: 0 0 14px rgba(255, 255, 255, 0.35);
    }

    .bulb.off {
      opacity: 0.45;
      box-shadow: none;
    }

    .name {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    }

    .brightness {
      font-size: 12px;
      opacity: 0.75;
    }

    @media (max-width: 500px) {
      .lights-row {
        grid-template-columns: repeat(3, minmax(80px, 1fr));
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "multi-light-wheel-card": MultiLightWheelCard;
  }
}