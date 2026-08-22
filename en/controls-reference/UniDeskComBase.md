---
title: UniDeskComBase
editLink: true
---

# UniDeskComBase Type

Component base control. All editable components in the visual editor inherit from `UniDeskComBase`. Provides core capabilities including drag-to-move, selection, context menu, rectangular border editing, and property persistence.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskComBase.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

::: warning Editor Only
This control is primarily intended for internal use by the Uniquenium visual editor.普通开发者在构建自定义组件时可参考其实现方式。
:::

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | — | Component name |
| `type` | `string` | — | Component type |
| `identification` | `string` | — | Unique identifier |
| `pageid` | `string` | — | Parent page ID |
| `canMove` | `bool` | `chosen` | Allow drag-to-move |
| `indicated` | `bool` | `false` | Show indicator tooltip |
| `selected` | `bool` | `false` | Is selected |
| `chosen` | `bool` | `false` | Is chosen (rect editor visibility) |
| `comManager` | `var` | — | Component manager reference |
| `optionsWindow` | `var` | — | Property panel window |
| `margins` | `int` | `4` | Margins |
| `edges` | `int` | `0` | Drag edge flags |
| `moving` | `bool` | `false` | Currently dragging |
| `moved` | `bool` | `false` | Has been moved |
| `itemOpacity` | `real` | `1` | Component opacity |
| `defaultRightClickMenu` | `bool` | `true` | Use default context menu |
| `pluginDir` | `string` | `""` | Plugin directory |
| `controlHovered` | `bool` | — | Hover state |
| `bg` | `alias` | `rect_bg` | Background rectangle alias |
| `controlPressed` | `alias` | `mouseArea.pressed` | Pressed state alias |

## Signals

| Signal | Description |
|--------|-------------|
| `closeSignal()` | Emitted on application quit |
| `focusOut()` | Focus lost |
| `leftClicked()` | Left click |
| `rightClicked()` | Right click |
| `endDrag()` | Drag ended |
| `componentCompleted()` | Component initialization complete |

## Methods

| Method | Description |
|--------|-------------|
| `deleteCom()` | Delete component |
| `copyCom()` | Copy component |
| `createSubComponent()` | Create child component |
| `containsGlobalPoint(point)` | Check if point is inside component |
| `changeParentWithoutMovingAndSave(p)` | Reparent and save |
| `currentLayer()` | Get current layer (Desktop/Wallpaper/TopMost) |
| `isAncestorOf(p)` | Check if ancestor of another component |
| `propertyData()` | Export property data as dict |
| `loadPropertyData(data)` | Load property data from dict |
| `saveComToFile()` | Save component to file |

## Context Menu

Default context menu includes:
- **Edit** — Open property panel
- **Copy** — Copy component
- **New Subcomponent** — Create child component
- **Delete** — Delete component

## Example

```qml
import UniDesk.Controls 1.0

UniDeskComBase {
    comManager: comManager
    name: "My Component"
    type: "UDCFrame"
    identification: "unique-id-001"
    pageid: "page-1"
}
```

## Related

- [UniDeskComRectEditor](./UniDeskComRectEditor.md) — Rectangle editor
- [UniDeskComBasicOptions](./UniDeskComBasicOptions.md) — Basic property panel
- [UniDeskComManager](../../cpp-ext/UniDeskComManager.md) — Component manager