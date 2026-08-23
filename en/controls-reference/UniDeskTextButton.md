---
title: UniDeskTextButton
editLink: true
---

# UniDeskTextButton Type

Simplified text button with transparent background and highlighted text on hover/press. Commonly used for toolbar buttons, link buttons, and other lightweight scenarios.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskTextButton.qml` |
| Inherits | QtQuick Button |
| QML Import | `import UniDesk.Controls 1.0` |

## Properties

- `property bool disabled`：Whether disabled. Default: `false`
- `property string contentDescription`：Accessibility description text
- `property color normalColor`：Normal color. Default: `UniDeskSettings.primaryColor`
- `property color hoverColor`：Hover color. Auto-lighten/darken based on theme
- `property color pressedColor`：Press color. Auto-lighten/darken more based on theme
- `property color disableColor`：Disabled color. Default: `normalColor.darker(3.3)`
- `property bool textBold`：Whether text is bold. Default: `true`
- `property url webLink`：Web link opened on click. When set, clicking automatically opens the link with the system browser

## Examples

```qml
import UniDesk.Controls 1.0

UniDeskTextButton {
    text: "GitHub"
    webLink: "https://github.com"
}

UniDeskTextButton {
    text: "Save"
    onClicked: saveData()
}
```

## Notes

- Button background is always transparent, only the text color changes.
- When `webLink` is set, clicking automatically calls `UniDeskTools.web_browse()` to open the link.
- Text color automatically switches based on state via `UniDeskTools.switchColor()`.

## Related

- [UniDeskButton](./UniDeskButton.md) — More feature-complete button control
- [UniDeskTools](./cpp-ext/UniDeskTools.md) — `web_browse()` method