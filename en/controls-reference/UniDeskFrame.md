---
title: UniDeskFrame
editLink: true
---

# UniDeskFrame Type

Grouping container/card control based on QtQuick `Frame`. Provides a unified rounded border and themed background, commonly used to group related controls.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskFrame.qml` |
| Inherits | QtQuick Templates Frame |
| QML Import | `import UniDesk 1.0` |

## Custom Properties

| Property | Type | Description |
|----------|------|-------------|
| `color` | `color` | Background color (alias to internal `d.color`) |
| `border` | `border` | Border (alias to internal `d.border`) |
| `radius` | `real` | Corner radius (alias to internal `d.radius`) |

## Style

- 3px corner radius
- 1px border, auto-adapts to light/dark themes
- Background auto-adapts to light/dark themes (white in light / black in dark)
- No default padding

## Example

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

UniDeskFrame {
    width: 300
    height: 150
    radius: 8

    Column {
        anchors.fill: parent
        spacing: 10
        Text { text: "Group Title"; font.pixelSize: 16 }
        UniDeskButton { text: "Button" }
    }
}
```

## Related

- [UniDeskDialog](./UniDeskDialog.md) — Dialog
- [UniDeskWindow](./UniDeskWindow.md) — Window