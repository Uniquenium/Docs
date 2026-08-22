---
title: UniDeskTextArea
editLink: true
---

# UniDeskTextArea 类型

多行文本输入框，基于 QtQuick `TextArea` 实现。自定义了边框、背景、文字颜色和焦点指示样式，内置滚动支持。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskTextArea.qml` |
| 继承 | QtQuick Rectangle（内含 `T.TextArea`） |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义样式

- 焦点边框使用主题色
- 文字颜色根据主题自适应
- 选中颜色使用主题色，选中文字反色
- 字体使用 `UniDeskTextStyle.little`
- 内置 `ScrollView` 支持滚动
- Placeholder 使用 `UniDeskText` 控件渲染

## 属性

继承自 QtQuick `TextArea` 的所有属性。额外暴露：
- `property alias area: control`：内部 TextArea 控件别名

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskTextArea {
    placeholderText: "请输入详细描述..."
    wrapMode: TextEdit.Wrap
    onEditingFinished: console.log("text:", text)
}
```

## 备注

- 失去焦点时自动 `focus = false`，便于焦点管理。
- Placeholder 文字支持富文本格式。

## 相关文档

- [UniDeskTextField](./UniDeskTextField.md) — 单行文本输入
- [UniDeskText](./UniDeskText.md) — 文本显示控件