---
title: UniDeskFontBox
editLink: true
---

# UniDeskFontBox Type

Font selection combo box based on `UniDeskComboBox`. Lists all available fonts in the system and supports live updates when custom fonts are added.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskFontBox.qml` |
| Inherits | UniDeskComboBox |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `fontList` | `list<string>` | `UniDeskTools.applicationFontFamilies()` | Available font families |

## Features

- Auto-populates from `UniDeskTools.applicationFontFamilies()`
- `enableFontDelegate: true` — renders each item in its own font
- `editable: true` — allows manual font name input
- Listens to `UniDeskTools.customFontsChanged` for live updates
- Falls back to "Microsoft YaHei" (微软雅黑) if current font is unavailable

## Example

```qml
import UniDesk.Controls 1.0

UniDeskFontBox {
    width: 300
    currentIndex: fontList.indexOf("Arial")
    onCurrentTextChanged: console.log("Font:", currentText)
}
```

## Related

- [UniDeskComboBox](./UniDeskComboBox.md) — Combo box base
- [UniDeskTextStyle](../cpp-ext/UniDeskTextStyle.md) — Text style