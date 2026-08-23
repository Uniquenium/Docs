---
title: UniDeskIcon
editLink: true
---

# UniDeskIcon Type

Icon display control based on `Image`. Uses `ColorOverlay` for icon tinting, making it easy to use SVG icons with dynamic color changes.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskIcon.qml` |
| Inherits | QtQuick Image |
| QML Import | `import UniDesk.Controls 1.0` |

## Properties

- `property string iconSource`：Icon source path (supports local files, qrc resources)
- `property color iconColor`：Icon tint color. Implemented via `ColorOverlay` overlay
- `property double iconSize`：Icon size (width and height are equal). Default: 15

## Examples

```qml
import UniDesk.Controls 1.0

UniDeskIcon {
    iconSource: "qrc:/media/img/settings.svg"
    iconColor: UniDeskSettings.primaryColor
    iconSize: 24
}
```

## Notes

- Icon is centered by default.
- When `iconColor` is `transparent`, the original image color is displayed.
- Automatically sets `width` and `height` to `iconSize`.

## Related

- [UniDeskButton](./UniDeskButton.md) — Uses UniDeskIcon as its icon