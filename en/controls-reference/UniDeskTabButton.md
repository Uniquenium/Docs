---
title: UniDeskTabButton
editLink: true
---

# UniDeskTabButton Type

Tab button control based on QtQuick `TabButton`. Custom selected state (theme-color background), hover/press states, and disabled state color management.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskTabButton.qml` |
| Inherits | QtQuick TabButton |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

- `property bool disabled`：Whether the button is disabled
- `property color bgNormalColor`：Normal background. Default: transparent
- `property color bgHoverColor`：Hover background
- `property color bgPressColor`：Press background
- `property color bgDisableColor`：Disabled background

## Custom Styling

- 3px rounded rectangle background
- Shows theme-color background when selected
- Text uses `UniDeskTextStyle.little` font
- Border adapts to theme

## Examples

```qml
import UniDesk.Controls 1.0

UniDeskTabButton {
    text: "General"
    checked: true
}
```

## Related

- [UniDeskTabBar](./UniDeskTabBar.md) — Tab bar
- [UniDeskButton](./UniDeskButton.md) — General button