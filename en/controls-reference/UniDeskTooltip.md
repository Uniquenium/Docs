---
title: UniDeskTooltip
editLink: true
---

# UniDeskTooltip Type

Tooltip control based on QtQuick `ToolTip`. Displays a small hint when the mouse hovers over an associated control.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskTooltip.qml` |
| Inherits | QtQuick Templates ToolTip |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | — | Tooltip text (inherited from ToolTip) |
| `font` | `font` | `UniDeskTextStyle.tiny` | Font |

## Style

- Positioned 3px above the associated control, centered
- Background: opaque (white in light / black in dark)
- Border: 0.5px, auto-adapts to light/dark themes
- Padding: 6px
- Font: `UniDeskTextStyle.tiny`

## Behavior

- Supports ESC key and outside click (press/release) to close
- Auto-wraps text (`Text.Wrap`)

## Example

```qml
import UniDesk.Controls 1.0

UniDeskButton {
    text: "Save"
    UniDeskTooltip {
        text: "Save current content to file"
    }
}
```

## Related

- [UniDeskInfoBar](./UniDeskInfoBar.md) — Info bar
- [UniDeskTextStyle](../cpp-ext/UniDeskTextStyle.md) — Text style