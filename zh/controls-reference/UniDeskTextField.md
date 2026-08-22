---
title: UniDeskTextField
editLink: true
---

# UniDeskTextField 类型

单行文本输入框，基于 `T.TextField`（QtQuick Templates）实现。自定义了边框、背景、文字颜色和焦点指示样式。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskTextField.qml` |
| 继承 | T.TextField（QtQuick Templates） |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enableFontDelegate` | `bool` | `false` | 启用字体委托模式：将输入文字作为字体名渲染 |

## 自定义样式

- 焦点边框使用主题色（`UniDeskSettings.primaryColor`）
- 非焦点边框使用主题自适应颜色
- 文字颜色根据主题自适应（浅色/深色模式）
- 选中颜色使用主题色
- 字体使用 `UniDeskTextStyle.little`（启用字体委托时使用文字作为字体名）
- 圆角 5px，边框宽度 1px
- 失焦时自动清除焦点

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskTextField {
    placeholderText: "请输入用户名"
    onEditingFinished: console.log("text:", text)
}

// 字体委托模式
UniDeskTextField {
    enableFontDelegate: true
    text: "Microsoft YaHei"
}
```

## 相关文档

- [UniDeskTextArea](./UniDeskTextArea.md) — 多行文本输入
- [UniDeskSpinBox](./UniDeskSpinBox.md) — 数值输入
- [UniDeskFontBox](./UniDeskFontBox.md) — 使用字体委托的字体选择器