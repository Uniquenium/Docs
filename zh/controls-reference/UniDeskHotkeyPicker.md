---
title: UniDeskHotkeyPicker
editLink: true
---

# UniDeskHotkeyPicker 类型

快捷键选择器控件，基于 `UniDeskButton` 实现。点击后弹出对话框，允许用户通过按键组合设置快捷键。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskHotkeyPicker.qml` |
| 继承 | UniDeskButton |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `current` | `list<string>` | `["Ctrl", "Shift", "A"]` | 当前快捷键组合 |
| `title` | `string` | `"激活快捷键"` | 对话框标题 |
| `message` | `string` | `"按下快捷键组合以更改快捷键"` | 对话框提示文字 |
| `positiveText` | `string` | `"保存"` | 保存按钮文字 |
| `neutralText` | `string` | `"取消"` | 取消按钮文字 |
| `negativeText` | `string` | `"重置"` | 重置按钮文字 |
| `registered` | `bool` | `true` | 当前快捷键是否已注册（`false` 时显示冲突提示） |
| `errorColor` | `color` | 红色 | 冲突错误颜色 |

## 信号

### `accepted()`
用户点击保存按钮后触发。

## 功能

- 点击按钮弹出 `UniDeskDialog` 对话框
- 对话框内捕获键盘输入（支持 Ctrl、Shift、Alt 修饰键）
- 按键通过 `keyToString()` 转换为字符串
- 支持保存、取消、重置三种操作
- 快捷键以胶囊形式展示

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskHotkeyPicker {
    current: ["Ctrl", "Shift", "S"]
    title: "保存快捷键"
    onAccepted: console.log("快捷键已保存")
}
```

## 相关文档

- [UniDeskDialog](./UniDeskDialog.md) — 对话框
- [UniDeskButton](./UniDeskButton.md) — 按钮