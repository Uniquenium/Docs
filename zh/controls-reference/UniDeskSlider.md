---
title: UniDeskSlider
editLink: true
---

# UniDeskSlider 类型

滑块控件，允许用户通过拖动滑块在指定范围内选择数值。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskSlider.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: info 文档待完善
本控件的详细属性、方法和示例正在编写中。你可以先查看源代码 [UniDeskSlider.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskSlider.qml)，或帮助我们 [完善本文档](https://github.com/Uniquenium/Docs/edit/main/zh/controls-reference/UniDeskSlider.md)。
:::

## 基本用法

```qml
import UniDesk.Controls 1.0

UniDeskSlider {
    width: 200
    from: 0
    to: 100
    value: 50
    onMoved: console.log("当前值:", value)
}
```

## 相关文档

- [UniDeskSpinBox](/controls-reference/UniDeskSpinBox.md) - 数值调节框
- [术语表](/glossary.md)
