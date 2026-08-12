---
title: UniDeskPosSelector
editLink: true
---

# UniDeskPosSelector Type
Position selector control, used for selecting or previewing component positions.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskPosSelector.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: info Documentation in Progress
Detailed properties, methods, and examples for this control are being written. You can view the source code [UniDeskPosSelector.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskPosSelector.qml) first, or help us [improve this documentation](https://github.com/Uniquenium/Docs/edit/main/en/controls-reference/UniDeskPosSelector.md).
:::

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskPosSelector {
    width: 200
    height: 150
    onPositionChanged: console.log("Position changed")
}
```

## Related Documentation

- [UniDeskSizeSelector](/en/controls-reference/UniDeskSizeSelector.md) - Size selector
- [Glossary](/en/glossary.md)