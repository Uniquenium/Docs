---
title: UniDeskSizeSelector
editLink: true
---

# UniDeskSizeSelector Type
Size selector control, used for selecting or previewing component sizes.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskSizeSelector.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: info Documentation in Progress
Detailed properties, methods, and examples for this control are being written. You can view the source code [UniDeskSizeSelector.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskSizeSelector.qml) first, or help us [improve this documentation](https://github.com/Uniquenium/Docs/edit/main/en/controls-reference/UniDeskSizeSelector.md).
:::

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskSizeSelector {
    width: 200
    onSizeChanged: console.log("Size changed")
}
```

## Related Documentation

- [UniDeskPosSelector](/en/controls-reference/UniDeskPosSelector.md) - Position selector
- [Glossary](/en/glossary.md)