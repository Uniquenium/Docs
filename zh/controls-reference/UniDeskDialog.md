---
title: UniDeskDialog
editLink: true
---

# UniDeskDialog 类型

基本对话框控件，继承自 `UniDeskWindow`。与窗口不同的是，对话框不支持最大化和改变尺寸，并在失去焦点时自动重新激活。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskDialog.qml` |
| 继承 | [UniDeskWindow](./UniDeskWindow.md) |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 特性

- `flags: Qt.Dialog | Qt.FramelessWindowHint | Qt.WindowMinimizeButtonHint`
- `showMaximize: false` — 禁用最大化
- `fixSize: true` — 锁定窗口尺寸
- `onFocusOut` — 失去焦点时调用 `requestActivate()`，保持对话框在前台

## 使用

```qml
import UniDesk.Controls 1.0

UniDeskDialog {
    title: "确认操作"
    width: 360
    height: 180
    // 对话框内容
    Column {
        anchors.centerIn: parent
        Text { text: "确定要执行此操作吗？" }
    }
}
```

## 相关文档

- [UniDeskWindow](./UniDeskWindow.md) — 基类窗口控件