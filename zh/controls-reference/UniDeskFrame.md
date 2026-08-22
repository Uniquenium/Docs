---
title: UniDeskFrame
editLink: true
---

# UniDeskFrame 类型

分组容器/卡片控件，基于 QtQuick `Frame` 实现。提供统一的圆角边框和主题色背景，常用于将相关控件组织在一个分组内。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskFrame.qml` |
| 继承 | QtQuick Templates Frame |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `color` | `color` | 背景色（别名为内部 `d.color`） |
| `border` | `border` | 边框（别名为内部 `d.border`） |
| `radius` | `real` | 圆角半径（别名为内部 `d.radius`） |

## 样式

- 圆角 3px
- 边框宽度 1px，颜色自动适配深浅主题
- 背景色自动适配深浅主题（浅色白色 / 深色黑色）
- 默认无边距 padding

## 示例

```qml
import UniDesk.Controls 1.0
import UniDesk.Controls 1.0

UniDeskFrame {
    width: 300
    height: 150
    radius: 8

    Column {
        anchors.fill: parent
        spacing: 10
        Text { text: "分组标题"; font.pixelSize: 16 }
        UniDeskButton { text: "按钮" }
    }
}
```

## 相关文档

- [UniDeskDialog](./UniDeskDialog.md) — 对话框
- [UniDeskWindow](./UniDeskWindow.md) — 窗口