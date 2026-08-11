---
title: UniDeskComBase
editLink: true
---
# UniDeskComBase 类型
本控件在控件和组件中起到媒介作用，添加了一个矩形，充当组件的背景。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskComBase.qml` |
| 继承 | QtQuick Item |

::: warning 编辑器专用
本控件主要供 Uniquenium 可视化编辑器内部使用，作为组件的基础容器。普通开发者在构建自定义组件时可参考其实现方式。
:::

## 属性

### `property alias bg`
背景矩形（Rectangle），可直接设置颜色、圆角等属性。

## 相关文档

- [UniDeskComBox](/controls-reference/UniDeskComBox.md) - 组件容器框
- [UniDeskComBasicOptions](/controls-reference/UniDeskComBasicOptions.md) - 组件基础选项面板
- [UniDeskComManager](/controls-reference/singletons/UniDeskComManager.md) - 组件管理器
- [术语表](/glossary.md) - 控件 vs 组件
