---
title: UniDeskPathSelector
editLink: true
---

# UniDeskPathSelector Type

File or directory path selector control. Combines a text input field with a browse button (opens `FileDialog` or `FolderDialog`), supporting manual path input and dialog selection.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskPathSelector.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `path` | `string` | — | Selected path |
| `mode` | `int` | `UniDeskFileMode.FileModeFile` | File or folder mode |
| `parentWindow` | `Window` | `null` | Parent window (used to display error messages) |

## Signals

### `submit()`
Emitted when a valid path is confirmed (via Enter key or dialog selection).

## Enums

### `UniDeskFileMode`

| Value | Description |
|-------|-------------|
| `FileModeFile` (0) | File selection mode |
| `FileModeFolder` (1) | Folder selection mode |

## Behavior

- Path validation on Enter: checks local file existence or URL validity
- Empty path allowed
- Invalid path triggers `parentWindow.showError("路径无效")`
- Browse button opens `FileDialog` or `FolderDialog` based on `mode`

## Example

```qml
import UniDesk.Controls 1.0

UniDeskPathSelector {
    mode: UniDeskFileMode.FileModeFolder
    onSubmit: console.log("Path:", path)
}
```

## Related

- [UniDeskTextField](./UniDeskTextField.md) — Text input
- [UniDeskButton](./UniDeskButton.md) — Button