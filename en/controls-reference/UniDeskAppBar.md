---
title: UniDeskAppBar
editLink: true
---

# UniDeskAppBar Type

Application top bar control providing a Windows 11-style title bar. Includes window title, minimize/maximize (restore)/close buttons, and an optional stay-on-top button.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskAppBar.qml` |
| Inherits | QtQuick Rectangle |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `""` | Window title |
| `minimizeText` | `string` | `"Minimize"` | Minimize button tooltip |
| `restoreText` | `string` | `"Restore"` | Restore button tooltip |
| `maximizeText` | `string` | `"Maximize"` | Maximize button tooltip |
| `closeText` | `string` | `"Close"` | Close button tooltip |
| `showDark` | `bool` | `false` | Use dark style |
| `showClose` | `bool` | `true` | Show close button |
| `showMinimize` | `bool` | `true` | Show minimize button |
| `showMaximize` | `bool` | `true` | Show maximize button |
| `showStayTop` | `bool` | `true` | Show stay-on-top button |
| `titleVisible` | `bool` | `true` | Whether title is visible |
| `icon` | `url` | — | Window icon |
| `iconSize` | `int` | `20` | Icon size |
| `isMac` | `bool` | auto-detected | Whether on macOS (read-only, auto-detected by `UniDeskUtils.isMacos()`) |

### Overridable Click Handlers

| Property | Type | Description |
|----------|------|-------------|
| `maxClickListener` | `var` (function) | Maximize button click handler. Default: toggles window maximize/restore |
| `minClickListener` | `var` (function) | Minimize button click handler. Default: minimizes the window |
| `closeClickListener` | `var` (function) | Close button click handler. Default: closes the window |

## Child Aliases

| Property | Description |
|----------|-------------|
| `buttonMinimize` | Minimize button (`UniDeskButton`) |
| `buttonMaximize` | Maximize/restore button (`UniDeskButton`) |
| `buttonClose` | Close button (`UniDeskButton`) |
| `layoutStandardbuttons` | Button layout container |

## Behavior

- Auto-adapts to window state: maximize toggles to restore icon and text
- Clicking buttons triggers corresponding window operations (minimize, maximize/restore, close)
- Button colors auto-adapt to light/dark themes
- Height: 30px when visible, 0px when hidden

## Example

```qml
import UniDesk.Controls 1.0

UniDeskWindow {
    width: 600
    height: 400

    UniDeskAppBar {
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        title: "My App"
        showStayTop: false
    }
}
```

## Related

- [UniDeskWindow](./UniDeskWindow.md) — Window control
- [UniDeskButton](./UniDeskButton.md) — Button control