---
title: UniDeskFontBox
editLink: true
---

# UniDeskFontBox 类型

字体选择下拉框控件，基于 `UniDeskComboBox` 实现。列出系统中所有可用字体，并支持自定义字体添加时的实时更新。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskFontBox.qml` |
| 继承 | UniDeskComboBox |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `fontList` | `list<string>` | `UniDeskTools.applicationFontFamilies()` | 可用字体列表 |

## 功能

- 自动从 `UniDeskTools.applicationFontFamilies()` 获取字体列表
- `enableFontDelegate: true` — 每项以对应字体样式渲染
- `editable: true` — 允许手动输入字体名
- 监听 `UniDeskTools.customFontsChanged` 信号实时更新
- 当前字体不可用时回退到"微软雅黑"

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskFontBox {
    width: 300
    currentIndex: fontList.indexOf("Arial")
    onCurrentTextChanged: console.log("字体:", currentText)
}
```

## 相关文档

- [UniDeskComboBox](./UniDeskComboBox.md) — 下拉选择框基类
- [UniDeskTextStyle](../cpp-ext/UniDeskTextStyle.md) — 字体样式