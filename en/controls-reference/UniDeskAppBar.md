---
title: UniDeskAppBar
editLink: true
---

# UniDeskAppBar Type

Application top bar control, providing a style similar to Windows 11 application title bars, typically containing window title, minimize/maximize/close buttons.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskAppBar.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: info Documentation in Progress
Detailed properties, methods, and examples for this control are being written. You can view the source code [UniDeskAppBar.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskAppBar.qml) first, or help us [improve this documentation](https://github.com/Uniquenium/Docs/edit/main/en/controls-reference/UniDeskAppBar.md).
:::

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskWindow {
    width: 600
    height: 400

    UniDeskAppBar {
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        title: "My Application"
    }
}
```

## Related Documentation

- [UniDeskWindow](/en/controls-reference/UniDeskWindow.md) - Window control
- [Glossary](/en/glossary.md) - Controls vs Components