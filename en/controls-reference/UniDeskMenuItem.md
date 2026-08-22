---
title: UniDeskMenuItem
editLink: true
---

# UniDeskMenuItem Type

Menu item control based on QtQuick `MenuItem`. Supports icons, submenu arrows, checkmarks, and highlight states.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskMenuItem.qml` |
| Inherits | QtQuick Templates MenuItem |
| QML Import | `import UniDesk 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `disabled` | `bool` | `false` | Whether the item is disabled |
| `iconDelegate` | `Component` | — | Icon delegate (defaults to internal icon component) |
| `iconSpacing` | `int` | `5` | Spacing between icon and text |
| `iconSource` | `string` | — | Icon source path |
| `iconSize` | `int` | `16` | Icon size |
| `textColor` | `color` | Theme-adaptive | Text color |

## Style

- Auto-height based on content
- Themed background on hover (`highlighted`)
- Font: `UniDeskTextStyle.little`
- Supports checkmarks (`checkable`) and submenu arrows

## Example

```qml
import UniDesk 1.0

UniDeskMenu {
    UniDeskMenuItem {
        text: "Open"
        iconSource: "qrc:/media/img/folder.svg"
        onTriggered: console.log("open")
    }
    UniDeskMenuItem {
        text: "Save As"
        iconSource: "qrc:/media/img/save.svg"
    }
    UniDeskMenuSeparator {}
    UniDeskMenuItem {
        text: "Exit"
        onTriggered: Qt.quit()
    }
}
```

## Related

- [UniDeskMenu](./UniDeskMenu.md) — Menu
- [UniDeskMenuSeparator](./UniDeskMenuSeparator.md) — Menu separator