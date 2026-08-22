---
title: UDCText
editLink: true
---

# UDCText Component

Text display component — one of the most commonly used components in Uniquenium. Supports complete text property configuration (font, color, alignment, styles) and has a built-in `%{}` expression engine for dynamic data display (CPU usage, battery, time, etc.).

| Item | Description |
|------|-------------|
| Component Type | Built-in (UDC) |
| Source File | `UniDesk/Components/UDCText/UDCText.qml` |
| Inherits | `UniDeskComBase` → `UniDeskComBox` → `UniDeskObject` |

## Properties

### Content
- `property string textContent`: Text content. Supports `%{variable}` expression syntax, automatically parsed by `UniDeskExpr`. Default: `"Text"`

### Appearance
- `property color textColor`: Text color. Follows theme by default: black for light, white for dark
- `property color styleColor`: Accent color. Defaults to `UniDeskSettings.primaryColor`
- `property int textFormat`: Text format (`Text.PlainText` / `Text.RichText` / `Text.MarkdownText`). Default: `Text.RichText`
- `property int wrapMode`: Line wrap mode. Default: `Text.Wrap`

### Font
- `property string fontFamily`: Font family. Defaults to `UniDeskTextStyle.family`
- `property real fontSize`: Font size in pixels. Default: 30
- `property bool bold`: Bold. Default: `false`
- `property bool italic`: Italic. Default: `false`
- `property bool underline`: Underline. Default: `false`
- `property bool strikeout`: Strikeout. Default: `false`
- `property bool smallCaps`: Small caps. Default: `false`
- `property int weight`: Font weight. Default: `Font.Normal`
- `property int style`: Font style. Default: `Text.Normal`

### Spacing & Alignment
- `property real letterSpacing`: Letter spacing. Default: 0
- `property real wordSpacing`: Word spacing. Default: 0
- `property real lineHeight`: Line height multiplier. Default: 1
- `property int horizontalAlignment`: Horizontal alignment. Default: `Text.AlignHCenter`
- `property int verticalAlignment`: Vertical alignment. Default: `Text.AlignVCenter`

## Dynamic Expressions

UDCText uses an internal `flushText` Timer (50ms interval) to continuously call `UniDeskExpr.convertStr()` and refresh the text. Supported `%{}` variables:

| Variable | Description |
|----------|-------------|
| `%{cpu}` | CPU usage |
| `%{mem}` | Memory usage |
| `%{net}` | Network download speed |
| `%{bat}` | Battery percentage |
| `%{date}` | Current date |
| `%{time}` | Current time |
| `%{datetime}` | Current date and time |

Custom variables can also be passed through template presets.

## Example

```qml
// Display real-time CPU and battery
// In the component editor, create UDCText, set textContent to:
"CPU: %{cpu}%  Battery: %{bat}%"

// Welcome message
"Welcome to Uniquenium"

// Rich text
"<b>Bold</b> <font color='red'>Red text</font>"
```

## Property Data Export

```javascript
function propertyDataEx() {
    return {
        textContent, textColorR, textColorG, textColorB, textColorA,
        fontFamily, fontSize, smallCaps, bold, italic, underline, strikeout,
        letterSpacing, wordSpacing, lineHeight, weight, style,
        styleColorR, styleColorG, styleColorB, styleColorA,
        textFormat, wrapMode, horizontalAlignment, verticalAlignment
    }
}
```

## Related

- [UniDeskExpr](../controls-reference/cpp-ext/UniDeskExpr.md) — `%{}` expression engine
- [UniDeskTextStyle](../controls-reference/cpp-ext/UniDeskTextStyle.md) — Global font styles
- [UniDeskSettings](../controls-reference/cpp-ext/UniDeskSettings.md) — `primaryColor` theme color