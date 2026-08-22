---
title: UniDeskInfoBar
editLink: true
---

# UniDeskInfoBar Type

Info bar control for displaying temporary notification messages at the top of the window. Supports four types (success/info/warning/error), with auto-dismiss or manual close.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskInfoBar.qml` |
| Inherits | UniDeskObject |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `root` | `var` | — | Root object reference (used to locate popup container) |
| `layoutY` | `int` | `75` | Y coordinate for the popup container |

## Methods

### `function showSuccess(text, duration, moremsg) → Object`
Show a success notification. Default duration 1000ms.

### `function showInfo(text, duration, moremsg) → Object`
Show an info notification. Default duration 1000ms.

### `function showWarning(text, duration, moremsg) → Object`
Show a warning notification. Default duration 1000ms.

### `function showError(text, duration, moremsg) → Object`
Show an error notification. Default duration 1000ms.

### `function showCustom(itemcomponent, duration) → Object`
Show a custom component notification.

### `function clearAllInfo() → bool`
Clear all currently displayed notifications.

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | `string` | Notification text |
| `duration` | `int` | Display duration in milliseconds. `0` = no auto-dismiss, shows close button |
| `moremsg` | `string` | Additional description text (small gray text) |
| `itemcomponent` | `Component` | Custom notification content component |

## Style

- Each type has its own background and icon colors (auto-adapts to light/dark themes)
- Popup container uses `Overlay.overlay`
- Entrance animation: slide up + scale + fade-in
- Supports stacking multiple notifications

## Example

```qml
import UniDesk.Controls 1.0

UniDeskInfoBar {
    id: infoBar
    root: parent
    layoutY: 75
}

infoBar.showSuccess("Operation succeeded!")
infoBar.showError("Error occurred", 3000, "Please check your connection")
infoBar.showWarning("Warning: This action cannot be undone", 0)
```

## Related

- [UniDeskMessageBox](./UniDeskMessageBox.md) — Modal message dialog
- [UniDeskTooltip](./UniDeskTooltip.md) — Tooltip