---
title: UniDeskComBasicOptions
editLink: true
---

# UniDeskComBasicOptions 类型

组件基础选项面板控件，在可视化编辑器中显示选中组件的基础属性（名称、父组件、位置、尺寸、旋转角度、Z 坐标、透明度）。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskComBasicOptions.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: warning 编辑器专用
本控件主要供 Uniquenium 可视化编辑器内部使用。
:::

## 自定义属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `comManager` | `var` | 组件管理器引用 |
| `editingComponent` | `Item` | 当前正在编辑的组件 |

## 子控件

| 控件 | 说明 |
|------|------|
| `idField` (`UniDeskTextField`) | 组件名称编辑 |
| `parentComboBox` (`UniDeskComBox`) | 父组件选择 |
| `posSelector` (`UniDeskPosSelector`) | 位置编辑 |
| `sizeSelector` (`UniDeskSizeSelector`) | 尺寸编辑 |
| `rotationSpinBox` (`UniDeskSpinBox`) | 旋转角度（0-359） |
| `zSpinBox` (`UniDeskSpinBox`) | Z 坐标（-99999 到 99999） |
| `opacitySpinBox` (`UniDeskSpinBox`) | 透明度（0-100） |

## 行为

- 所有属性修改后自动调用 `editingComponent.saveComToFile()`
- Z 坐标修改时额外调用 `comManager.updateComTreeZ()`
- 组件名称修改触发 `editingComponent.name = text`

## 方法

### `function refreshPosition()`
刷新位置选择器的显示。

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskComBasicOptions {
    comManager: comManager
    editingComponent: someComponent
}
```

## 相关文档

- [UniDeskComManager](./UniDeskComManager.md) — 组件管理器
- [UniDeskPosSelector](./UniDeskPosSelector.md) — 位置选择器
- [UniDeskSizeSelector](./UniDeskSizeSelector.md) — 尺寸选择器