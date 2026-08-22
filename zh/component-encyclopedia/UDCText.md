---
title: UDCText
editLink: true
---

# UDCText 组件

文本显示组件，是 Uniquenium 中最常用的组件之一。支持字体、颜色、对齐、样式等完整文本属性配置，内置 `%{}` 表达式引擎可实现动态数据显示（如 CPU 使用率、电量、时间等实时数据）。

| 项目 | 说明 |
|------|------|
| 组件类型 | 内置组件（UDC） |
| 源文件 | `UniDesk/Components/UDCText/UDCText.qml` |
| 继承 | `UniDeskComBase` → `UniDeskComBox` → `UniDeskObject` |

## 属性

### 文本内容
- `property string textContent`：文本内容。支持 `%{变量名}` 表达式语法，通过 `UniDeskExpr` 自动解析。默认值：`"文字"`

### 外观
- `property color textColor`：文字颜色。默认跟随主题：浅色黑色，深色白色
- `property color styleColor`：强调色。用于高亮/链接样式。默认取 `UniDeskSettings.primaryColor`
- `property int textFormat`：文本格式（`Text.PlainText` / `Text.RichText` / `Text.MarkdownText`）。默认：`Text.RichText`
- `property int wrapMode`：换行模式。默认：`Text.Wrap`

### 字体
- `property string fontFamily`：字体家族。默认取 `UniDeskTextStyle.family`
- `property real fontSize`：字号（像素）。默认：30
- `property bool bold`：是否加粗。默认：`false`
- `property bool italic`：是否斜体。默认：`false`
- `property bool underline`：是否下划线。默认：`false`
- `property bool strikeout`：是否删除线。默认：`false`
- `property bool smallCaps`：是否小型大写字母。默认：`false`
- `property int weight`：字体字重。默认：`Font.Normal`
- `property int style`：字体样式。默认：`Text.Normal`

### 间距与对齐
- `property real letterSpacing`：字符间距。默认：0
- `property real wordSpacing`：单词间距。默认：0
- `property real lineHeight`：行高倍数。默认：1
- `property int horizontalAlignment`：水平对齐。默认：`Text.AlignHCenter`
- `property int verticalAlignment`：垂直对齐。默认：`Text.AlignVCenter`

## 动态表达式

UDCText 通过内部 `flushText` Timer（50ms 间隔）持续调用 `UniDeskExpr.convertStr()` 刷新文本内容。支持的 `%{}` 变量：

| 变量 | 说明 |
|------|------|
| `%{cpu}` | CPU 使用率 |
| `%{mem}` | 内存使用率 |
| `%{net}` | 网络下载速率 |
| `%{bat}` | 电池百分比 |
| `%{date}` | 当前日期 |
| `%{time}` | 当前时间 |
| `%{datetime}` | 当前日期时间 |

也支持通过模板预设传入自定义变量。

## 使用示例

```qml
// 显示 CPU 和电量实时数据
// 在组件编辑器中创建 UDCText，设置 textContent 为：
"CPU: %{cpu}%  电量: %{bat}%"

// 显示欢迎信息
"欢迎使用 Uniquenium"

// 富文本
"<b>加粗文字</b> <font color='red'>红色文字</font>"
```

## 属性数据导出

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

## 相关文档

- [UniDeskExpr](../controls-reference/cpp-ext/UniDeskExpr.md) — `%{}` 表达式引擎
- [UniDeskTextStyle](../controls-reference/cpp-ext/UniDeskTextStyle.md) — 全局字体样式
- [UniDeskSettings](../controls-reference/cpp-ext/UniDeskSettings.md) — `primaryColor` 主题色