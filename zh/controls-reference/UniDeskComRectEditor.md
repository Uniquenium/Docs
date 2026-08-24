---
title: UniDeskComRectEditor
editLink: true
---

# UniDeskComRectEditor 类型

组件矩形编辑器控件，在可视化编辑器中为选中组件提供拖拽移动、边缘缩放、角点缩放和旋转等交互操作。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskComRectEditor.qml` |
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
| `visible` | `bool` | 是否可见（绑定 `editingComponent.chosen`） |
| `isRotating` | `bool` | 是否正在旋转 |
| `isDraggingTopLeftCorner` | `bool` | 拖拽左上角缩放 |
| `isDraggingTopSide` | `bool` | 拖拽上边缘缩放 |
| `isDraggingRightSide` | `bool` | 拖拽右边缘缩放 |
| `isDraggingBottomSide` | `bool` | 拖拽下边缘缩放 |
| `isDraggingLeftSide` | `bool` | 拖拽左边缘缩放 |

## 功能

- 9 个控制点：4 角 + 4 边 + 1 旋转按钮
- 每个控制点为圆形，悬停时高亮
- 拖拽时实时更新组件的 `x`、`y`、`width`、`height`、`rotation`
- 操作完成后自动调用 `editingComponent.saveComToFile()`
- 支持旋转：通过角度偏移计算（`Math.atan2`）
- 支持带旋转的缩放：正确处理旋转坐标系下的尺寸变化

## 方法

### `function hoverOnAnyButton(pos) → bool`
判断鼠标位置是否在任一控制点上。

### `function recordInitialState()`
记录拖拽前的初始状态（位置、尺寸、旋转）。

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskComRectEditor {
    comManager: comManager
    editingComponent: someComponent
}
```

## 相关文档

- [UniDeskComManager](./singletons/UniDeskComManager.md) — 组件管理器
- [UniDeskWindow](./UniDeskWindow.md) — 窗口