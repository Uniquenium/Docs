---
title: UniDeskShadow
editLink: true
---

# UniDeskShadow Type

High-performance shadow control using multiple layered `Rectangle` items to simulate shadow effects. Several times faster than `DropShadow`.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskShadow.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `color` | `color` | Dark `#000000` / Light `#999999` | Shadow color |
| `elevation` | `int` | `5` | Shadow level (determines thickness and layers) |
| `radius` | `int` | `4` | Corner radius |

## Principle

Uses `Repeater` to create `elevation` `Rectangle` items, each offset by 1px with decreasing opacity:

```
opacity: 0.01 * (elevation - index + 1)
anchors.margins: -index
border.width: index
radius: radius + index
```

## Example

```qml
import UniDesk.Controls 1.0

Rectangle {
    width: 200
    height: 100
    color: "#fff"
    radius: 8

    UniDeskShadow {
        anchors.fill: parent
        elevation: 8
        radius: 8
    }
}
```

## Related

- [UniDeskFrame](./UniDeskFrame.md) — Frame container
- [UniDeskTextStyle](./cpp-ext/UniDeskTextStyle.md) — Text style