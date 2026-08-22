---
title: UniDeskSizeSelector
editLink: true
---

# UniDeskSizeSelector Type

Size selector control, used to precisely set component width and height in the visual editor.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskSizeSelector.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: warning Editor Only
This control is mainly used internally by the Uniquenium visual editor.
:::

## Custom Properties

| Property | Type | Description |
|----------|------|-------------|
| `editingComponent` | `Item` | Component currently being edited |

## Sub-controls

| Control | Description |
|---------|-------------|
| `widthSpinBox` (`UniDeskSpinBox`) | Width (0-3000) |
| `heightSpinBox` (`UniDeskSpinBox`) | Height (0-3000) |

## Behavior

- Auto-calls `editingComponent.saveComToFile()` after size changes
- Listens to `widthChanged`, `heightChanged`, `endDrag`, `componentCompleted` signals for auto-refresh

## Methods

### `function refreshSize()`
Refresh width and height display.

## Example

```qml
import UniDesk.Controls 1.0

UniDeskSizeSelector {
    editingComponent: someComponent
}
```

## Related

- [UniDeskPosSelector](./UniDeskPosSelector.md) — Position selector
- [UniDeskSpinBox](./UniDeskSpinBox.md) — Spin box