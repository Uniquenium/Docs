---
title: UniDeskPathSelector
editLink: true
---

# UniDeskPathSelector Type

File or directory path selector control, supporting the selection of file or directory paths, typically used in settings panels.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskPathSelector.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: info Documentation in Progress
Detailed properties, methods, and examples for this control are being written. You can view the source code [UniDeskPathSelector.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskPathSelector.qml) first, or help us [improve this documentation](https://github.com/Uniquenium/Docs/edit/main/en/controls-reference/UniDeskPathSelector.md).
:::

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskPathSelector {
    width: 300
    mode: UniDeskPathSelector.Directory
    onPathChanged: console.log("Selected path:", path)
}
```

## Related Documentation

- [UniDeskFileComboBox](/en/controls-reference/UniDeskComboBox.md) - Dropdown control
- [Glossary](/en/glossary.md)