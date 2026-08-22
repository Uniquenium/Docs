---
title: UniDeskDialog
editLink: true
---

# UniDeskDialog Type

Basic dialog control, inherits from `UniDeskWindow`. Unlike windows, dialogs do not support maximizing or resizing, and automatically re-activate when losing focus.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskDialog.qml` |
| Inherits | [UniDeskWindow](./UniDeskWindow.md) |
| QML Import | `import UniDesk.Controls 1.0` |

## Features

- `flags: Qt.Dialog | Qt.FramelessWindowHint | Qt.WindowMinimizeButtonHint`
- `showMaximize: false` — Maximize disabled
- `fixSize: true` — Window size locked
- `onFocusOut` — Calls `requestActivate()` when focus is lost, keeping dialog in front

## Usage

```qml
import UniDesk.Controls 1.0

UniDeskDialog {
    title: "Confirm Action"
    width: 360
    height: 180
    Column {
        anchors.centerIn: parent
        Text { text: "Are you sure you want to proceed?" }
    }
}
```

## Related

- [UniDeskWindow](./UniDeskWindow.md) — Base window control