---
title: UniDeskImage
editLink: true
---

# UniDeskImage 类型

图片显示控件，支持本地图片、网络图片和 QRC 资源图片的加载与显示。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskImage.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: info 文档待完善
本控件的详细属性、方法和示例正在编写中。你可以先查看源代码 [UniDeskImage.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskImage.qml)，或帮助我们 [完善本文档](https://github.com/Uniquenium/Docs/edit/main/zh/controls-reference/UniDeskImage.md)。
:::

## 基本用法

```qml
import UniDesk.Controls 1.0

UniDeskImage {
    width: 200
    height: 200
    source: "qrc:/images/logo.png"
    fillMode: Image.PreserveAspectCrop
}
```

## 相关文档

- [UniDeskIcon](/controls-reference/UniDeskIcon.md) - 图标控件
- [术语表](/glossary.md)
