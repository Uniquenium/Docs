---
title: UniDeskImage
editLink: true
---

# UniDeskImage Type

Image display control, supporting loading and displaying local images, network images, and QRC resource images.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskImage.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: info Documentation in Progress
Detailed properties, methods, and examples for this control are being written. You can view the source code [UniDeskImage.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskImage.qml) first, or help us [improve this documentation](https://github.com/Uniquenium/Docs/edit/main/en/controls-reference/UniDeskImage.md).
:::

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskImage {
    width: 200
    height: 200
    source: "qrc:/images/logo.png"
    fillMode: Image.PreserveAspectCrop
}
```

## Related Documentation

- [UniDeskIcon](/en/controls-reference/UniDeskIcon.md) - Icon control
- [Glossary](/en/glossary.md)