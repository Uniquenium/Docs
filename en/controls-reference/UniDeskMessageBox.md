---
title: UniDeskMessageBox
editLink: true
---

# UniDeskMessageBox Type

Modal message dialog based on `UniDeskDialog`. Displays a message and provides a customizable button group that auto-closes on click.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskMessageBox.qml` |
| Inherits | UniDeskDialog |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `clickedIndex` | `int` | `-1` | Index of the last clicked button |
| `text` | `string` | — | Message text displayed in the dialog |
| `autoCloseAfterClick` | `bool` | `true` | Auto-close after button click |

## Signals

### `buttonClicked()`
Emitted when a button is clicked. Use `clickedIndex` to get which button was clicked.

## Methods

### `function addButton(text)`
Add a button to the dialog.

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | `string` | Button text |

## Example

```qml
import UniDesk.Controls 1.0

UniDeskMessageBox {
    id: msgBox
    text: "Are you sure you want to delete this item?"
    autoCloseAfterClick: true
    onButtonClicked: {
        if (clickedIndex === 0) {
            // Confirmed
        } else {
            // Cancelled
        }
    }
    Component.onCompleted: {
        addButton("Cancel")
        addButton("OK")
    }
}

msgBox.open()
```

## Related

- [UniDeskDialog](./UniDeskDialog.md) — Dialog base
- [UniDeskInfoBar](./UniDeskInfoBar.md) — Non-modal info bar