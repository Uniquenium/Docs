---
title: UniDeskShadow
editLink: true
---

# UniDeskShadow 类型

阴影效果控件，为其他控件添加投影效果，增强 UI 层次感。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskShadow.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: info 文档待完善
本控件的详细属性、方法和示例正在编写中。你可以先查看源代码 [UniDeskShadow.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskShadow.qml)，或帮助我们 [完善本文档](https://github.com/Uniquenium/Docs/edit/main/zh/controls-reference/UniDeskShadow.md)。
:::

## 基本用法

```qml
import UniDesk.Controls 1.0

UniDeskFrame {
    width: 200
    height: 100
    
    UniDeskShadow {
        // 为父控件添加阴影
    }
}
```

## 相关文档

- [UniDeskFrame](/controls-reference/UniDeskFrame.md) - 容器控件
- [UniDeskWindow](/controls-reference/UniDeskWindow.md) - 窗口控件
