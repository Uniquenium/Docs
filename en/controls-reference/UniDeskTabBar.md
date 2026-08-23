---
title: UniDeskTabBar
editLink: true
---

# UniDeskTabBar Type

Tab bar control based on QtQuick `TabBar`. Transparent background, designed to work with `UniDeskTabButton`.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskTabBar.qml` |
| Inherits | QtQuick TabBar |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Styling

- Transparent background
- 2px padding

## Examples

```qml
import UniDesk.Controls 1.0

TabView {
    TabBar {
        Repeater {
            model: 3
            delegate: UniDeskTabButton {
                text: "Tab " + (index + 1)
            }
        }
    }
    contentItem: StackLayout {
        Repeater {
            model: 3
            delegate: Rectangle {
                color: index % 2 ? "#eee" : "#ddd"
            }
        }
    }
}
```

## Related

- [UniDeskTabButton](./UniDeskTabButton.md) — Tab button