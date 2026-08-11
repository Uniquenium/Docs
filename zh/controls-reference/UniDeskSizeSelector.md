---
title: UniDeskSizeSelector
editLink: true
---

# UniDeskSizeSelector 类型

尺寸选择器控件，允许用户通过可视化方式选择组件的宽度和高度，常用于组件尺寸的配置。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskSizeSelector.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: info 文档待完善
本控件的详细属性、方法和示例正在编写中。你可以先查看源代码 [UniDeskSizeSelector.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskSizeSelector.qml)，或帮助我们 [完善本文档](https://github.com/Uniquenium/Docs/edit/main/zh/controls-reference/UniDeskSizeSelector.md)。
:::

## 基本用法

```qml
import UniDesk.Controls 1.0

UniDeskSizeSelector {
    // 选择尺寸
    onSizeChanged: {
        console.log("选中尺寸:", size.width, "x", size.height)
    }
}
```

## 相关文档

- [UniDeskPosSelector](/controls-reference/UniDeskPosSelector.md) - 位置选择器
- [术语表](/glossary.md)
