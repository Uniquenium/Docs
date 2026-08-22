---
title: UniDeskCheckBox
editLink: true
---

# UniDeskCheckBox 类型

复选框控件，基于 QtQuick `CheckBox` 实现。自定义了选中指示器的圆形样式和主题自适应颜色。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskCheckBox.qml` |
| 继承 | QtQuick CheckBox |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义样式

- 指示器：圆形，选中时显示主题色背景和白色勾选图标
- 悬停/按下状态有颜色过渡动画
- 文字使用 `UniDeskTextStyle.little` 字体

## 属性

继承自 QtQuick `CheckBox` 的所有属性。主要自定义属性：无。

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskCheckBox {
    text: "启用自动保存"
    checked: true
    onCheckedChanged: console.log("checked:", checked)
}
```

## 相关文档

- [UniDeskRadioButton](./UniDeskRadioButton.md) — 单选按钮
- [UniDeskTextStyle](./cpp-ext/UniDeskTextStyle.md) — 全局字体样式