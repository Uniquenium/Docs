---
title: UniDeskInfoBar
editLink: true
---

# UniDeskInfoBar Type

Information bar control, used to display temporary info, success, warning, or error messages at the top or bottom of a window, supporting auto-dismiss.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskInfoBar.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: info Documentation in Progress
Detailed properties, methods, and examples for this control are being written. You can view the source code [UniDeskInfoBar.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskInfoBar.qml) first, or help us [improve this documentation](https://github.com/Uniquenium/Docs/edit/main/en/controls-reference/UniDeskInfoBar.md).
:::

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskWindow {
    width: 400
    height: 300

    UniDeskInfoBar {
        id: infoBar
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
    }

    Component.onCompleted: {
        infoBar.showSuccess("Operation successful!")
        // infoBar.showInfo("Info message")
        // infoBar.showWarning("Warning content")
        // infoBar.showError("Error content")
    }
}
```

## Related Documentation

- [UniDeskMessageBox](/en/controls-reference/UniDeskMessageBox.md) - Message dialog
- [UniDeskTooltip](/en/controls-reference/UniDeskTooltip.md) - Floating tooltip
- [Glossary](/en/glossary.md)