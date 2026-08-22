---
title: UniDeskSizeSelector
editLink: true
---

# UniDeskSizeSelector 类型

尺寸选择器控件，在可视化编辑器中用于精确设置组件的宽度和高度。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskSizeSelector.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: warning 编辑器专用
本控件主要供 Uniquenium 可视化编辑器内部使用。
:::

## 自定义属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `editingComponent` | `Item` | 当前正在编辑的组件 |

## 子控件

| 控件 | 说明 |
|------|------|
| `widthSpinBox` (`UniDeskSpinBox`) | 宽度（0-3000） |
| `heightSpinBox` (`UniDeskSpinBox`) | 高度（0-3000） |

## 行为

- 尺寸修改后自动调用 `editingComponent.saveComToFile()`
- 监听组件的 `widthChanged`、`heightChanged`、`endDrag`、`componentCompleted` 信号，自动刷新显示

## 方法

### `function refreshSize()`
刷新宽度和高度显示。

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskSizeSelector {
    editingComponent: someComponent
}
```

## 相关文档

- [UniDeskPosSelector](./UniDeskPosSelector.md) — 位置选择器
- [UniDeskSpinBox](./UniDeskSpinBox.md) — 数值输入框