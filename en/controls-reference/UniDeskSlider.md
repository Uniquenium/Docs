---
title: UniDeskSlider
editLink: true
---

# UniDeskSlider Type

Slider control that allows users to select a value within a specified range by dragging the slider.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskSlider.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: info Documentation in Progress
Detailed properties, methods, and examples for this control are being written. You can view the source code [UniDeskSlider.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskSlider.qml) first, or help us [improve this documentation](https://github.com/Uniquenium/Docs/edit/main/en/controls-reference/UniDeskSlider.md).
:::

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskSlider {
    width: 200
    from: 0
    to: 100
    value: 50
    onMoved: console.log("Current value:", value)
}
```

## Related Documentation

- [UniDeskSpinBox](/en/controls-reference/UniDeskSpinBox.md) - Numeric spin box
- [Glossary](/en/glossary.md)