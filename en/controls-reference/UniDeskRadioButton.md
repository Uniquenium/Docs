---
title: UniDeskRadioButton
editLink: true
---

# UniDeskRadioButton Type

Radio button control based on QtQuick `RadioButton`. Custom circular indicator style with selected state and theme-aware colors.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskRadioButton.qml` |
| Inherits | T.RadioButton (QtQuick Templates) |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Styling

- Indicator: Circular border + inner theme-colored dot when selected
- Hover/press state has color transition
- Text uses `UniDeskTextStyle.little` font
- Content rendered using `UniDeskText` control

## Properties

Inherits all properties from QtQuick `RadioButton`. No additional custom properties.

## Examples

```qml
import UniDesk.Controls 1.0

Column {
    UniDeskRadioButton {
        text: "Option A"
        checked: true
    }
    UniDeskRadioButton {
        text: "Option B"
    }
}
```

## Related

- [UniDeskCheckBox](./UniDeskCheckBox.md) — Checkbox