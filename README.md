# multi-light-wheel-card

`multi-light-wheel-card` es una custom card para Home Assistant/Lovelace pensada para controlar varias luces desde una única rueda de color, con botones inferiores para seleccionar cada luz y un control lateral de brillo.

La versión actual de trabajo parte de la base estable `v0.1.2`, confirmada funcionando en Home Assistant, y añade opciones de configuración para nombres, iconos y estado de los botones.

## Funcionalidades actuales

- Control de varias entidades `light.*` desde una única tarjeta.
- Rueda de color compartida para modificar `hs_color`.
- Modo color y modo blanco/temperatura.
- Agrupación automática de luces cuando sus marcadores están cerca en la rueda.
- Arrastre de grupo para modificar varias luces a la vez.
- Selección individual de luces mediante botones.
- Slider lateral de brillo asociado a la luz o grupo seleccionado.
- Botones inferiores en formato horizontal tipo bubble/pill.
- Número de columnas configurable para los botones.
- Icono configurable por tarjeta o por entidad.
- Nombre configurable por entidad.
- Opción para mostrar u ocultar nombres.
- Opción para mostrar u ocultar iconos.
- Opción para mostrar u ocultar estado/brillo.
- Título de tarjeta opcional.

## Instalación mediante HACS

La card está pensada para instalarse desde HACS como custom repository.

1. Publica una release en GitHub que contenga el fichero compilado:

```text
dist/multi-light-wheel-card.js
```

2. En Home Assistant, instala la card desde HACS.

3. HACS debería crear un recurso similar a este:

```text
/hacsfiles/multi-light-wheel-card/multi-light-wheel-card.js?hacstag=...
```

4. No mezcles esta ruta con recursos manuales `/local/...` para evitar cargar versiones diferentes.

## Configuración mínima

```yaml
type: custom:multi-light-wheel-card
title: Jardín
entities:
  - light.hue_jardin_luces_farol1
  - light.hue_jardin_luces_farol2
  - light.hue_jardin_luces_farol3
```

Con esta configuración, la tarjeta usa el `friendly_name` de cada entidad y el icono definido en Home Assistant, si existe.

## Configuración recomendada

```yaml
type: custom:multi-light-wheel-card
title: Jardín
buttonColumns: 2
showTitle: true
showName: true
showIcon: true
showStatus: true
entities:
  - entity: light.hue_jardin_luces_farol1
    name: Farol 1
    icon: mdi:floor-lamp

  - entity: light.hue_jardin_luces_farol2
    name: Farol 2
    icon: mdi:floor-lamp

  - entity: light.hue_jardin_luces_farol3
    name: Farol 3
    icon: mdi:floor-lamp

  - entity: light.hue_jardin_luces_farol4
    name: Farol 4
    icon: mdi:floor-lamp

  - entity: light.hue_jardin_luces_piscinaderecha
    name: Piscina D
    icon: mdi:pool

  - entity: light.hue_jardin_luces_piscinaizquierda
    name: Piscina I
    icon: mdi:pool
```

## Opciones de la tarjeta

| Opción | Tipo | Default | Descripción |
|---|---:|---:|---|
| `type` | string | obligatorio | Debe ser `custom:multi-light-wheel-card`. |
| `title` | string | opcional | Título mostrado en la parte superior de la tarjeta. |
| `showTitle` | boolean/string | `true` | Muestra u oculta el título. |
| `show_title` | boolean/string | `true` | Alias YAML de `showTitle`. |
| `entities` | array | obligatorio | Lista de luces que controla la tarjeta. |
| `icon` | string | `mdi:lightbulb` | Icono global por defecto para las entidades que no tengan icono propio. |
| `buttonColumns` | number/string | `2` | Número de columnas para los botones inferiores. |
| `button_columns` | number/string | `2` | Alias YAML de `buttonColumns`. |
| `columns` | number/string | `2` | Alias corto para definir columnas. |
| `showName` | boolean/string | `true` | Muestra u oculta los nombres de los botones de forma global. |
| `show_name` | boolean/string | `true` | Alias YAML de `showName`. |
| `showIcon` | boolean/string | `true` | Muestra u oculta los iconos de los botones de forma global. |
| `show_icon` | boolean/string | `true` | Alias YAML de `showIcon`. |
| `showStatus` | boolean/string | `true` | Muestra u oculta el estado/brillo de los botones de forma global. |
| `show_status` | boolean/string | `true` | Alias YAML de `showStatus`. |

Los valores booleanos pueden pasarse como boolean real:

```yaml
showName: false
```

o como string:

```yaml
showName: "false"
```

## Opciones por entidad

Cada entidad puede definirse de forma simple:

```yaml
entities:
  - light.hue_jardin_luces_farol1
```

o con configuración avanzada:

```yaml
entities:
  - entity: light.hue_jardin_luces_farol1
    name: Farol 1
    icon: mdi:floor-lamp
    showName: true
    showIcon: true
    showStatus: true
```

| Opción | Tipo | Default | Descripción |
|---|---:|---:|---|
| `entity` | string | obligatorio | Entidad `light.*` de Home Assistant. |
| `name` | string | `friendly_name` | Nombre que se muestra en el botón. |
| `icon` | string | icono de HA/global | Icono que se muestra en el botón. |
| `showName` | boolean/string | valor global | Muestra u oculta el nombre solo para esta entidad. |
| `show_name` | boolean/string | valor global | Alias YAML de `showName`. |
| `showIcon` | boolean/string | valor global | Muestra u oculta el icono solo para esta entidad. |
| `show_icon` | boolean/string | valor global | Alias YAML de `showIcon`. |
| `showStatus` | boolean/string | valor global | Muestra u oculta el estado/brillo solo para esta entidad. |
| `show_status` | boolean/string | valor global | Alias YAML de `showStatus`. |

La configuración por entidad tiene prioridad sobre la configuración global.

## Ejemplos de uso

### Mostrar nombres personalizados

```yaml
type: custom:multi-light-wheel-card
title: Jardín
buttonColumns: 2
showName: true
entities:
  - entity: light.hue_jardin_luces_farol1
    name: Farol 1
  - entity: light.hue_jardin_luces_farol2
    name: Farol 2
```

### Ocultar todos los nombres

```yaml
type: custom:multi-light-wheel-card
title: Jardín
buttonColumns: 2
showName: false
entities:
  - entity: light.hue_jardin_luces_farol1
    name: Farol 1
  - entity: light.hue_jardin_luces_farol2
    name: Farol 2
```

### Ocultar el nombre solo en una entidad

```yaml
type: custom:multi-light-wheel-card
title: Jardín
showName: true
entities:
  - entity: light.hue_jardin_luces_farol1
    name: Farol 1
    showName: false

  - entity: light.hue_jardin_luces_farol2
    name: Farol 2
```

### Ocultar iconos globalmente

```yaml
type: custom:multi-light-wheel-card
title: Jardín
showIcon: false
entities:
  - entity: light.hue_jardin_luces_farol1
    name: Farol 1
  - entity: light.hue_jardin_luces_farol2
    name: Farol 2
```

### Ocultar estado/brillo globalmente

```yaml
type: custom:multi-light-wheel-card
title: Jardín
showStatus: false
entities:
  - entity: light.hue_jardin_luces_farol1
    name: Farol 1
  - entity: light.hue_jardin_luces_farol2
    name: Farol 2
```

### Ocultar icono y estado en una sola luz

```yaml
type: custom:multi-light-wheel-card
title: Jardín
showIcon: true
showStatus: true
entities:
  - entity: light.hue_jardin_luces_farol1
    name: Farol 1
    icon: mdi:floor-lamp
    showIcon: false
    showStatus: false

  - entity: light.hue_jardin_luces_farol2
    name: Farol 2
    icon: mdi:floor-lamp
```

### Cambiar número de columnas

```yaml
type: custom:multi-light-wheel-card
title: Jardín
buttonColumns: 3
entities:
  - light.hue_jardin_luces_farol1
  - light.hue_jardin_luces_farol2
  - light.hue_jardin_luces_farol3
  - light.hue_jardin_luces_farol4
  - light.hue_jardin_luces_piscinaderecha
  - light.hue_jardin_luces_piscinaizquierda
```

También se puede usar:

```yaml
button_columns: 3
```

o:

```yaml
columns: 3
```

## Comportamiento de la rueda

La rueda muestra los marcadores de las luces en función de su color actual.

- Si varias luces están en posiciones muy cercanas, la tarjeta las agrupa en un único marcador con un número.
- Al mover un marcador agrupado, se cambian todas las luces del grupo.
- Al seleccionar una luz o grupo, el slider de brillo actúa sobre esa selección.
- Si no hay selección activa, el control de brillo puede actuar sobre todas las luces de la tarjeta.

## Modo color y modo blanco

La tarjeta permite alternar entre:

- modo color, usando `hs_color`;
- modo blanco, usando `color_temp_kelvin`.

El botón lateral izquierdo cambia entre ambos modos.

En modo blanco, la posición del marcador representa la temperatura de color dentro del rango soportado por la luz.

## Flujo recomendado de desarrollo

Después de modificar el código fuente:

```bash
npm run build
```

Añadir cambios:

```bash
git add src/multi-light-wheel-card.ts
git add -f dist/multi-light-wheel-card.js
```

Crear commit:

```bash
git commit -m "Describe change"
git push
```

Crear tag para nueva release:

```bash
git tag v0.1.X
git push origin v0.1.X
```

Después se publica la release en GitHub y se actualiza desde HACS.

## Convención de versiones actual

- `v0.1.2`: base estable confirmada en Home Assistant con botones bubble y columnas configurables.
- `v0.1.3`: añade nombres configurables en botones.
- `v0.1.4`: añade opciones para mostrar/ocultar icono y estado/brillo.

## Notas importantes

- Si se usa HACS, el recurso debe ser `/hacsfiles/...` y no `/local/...`.
- No conviene mezclar instalación manual y HACS al mismo tiempo.
- El fichero que realmente usa Home Assistant es el compilado `dist/multi-light-wheel-card.js`, no el `.ts` fuente.
- Después de publicar una release, HACS debe descargar esa versión para que Home Assistant cargue el nuevo JS.
- Si se cambia el código pero no se recompila, Home Assistant seguirá usando la versión anterior del JS.
