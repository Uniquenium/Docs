---
title: UniDeskSpinBox
editLink: true
---

# UniDeskSpinBox Type

Numeric input box based on QtQuick `SpinBox`. Custom button styling with theme-aware colors.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskSpinBox.qml` |
| Inherits | T.SpinBox (QtQuick Templates) |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Styling

- Text is center-aligned, uses `UniDeskTextStyle.little` font
- Up/down arrow buttons use theme color hover effects
- Border and background adapt to theme
- Uses `UniDeskTextField` as the content item, sharing its styling

## Properties

Inherits all properties from QtQuick `SpinBox`. No additional custom properties.

## Examples

```qml
import UniDesk.Controls 1.0

UniDeskSpinBox {
    from: 0
    to: 100
    value: 50
    onValueModified: console.log("value:", value)
}
```

## Related

- [UniDeskTextField](./UniDeskTextField.md) — Single-line text input
- [UniDeskTextArea](./UniDeskTextArea.md) — Multi-line text input