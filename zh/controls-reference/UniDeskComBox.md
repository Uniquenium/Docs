---
title: UniDeskComBox
editLink: true
---

# UniDeskComBox 类型

组件选择下拉框控件，基于 `UniDeskComboBox` 实现。用于在可视化编辑器中选择组件的父组件或关联组件。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskComBox.qml` |
| 继承 | UniDeskComboBox |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: warning 编辑器专用
本控件主要供 Uniquenium 可视化编辑器内部使用。
:::

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `comManager` | `var` | — | 组件管理器引用（继承自 UniDeskComboBox） |
| `editingComponent` | `var` | — | 当前编辑的组件 |
| `currentComponent` | `var` | — | 当前选中的组件 |
| `allPages` | `bool` | `false` | 是否显示所有页面的组件（false 仅显示同页面） |

## 功能

- 显示三个特殊项：桌面层、壁纸层、置顶层
- 动态列出其他组件（排除自身）
- 支持跨页面或仅当前页面筛选
- 可编辑（`editable: true`）

## 方法

### `function getNames(list) → list<string>`
获取组件名称列表（包括特殊层）。

### `function getComByIndex(index) → var`
根据索引获取组件对象。

### `function getIndexByCom(com) → int`
根据组件对象获取索引。

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskComBox {
    comManager: comManager
    editingComponent: currentComponent
    currentComponent: parentComponent
    allPages: false
}
```

## 相关文档

- [UniDeskComboBox](./UniDeskComboBox.md) — 下拉选择框基类
- [UniDeskComManager](./singletons/UniDeskComManager.md) — 组件管理器