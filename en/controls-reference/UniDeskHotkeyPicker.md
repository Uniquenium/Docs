---
title: UniDeskHotkeyPicker
editLink: true
---

# UniDeskHotkeyPicker Type

Shortcut key picker control, allowing users to press a key combination in the UI to set a global or local shortcut.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskHotkeyPicker.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: info Documentation in Progress
Detailed properties, methods, and examples for this control are being written. You can view the source code [UniDeskHotkeyPicker.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskHotkeyPicker.qml) first, or help us [improve this documentation](https://github.com/Uniquenium/Docs/edit/main/en/controls-reference/UniDeskHotkeyPicker.md).
:::

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskHotkeyPicker {
    width: 200
    hotkeyText: "Ctrl+Alt+U"
    onHotkeyChanged: console.log("New shortcut:", hotkeyText)
}
```

## Related Documentation

- [UniDeskSettingsWindow](/en/controls-reference/singletons/UniDeskSettingsWindow.md) - Settings window
- [Glossary](/en/glossary.md)