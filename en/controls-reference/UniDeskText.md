---
title: UniDeskText
editLink: true
---

# UniDeskText Type

Text display control based on QtQuick `Text`. Encapsulates theme-aware text color and font, simplifying text display configuration.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskText.qml` |
| Inherits | QtQuick Text |
| QML Import | `import UniDesk.Controls 1.0` |

## Properties

### `property color textColor`
Text color. Follows theme by default: black for light mode, white for dark mode. Auto-dims when disabled.

### `property string fontFamily`
Font family name. When set, uses a custom font; otherwise falls back to global `UniDeskTextStyle.little`.

### `property double fontSize`
Font size in pixels. Defaults to `UniDeskTextStyle.little.pixelSize` (13px).

## Example

```qml
import UniDesk.Controls 1.0

UniDeskText {
    text: "Hello, Uniquenium"
    textColor: "#FF5733"
    fontFamily: "Microsoft YaHei"
    fontSize: 20
}
```

## Notes

- `textColor` automatically dims when `enabled: false`.
- `fontFamily` and `fontSize` have sensible defaults — usually no configuration needed.
- Vertical alignment defaults to center (`Qt.AlignVCenter`).

## Related

- [UniDeskTextStyle](./cpp-ext/UniDeskTextStyle.md) — Global font styles
- [UDCText](../component-encyclopedia/UDCText.md) — Dynamic text component with `%{}` expressions