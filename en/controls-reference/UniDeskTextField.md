---
title: UniDeskTextField
editLink: true
---

# UniDeskTextField Type

Single-line text input field based on `T.TextField` (QtQuick Templates). Custom border, background, text color, and focus indicator styles.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskTextField.qml` |
| Inherits | T.TextField (QtQuick Templates) |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableFontDelegate` | `bool` | `false` | Enable font delegate mode: renders input text as a font name |

## Custom Styling

- Focus border uses theme color (`UniDeskSettings.primaryColor`)
- Non-focus border uses theme-adaptive color
- Text color auto-adapts to light/dark theme
- Selection color uses theme color
- Font uses `UniDeskTextStyle.little` (or text as font name when font delegate enabled)
- 5px corner radius, 1px border width
- Focus automatically cleared when losing focus

## Examples

```qml
import UniDesk.Controls 1.0

UniDeskTextField {
    placeholderText: "Enter username"
    onEditingFinished: console.log("text:", text)
}

// Font delegate mode
UniDeskTextField {
    enableFontDelegate: true
    text: "Microsoft YaHei"
}
```

## Related

- [UniDeskTextArea](./UniDeskTextArea.md) — Multi-line text input
- [UniDeskSpinBox](./UniDeskSpinBox.md) — Numeric input
- [UniDeskFontBox](./UniDeskFontBox.md) — Font selector using font delegate