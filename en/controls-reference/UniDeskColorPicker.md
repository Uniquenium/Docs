---
title: UniDeskColorPicker
editLink: true
---

# UniDeskColorPicker Type

Color picker control supporting RGBA, HSLA, HSVA, and HEX color modes with editing and live preview. Integrates `ColorDialog` for visual color selection.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskColorPicker.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Description |
|----------|------|-------------|
| `selectedColor` | `color` | Currently selected color (two-way bindable) |
| `comManager` | `var` | Component manager reference (passed to internal `UniDeskComboBox`) |
| `colorTypeBox` | `UniDeskComboBox` | Alias for the color mode dropdown |

## Color Modes

| Mode | Editable Fields |
|------|----------------|
| `RGBA` | R, G, B, A values (0-255, A is 0-100) |
| `HSLA` | H (0-360), S (0-100), L (0-100), A (0-100) |
| `HSVA` | H (0-360), S (0-100), V (0-100), A (0-100) |
| `HEX` | Hex string (e.g. `#ff0000`) |

## Behavior

- Live color preview (color block on the left shows current color)
- Clicking "Select Color" opens system `ColorDialog`
- Auto-updates `selectedColor` after editing
- Minimum height: 40px

## Example

```qml
import UniDesk.Controls 1.0

UniDeskColorPicker {
    selectedColor: myColor
    comManager: comManager
    anchors.left: parent.left
    anchors.top: parent.top
}
```

## Related

- [UniDeskComboBox](./UniDeskComboBox.md) — Combo box
- [UniDeskTextField](./UniDeskTextField.md) — Text field