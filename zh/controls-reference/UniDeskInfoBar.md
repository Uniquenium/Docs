---
title: UniDeskInfoBar
editLink: true
---

# UniDeskInfoBar 类型

信息提示条控件，用于在窗口顶部或底部显示临时的信息、成功、警告或错误提示，支持自动消失。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskInfoBar.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: info 文档待完善
本控件的详细属性、方法和示例正在编写中。你可以先查看源代码 [UniDeskInfoBar.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskInfoBar.qml)，或帮助我们 [完善本文档](https://github.com/Uniquenium/Docs/edit/main/zh/controls-reference/UniDeskInfoBar.md)。
:::

## 基本用法

```qml
import UniDesk.Controls 1.0

UniDeskWindow {
    width: 400
    height: 300
    
    UniDeskInfoBar {
        id: infoBar
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
    }
    
    Component.onCompleted: {
        infoBar.showSuccess("操作成功！")
        // infoBar.showInfo("提示信息")
        // infoBar.showWarning("警告内容")
        // infoBar.showError("错误内容")
    }
}
```

## 相关文档

- [UniDeskMessageBox](/controls-reference/UniDeskMessageBox.md) - 消息弹框
- [UniDeskTooltip](/controls-reference/UniDeskTooltip.md) - 浮动提示
- [术语表](/glossary.md)
