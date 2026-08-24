---
title: UniDeskComBox
editLink: true
---

# UniDeskComBox Type

Component selection combo box control based on `UniDeskComboBox`. Used to select parent or related components in the visual editor.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskComBox.qml` |
| Inherits | UniDeskComboBox |
| QML Import | `import UniDesk.Controls 1.0` |

::: warning Editor Only
This control is mainly used internally by the Uniquenium visual editor.
:::

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `comManager` | `var` | — | Component manager reference (inherited from UniDeskComboBox) |
| `editingComponent` | `var` | — | Component being edited |
| `currentComponent` | `var` | — | Currently selected component |
| `allPages` | `bool` | `false` | Whether to show components from all pages (false = current page only) |

## Features

- Displays three special items: Desktop Layer, Wallpaper Layer, Top Layer
- Dynamically lists other components (excluding self)
- Cross-page or same-page filtering
- Editable (`editable: true`)

## Methods

### `function getNames(list) → list<string>`
Get component name list (including special layers).

### `function getComByIndex(index) → var`
Get component object by index.

### `function getIndexByCom(com) → int`
Get index by component object.

## Example

```qml
import UniDesk.Controls 1.0

UniDeskComBox {
    comManager: comManager
    editingComponent: currentComponent
    currentComponent: parentComponent
    allPages: false
}
```

## Related

- [UniDeskComboBox](./UniDeskComboBox.md) — Combo box base
- [UniDeskComManager](./singletons/UniDeskComManager.md) — Component manager