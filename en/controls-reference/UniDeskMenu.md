---
title: UniDeskMenu
editLink: true
---

# UniDeskMenu Type

Popup menu control based on QtQuick `Menu`. Provides a semi-transparent acrylic background, rounded border, and fade in/out animation. Supports scrolling when content exceeds the window.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskMenu.qml` |
| Inherits | QtQuick Templates Menu |
| QML Import | `import UniDesk 1.0` |

## Custom Properties

| Property | Type | Description |
|----------|------|-------------|
| `comManager` | `var` | Component manager reference, calls `comManager.menuClosed()` on close |

## Style

- Semi-transparent background (70% white in light / 70% black in dark)
- 1px border, auto-adapts to light/dark themes
- 3px corner radius
- Scrollable content with vertical scrollbar when overflowing

## Behavior

- `enter` animation: fade-in (100ms)
- `exit` animation: fade-out (100ms)
- `closePolicy`: supports ESC key and outside click to close
- Auto-calls `comManager.menuClosed()` on close (if `comManager` is set)

## Example

```qml
import UniDesk 1.0

UniDeskMenu {
    id: contextMenu
    comManager: comManager

    UniDeskMenuItem {
        text: "Copy"
        onTriggered: console.log("copy")
    }
    UniDeskMenuItem {
        text: "Paste"
        onTriggered: console.log("paste")
    }
}

MouseArea {
    anchors.fill: parent
    onClicked: contextMenu.popup(parent)
}
```

## Related

- [UniDeskMenuItem](./UniDeskMenuItem.md) — Menu item
- [UniDeskMenuSeparator](./UniDeskMenuSeparator.md) — Menu separator