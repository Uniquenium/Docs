---
title: UniDeskPosSelector
editLink: true
---

# UniDeskPosSelector 类型

位置选择器控件，允许用户通过可视化方式选择屏幕上的坐标位置（X, Y），常用于组件放置位置的配置。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskPosSelector.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: info 文档待完善
本控件的详细属性、方法和示例正在编写中。你可以先查看源代码 [UniDeskPosSelector.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskPosSelector.qml)，或帮助我们 [完善本文档](https://github.com/Uniquenium/Docs/edit/main/zh/controls-reference/UniDeskPosSelector.md)。
:::

## 基本用法

```qml
import UniDesk.Controls 1.0

UniDeskPosSelector {
    // 选择屏幕位置
    onPositionChanged: {
        console.log("选中位置:", position.x, position.y)
    }
}
```

## 相关文档

- [UniDeskSizeSelector](/controls-reference/UniDeskSizeSelector.md) - 尺寸选择器
- [术语表](/glossary.md)
