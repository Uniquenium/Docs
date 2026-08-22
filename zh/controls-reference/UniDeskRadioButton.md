---
title: UniDeskRadioButton
editLink: true
---

# UniDeskRadioButton 类型

单选按钮控件，基于 QtQuick `RadioButton` 实现。自定义了圆形指示器样式、选中状态和主题自适应颜色。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskRadioButton.qml` |
| 继承 | QtQuick Templates RadioButton (T.RadioButton) |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义样式

- 指示器：圆形边框 + 选中时内部填充主题色小圆
- 悬停/按下状态有颜色过渡
- 文字使用 `UniDeskTextStyle.little` 字体
- 内容使用 `UniDeskText` 控件渲染

## 属性

继承自 QtQuick `RadioButton` 的所有属性。无额外自定义属性。

## 示例

```qml
import UniDesk.Controls 1.0

Column {
    UniDeskRadioButton {
        text: "选项 A"
        checked: true
    }
    UniDeskRadioButton {
        text: "选项 B"
    }
}
```

## 相关文档

- [UniDeskCheckBox](./UniDeskCheckBox.md) — 复选框