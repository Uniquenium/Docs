---
title: UniDeskAppBar
editLink: true
---

# UniDeskAppBar 类型

应用顶栏控件，提供类似 Windows 11 应用标题栏的样式，通常包含窗口标题、最小化/最大化/关闭按钮。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskAppBar.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: info 文档待完善
本控件的详细属性、方法和示例正在编写中。你可以先查看源代码 [UniDeskAppBar.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskAppBar.qml)，或帮助我们 [完善本文档](https://github.com/Uniquenium/Docs/edit/main/zh/controls-reference/UniDeskAppBar.md)。
:::

## 基本用法

```qml
import UniDesk.Controls 1.0

UniDeskWindow {
    width: 600
    height: 400
    
    UniDeskAppBar {
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        title: "我的应用"
    }
}
```

## 相关文档

- [UniDeskWindow](/controls-reference/UniDeskWindow.md) - 窗口控件
- [术语表](/glossary.md) - 控件 vs 组件
