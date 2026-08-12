---
title: UniDeskColorPicker
editLink: true
---

# UniDeskColorPicker Type

Color picker control, allowing users to pick colors through a visual interface, supporting presets, palettes, and custom color pickers.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskColorPicker.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: info Documentation in Progress
Detailed properties, methods, and examples for this control are being written. You can view the source code [UniDeskColorPicker.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskColorPicker.qml) first, or help us [improve this documentation](https://github.com/Uniquenium/Docs/edit/main/en/controls-reference/UniDeskColorPicker.md).
:::

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskColorPicker {
    width: 280
    onColorSelected: console.log("Selected color:", color)
}
```

## Related Documentation

- [UniDeskFontBox](/en/controls-reference/UniDeskFontBox.md) - Font selection
- [Glossary](/en/glossary.md)