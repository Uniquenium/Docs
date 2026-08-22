---
title: UniDeskSpinBox
editLink: true
---

# UniDeskSpinBox 类型

数值输入框，基于 QtQuick `SpinBox` 实现。自定义了按钮样式和主题色。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskSpinBox.qml` |
| 继承 | QtQuick SpinBox |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义样式

- 文本居中对齐，使用 `UniDeskTextStyle.little` 字体
- 上下箭头按钮使用主题色悬停效果
- 边框和背景根据主题自适应

## 属性

继承自 QtQuick `SpinBox` 的所有属性。无额外自定义属性。

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskSpinBox {
    from: 0
    to: 100
    value: 50
    onValueModified: console.log("value:", value)
}
```

## 相关文档

- [UniDeskTextField](./UniDeskTextField.md) — 单行文本输入
- [UniDeskTextArea](./UniDeskTextArea.md) — 多行文本输入