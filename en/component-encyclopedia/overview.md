---
title: Component Encyclopedia
editLink: true
---

# Component Encyclopedia

Uniquenium components fall into two categories: **built-in components (UDC-prefixed)** and **official plugin components**. Built-in components work out of the box; plugin components require the official plugin pack.

## Built-in Components

| Component | Description |
|-----------|-------------|
| [UDCText](./UDCText.md) | Text display with `%{}` expression support for dynamic data |
| [UDCImage](./UDCImage.md) | Image display with rounded corners and button actions |
| [UDCFrame](./UDCFrame.md) | Decorative frame/container for layout separation |

## Official Plugin Components

The official plugin pack provides many more components: system monitors, weather, calendar, media player, quick notes, etc.

For the full list and installation, see [Official Plugins](../official-plugins.md).

## Common Properties

All UDC components inherit from `UniDeskComBase` and share these common properties:

| Property | Type | Description |
|----------|------|-------------|
| `visible` | bool | Whether the component is visible |
| `width` | real | Component width |
| `height` | real | Component height |
| `x` | real | X coordinate |
| `y` | real | Y coordinate |
| `itemOpacity` | real | Opacity (0.0 ~ 1.0) |
| `identification` | string | Unique component ID |
| `parentIdentification` | string | Parent component ID |

## Common Methods

### `propertyDataEx() → object`
Exports the component's custom property data as a JSON object (for template saving).

### `loadPropertyDataEx(data)`
Loads custom property data from a JSON object (for template loading).

## Related

- [Controls Reference](../controls-reference/overview.md) — UniDesk controls system
- [UniDeskComManager](../controls-reference/singletons/UniDeskComManager.md) — Component manager
- [Official Plugins](../official-plugins.md) — Plugin component list