---
title: UniDeskTextArea
editLink: true
---

# UniDeskTextArea Type

Multi-line text input control based on QtQuick `TextArea`. Provides themed styling, placeholder text, and selection color.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskTextArea.qml` |
| Inherits | QtQuick Rectangle (contains `T.TextArea`) |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Description |
|----------|------|-------------|
| `area` | `alias` | Alias to the internal `TextArea` control |

## Style

- Border: 1px, theme-adaptive color (or primary color when focused)
- Corner radius: 5px
- Background: Semi-transparent (lighter on hover)
- Font: `UniDeskTextStyle.little`
- Padding: 6px + 4px left padding
- Selection color: `UniDeskSettings.primaryColor`
- Text color and placeholder color adapt to theme

## Behavior

- `onEditingFinished`: releases focus
- Placeholder text auto-hides when text is present or focus is centered
- Inherits all `TextArea` properties (`text`, `placeholderText`, `cursorPosition`, etc.)

## Example

```qml
import UniDesk.Controls 1.0

UniDeskTextArea {
    width: 300
    height: 150
    area.text: "Hello World"
    area.placeholderText: "Enter text..."
    onArea.editingFinished: console.log("Finished editing")
}
```

## Related

- [UniDeskTextField](./UniDeskTextField.md) — Single-line text input
- [UniDeskText](./UniDeskText.md) — Text display