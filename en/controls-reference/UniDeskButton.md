---
title: UniDeskButton
editLink: true
---

# UniDeskButton Type

Multi-function button control supporting icon-only, text-only, text-beside-icon, and text-under-icon display modes. Features complete hover/press/disabled state color management with built-in Tooltip support.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskButton.qml` |
| Inherits | QtQuick Button |
| QML Import | `import UniDesk.Controls 1.0` |

## Properties

### Content
- `property string contentText`: Button text content
- `property string iconSource`: Icon source path (local file or qrc resource)
- `property int display`: Display mode (corresponds to `Button` display enum)
  - `Button.IconOnly` (0): Icon only (default)
  - `Button.TextOnly` (1): Text only
  - `Button.TextBesideIcon` (2): Text beside icon
  - `Button.TextUnderIcon` (3): Text under icon

### Appearance
- `property double radius`: Corner radius. Default: 3
- `property double iconSize`: Icon size. Default: 15
- `property double borderWidth`: Border width. Default: 0
- `property color borderColor`: Border color. Default follows theme
- `property double horizontalPadding`: Horizontal padding. Default: 10
- `property double verticalPadding`: Vertical padding. Default: 10
- `property font font`: Font. Default: `UniDeskTextStyle.tiny`

### Color States (Background)
- `property color bgNormalColor`: Normal background. Default: transparent
- `property color bgHoverColor`: Hover background. Auto-calculated from theme
- `property color bgPressColor`: Press background. Auto-calculated from theme
- `property color bgDisableColor`: Disabled background. Default: transparent
- `property color bgColor` (read-only): Current actual background, auto-switched by `UniDeskTools.switchColor`

### Color States (Icon)
- `property color iconNormalColor`: Normal icon color. Default: black
- `property color iconHoverColor`: Hover icon color
- `property color iconPressColor`: Press icon color
- `property color iconDisableColor`: Disabled icon color. Default: gray
- `property color iconColor` (read-only): Current actual icon color, auto-switched

### Color States (Text)
- `property color textNormalColor`: Normal text color. Default follows theme
- `property color textHoverColor`: Hover text color
- `property color textPressColor`: Press text color
- `property color textDisableColor`: Disabled text color. Default: gray
- `property color textColor` (read-only): Current actual text color, auto-switched

## Examples

```qml
import UniDesk.Controls 1.0

// Icon button
UniDeskButton {
    display: Button.IconOnly
    iconSource: "qrc:/media/img/close.svg"
    onClicked: console.log("clicked")
}

// Text button
UniDeskButton {
    display: Button.TextOnly
    contentText: "OK"
    bgNormalColor: UniDeskSettings.primaryColor
    textNormalColor: "white"
}

// Icon + text
UniDeskButton {
    display: Button.TextBesideIcon
    iconSource: "qrc:/media/img/settings.svg"
    contentText: "Settings"
}
```

## Tooltip

When the button is in `IconOnly` mode and `contentText` is non-empty, a Tooltip automatically appears after 2 seconds of hover.

## Accessibility

Automatically sets `Accessible.role`, `Accessible.name`, `Accessible.description`, and `Accessible.onPressAction`.

## Related

- [UniDeskIcon](./UniDeskIcon.md) — Icon control used by the button
- [UniDeskText](./UniDeskText.md) — Text control used by the button
- [UniDeskTextButton](./UniDeskTextButton.md) — Simplified text button
- [UniDeskComboBox](./UniDeskComboBox.md) — Dropdown that inherits from UniDeskButton