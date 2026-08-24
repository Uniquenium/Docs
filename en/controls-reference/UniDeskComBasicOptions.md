---
title: UniDeskComBasicOptions
editLink: true
---

# UniDeskComBasicOptions Type

Component basic options panel control, displays basic property editing UI (name, parent, position, size, rotation, Z-order, opacity) for the selected component in the visual editor.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskComBasicOptions.qml` |
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

## Sub-controls

| Control | Description |
|---------|-------------|
| `idField` (`UniDeskTextField`) | Component name editing |
| `parentComboBox` (`UniDeskComBox`) | Parent component selection |
| `posSelector` (`UniDeskPosSelector`) | Position editing |
| `sizeSelector` (`UniDeskSizeSelector`) | Size editing |
| `rotationSpinBox` (`UniDeskSpinBox`) | Rotation angle (0-359) |
| `zSpinBox` (`UniDeskSpinBox`) | Z-order (-99999 to 99999) |
| `opacitySpinBox` (`UniDeskSpinBox`) | Opacity (0-100) |

## Behavior

- All property modifications auto-call `editingComponent.saveComToFile()`
- Z-order modification additionally calls `comManager.updateComTreeZ()`
- Component name change triggers `editingComponent.name = text`

## Methods

### `function refreshPosition()`
Refresh the position selector display.

## Example

```qml
import UniDesk.Controls 1.0

UniDeskComBasicOptions {
    comManager: comManager
    editingComponent: someComponent
}
```

## Related

- [UniDeskComManager](./singletons/UniDeskComManager.md) — Component manager
- [UniDeskPosSelector](./UniDeskPosSelector.md) — Position selector
- [UniDeskSizeSelector](./UniDeskSizeSelector.md) — Size selector