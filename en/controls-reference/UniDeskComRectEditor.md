---
title: UniDeskComRectEditor
editLink: true
---

# UniDeskComRectEditor Type

Component rectangle editor control, providing drag-to-move, edge resize, corner resize, and rotate interactions for components in the visual editor.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskComRectEditor.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: warning Editor Only
This control is mainly used internally by the Uniquenium visual editor.
:::

## Custom Properties

| Property | Type | Description |
|----------|------|-------------|
| `comManager` | `var` | Component manager reference |
| `editingComponent` | `Item` | Component currently being edited |
| `visible` | `bool` | Visibility (bound to `editingComponent.chosen`) |
| `isRotating` | `bool` | Whether currently rotating |
| `isDraggingTopLeftCorner` | `bool` | Drag top-left corner |
| `isDraggingTopSide` | `bool` | Drag top edge |
| `isDraggingRightSide` | `bool` | Drag right edge |
| `isDraggingBottomSide` | `bool` | Drag bottom edge |
| `isDraggingLeftSide` | `bool` | Drag left edge |

## Features

- 9 control points: 4 corners + 4 edges + 1 rotation button
- Each control point is circular, highlighted on hover
- Real-time updates of `x`, `y`, `width`, `height`, `rotation` during drag
- Auto-calls `editingComponent.saveComToFile()` after each operation
- Rotation support via angle offset calculation (`Math.atan2`)
- Rotation-aware scaling: correctly handles dimension changes in rotated coordinate systems

## Methods

### `function hoverOnAnyButton(pos) → bool`
Check if mouse position is over any control point.

### `function recordInitialState()`
Record initial state (position, size, rotation) before dragging.

## Example

```qml
import UniDesk.Controls 1.0

UniDeskComRectEditor {
    comManager: comManager
    editingComponent: someComponent
}
```

## Related

- [UniDeskComManager](./singletons/UniDeskComManager.md) — Component manager
- [UniDeskWindow](./UniDeskWindow.md) — Window