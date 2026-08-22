---
title: UniDeskPosSelector
editLink: true
---

# UniDeskPosSelector Type

Position selector control, used to precisely set component X/Y coordinates in the visual editor, with alignment operations relative to other components.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskPosSelector.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: warning Editor Only
This control is mainly used internally by the Uniquenium visual editor.
:::

## Custom Properties

| Property | Type | Description |
|----------|------|-------------|
| `editingComponent` | `Item` | Component currently being edited |
| `horizontalAlignComponent` | `var` | Horizontal alignment reference component |
| `verticalAlignComponent` | `var` | Vertical alignment reference component |
| `comManager` | `var` | Component manager reference |

## Sub-controls

| Control | Description |
|---------|-------------|
| `horizontalCoordTextField` (`UniDeskSpinBox`) | X coordinate input |
| `verticalCoordTextField` (`UniDeskSpinBox`) | Y coordinate input |
| `horizontalComBox` (`UniDeskComBox`) | Horizontal alignment reference selection |
| `verticalComBox` (`UniDeskComBox`) | Vertical alignment reference selection |
| `horiAlignLeftButton` | Left align button |
| `horiAlignCenterButton` | Horizontal center align button |
| `horiAlignRightButton` | Right align button |
| `vertAlignTopButton` | Top align button |
| `vertAlignCenterButton` | Vertical center align button |
| `vertAlignBottomButton` | Bottom align button |

## Behavior

- Coordinate range dynamically calculated from desktop size
- Supports alignment relative to other components or relative to screen
- All modifications auto-call `editingComponent.saveComToFile()`
- Listens to `xChanged`, `yChanged`, `endDrag` signals for auto-refresh

## Methods

### `function refreshPosition()`
Refresh coordinate display.

## Example

```qml
import UniDesk.Controls 1.0

UniDeskPosSelector {
    comManager: comManager
    editingComponent: someComponent
}
```

## Related

- [UniDeskSizeSelector](./UniDeskSizeSelector.md) — Size selector
- [UniDeskComBox](./UniDeskComBox.md) — Component combo box