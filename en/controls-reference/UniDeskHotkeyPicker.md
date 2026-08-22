---
title: UniDeskHotkeyPicker
editLink: true
---

# UniDeskHotkeyPicker Type

Shortcut key picker control based on `UniDeskButton`. Click to open a dialog where users can press a key combination to set a shortcut.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskHotkeyPicker.qml` |
| Inherits | UniDeskButton |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `current` | `list<string>` | `["Ctrl", "Shift", "A"]` | Current shortcut key combination |
| `title` | `string` | `"Activate Shortcut"` | Dialog title |
| `message` | `string` | `"Press a key combination to change the shortcut"` | Dialog message |
| `positiveText` | `string` | `"Save"` | Save button text |
| `neutralText` | `string` | `"Cancel"` | Cancel button text |
| `negativeText` | `string` | `"Reset"` | Reset button text |
| `registered` | `bool` | `true` | Whether the shortcut is registered (shows conflict when `false`) |
| `errorColor` | `color` | Red | Conflict error color |

## Signals

### `accepted()`
Emitted when the user clicks the Save button.

## Features

- Click button to open `UniDeskDialog`
- Captures keyboard input in the dialog (supports Ctrl, Shift, Alt modifiers)
- Keys converted to strings via `keyToString()`
- Save, Cancel, Reset operations
- Shortcut displayed as capsule-shaped chips

## Example

```qml
import UniDesk.Controls 1.0

UniDeskHotkeyPicker {
    current: ["Ctrl", "Shift", "S"]
    title: "Save Shortcut"
    onAccepted: console.log("Shortcut saved")
}
```

## Related

- [UniDeskDialog](./UniDeskDialog.md) — Dialog
- [UniDeskButton](./UniDeskButton.md) — Button