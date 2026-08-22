---
title: UniDeskSlider
editLink: true
---

# UniDeskSlider Type

Slider control based on QtQuick `T.Slider`. Provides themed styling with custom handle (rounded, colored), background track with filled portion, and tooltip display on hover/press.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskSlider.qml` |
| Inherits | QtQuick Templates Slider (`T.Slider`) |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tooltipEnabled` | `bool` | `true` | Whether to show tooltip on hover/press |
| `text` | `string` | `String(value)` | Tooltip text |

## Style

- Handle: 20x20 rounded rectangle with shadow, inner circle with scale animation
- Handle color: White (light theme) / Dark gray (dark theme)
- Inner indicator: Primary color circle, scales up on hover (1.2x), down on press (0.9x)
- Background: Track with rounded corners, filled portion in primary color
- `to`: 100, `stepSize`: 1

## Behavior

- Tooltip appears when `pressed || hovered`
- Inherits all `T.Slider` properties: `from`, `to`, `value`, `position`, `horizontal`, etc.

## Example

```qml
import UniDesk.Controls 1.0

UniDeskSlider {
    width: 200
    from: 0
    to: 100
    value: 50
    tooltipEnabled: true
    onMoved: console.log("Value:", value)
}
```

## Related

- [UniDeskSpinBox](./UniDeskSpinBox.md) — Spin box
- [UniDeskTooltip](./UniDeskTooltip.md) — Tooltip