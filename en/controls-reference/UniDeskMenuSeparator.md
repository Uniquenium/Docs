---
title: UniDeskMenuSeparator
editLink: true
---

# UniDeskMenuSeparator Type

Menu separator control based on QtQuick `Rectangle`. Provides a thin line between menu items.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskMenuSeparator.qml` |
| Inherits | QtQuick Rectangle |
| QML Import | `import UniDesk 1.0` |

## Style

- Width: fills parent
- Height: 1.5px
- Color auto-adapts to light/dark themes (black in light / white in dark)

## Example

```qml
import UniDesk 1.0

UniDeskMenu {
    UniDeskMenuItem { text: "Cut" }
    UniDeskMenuItem { text: "Copy" }
    UniDeskMenuSeparator {}
    UniDeskMenuItem { text: "Paste" }
}
```

## Related

- [UniDeskMenu](./UniDeskMenu.md) — Menu
- [UniDeskMenuItem](./UniDeskMenuItem.md) — Menu item