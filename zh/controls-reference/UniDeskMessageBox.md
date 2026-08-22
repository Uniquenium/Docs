---
title: UniDeskMessageBox
editLink: true
---

# UniDeskMessageBox 类型

模态消息对话框，基于 `UniDeskDialog` 实现。显示消息文本并提供可自定义的按钮组，点击按钮后自动关闭。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskMessageBox.qml` |
| 继承 | UniDeskDialog |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `clickedIndex` | `int` | `-1` | 最后点击的按钮索引 |
| `text` | `string` | — | 对话框显示的消息文本 |
| `autoCloseAfterClick` | `bool` | `true` | 点击按钮后是否自动关闭 |

## 信号

### `buttonClicked()`
按钮被点击时触发。可通过 `clickedIndex` 获取点击的按钮索引。

## 方法

### `function addButton(text)`
添加一个按钮。

| 参数 | 类型 | 说明 |
|------|------|------|
| `text` | `string` | 按钮文字 |

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskMessageBox {
    id: msgBox
    text: "确定要删除此项吗？"
    autoCloseAfterClick: true
    onButtonClicked: {
        if (clickedIndex === 0) {
            // 确认
        } else {
            // 取消
        }
    }
    Component.onCompleted: {
        addButton("取消")
        addButton("确定")
    }
}

// 显示对话框
msgBox.open()
```

## 相关文档

- [UniDeskDialog](./UniDeskDialog.md) — 对话框基类
- [UniDeskInfoBar](./UniDeskInfoBar.md) — 非模态信息提示