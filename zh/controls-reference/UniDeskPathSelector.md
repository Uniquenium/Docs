---
title: UniDeskPathSelector
editLink: true
---

# UniDeskPathSelector 类型

路径选择器控件。组合文本输入框与浏览按钮（打开 `FileDialog` 或 `FolderDialog`），支持手动输入路径和对话框选择。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskPathSelector.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `path` | `string` | — | 当前选择的路径 |
| `mode` | `int` | `UniDeskFileMode.FileModeFile` | 文件或文件夹模式 |
| `parentWindow` | `Window` | `null` | 父窗口（用于显示错误消息） |

## 信号

### `signal submit()`
在确认有效路径时触发（通过回车键或对话框选择）。

## 枚举

### `UniDeskFileMode`

| 值 | 说明 |
|----|------|
| `FileModeFile` (0) | 文件选择模式 |
| `FileModeFolder` (1) | 文件夹选择模式 |

## 行为

- 回车时验证路径：检查本地文件是否存在或 URL 是否有效
- 允许空路径
- 无效路径时调用 `parentWindow.showError("路径无效")`
- 浏览按钮根据 `mode` 打开 `FileDialog` 或 `FolderDialog`

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskPathSelector {
    mode: UniDeskFileMode.FileModeFolder
    onSubmit: console.log("路径:", path)
}
```

## 相关文档

- [UniDeskTextField](./UniDeskTextField.md) — 文本输入
- [UniDeskButton](./UniDeskButton.md) — 按钮