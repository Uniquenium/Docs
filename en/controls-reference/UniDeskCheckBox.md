---
title: UniDeskCheckBox
editLink: true
---

# UniDeskCheckBox Type

Checkbox control based on QtQuick `CheckBox`. Custom circular indicator style with theme-aware colors.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskCheckBox.qml` |
| Inherits | T.CheckBox (QtQuick Templates) |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Styling

- Indicator: Circular, shows theme-color background with white check icon when checked
- Hover/press state has color transition animation
- Text uses `UniDeskTextStyle.little` font
- Supports three states: Unchecked, Checked, PartiallyChecked

## Properties

Inherits all properties from QtQuick `CheckBox`. No additional custom properties.

## Examples

```qml
import UniDesk.Controls 1.0

UniDeskCheckBox {
    text: "Enable auto-save"
    checked: true
    onCheckedChanged: console.log("checked:", checked)
}
```

## Related

- [UniDeskRadioButton](./UniDeskRadioButton.md) — Radio button
- [UniDeskTextStyle](./cpp-ext/UniDeskTextStyle.md) — Global font styles