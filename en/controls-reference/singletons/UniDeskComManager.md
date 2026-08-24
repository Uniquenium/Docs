---
title: UniDeskComManager
editLink: true
---

# UniDeskComManager Type

This item manages components, pages and the overall editing state in Uniquenium. It is **not** a QML singleton (not registered via `QML_SINGLETON`). Instead, it is instantiated once in `main.qml` as a property and propagated to other windows, controls and components through the `comManager` property, ensuring a single instance is shared throughout the application.

> How to access: Any object that owns a `comManager` property (for example `UniDeskSettingsWindow`, `UniDeskComWindow`, `UniDeskPageWindow`, or any component that inherits from `UniDeskComBase`) can obtain this unique `UniDeskComManager` instance through that property.

| Control Type | Abstract Item |
|-------------|---------------|
| Source File | `UniDesk/Controls/UniDeskComManager.qml` |
| Inherits | [UniDeskObject](../UniDeskObject) |

## Properties

### `property string currentPid`
The ID of the currently active page. Default is `"default"`. All components automatically show/hide based on this value.

### `property var root`
The desktop root container (i.e. `UniDeskRoot`), which holds components of the default page.

### `property var wallpaperLayer`
The wallpaper layer container, identified as the `"Wallpaper"` layer.

### `property var topMostLayer`
The topmost layer container, identified as the `"TopMost"` layer.

### `property var comWindow`
Reference to the `UniDeskComWindow` component management window.

### `property var pageWindow`
Reference to the `UniDeskPageWindow` page management window.

### `property UniDeskComponentSelectMode selectMode`
Current selection mode (single / multi / no selection).

### `property list<Item> selectedComponents`
The list of currently selected components.

### `property list<Item> needMoveComponents`
The list of components that should follow when dragging a batch (maintained by `update_need_move_com()`).

### `property alias page_list: compModels`
Alias of the page list (pointing to the internal `ListModel`).

### `property list<Component> type_list`
The list of QML `Component` instances for all registered component types, populated by `loadComponentTypesFromData()`.

### `property list<string> typename_list`
The list of type names corresponding one-to-one with `type_list` (native components use file names, plugin components use the `author.id.name` format).

### `property list<var> componentInfoList`
Component metadata list read from `UniDeskComponentsData.getComponentTypes()`.

## Methods

### `function add_com(typename, typenameTr, pageid)`
Add a component to the specified page (defaults to the current page). It automatically allocates a unique identification, writes to `UniDeskComponentsData` and refreshes the tree model.

### `function add_com_from_data(data)`
Restore a component based on persisted JSON data (parent-child relationships not restored).

### `function add_components_from_data(components)`
Create a batch of components from JSON data and rebuild parent-child relationships based on the `parent` field.

### `function toggle_page_to(id)`
Switch to the page with the given `id` (also updates `currentPid` and `UniDeskComponentsData.setCurrentPage`).

### `function new_page()`
Create a new empty page with the three built-in nodes: wallpaper layer / desktop layer / topmost layer.

### `function rename_page(index, newname)`
Rename the page at the given index.

### `function remove_page(index)`
Delete the page at the given index; if the deleted page was the current page, switch to an adjacent one.

### `function copy_page(index)`
Copy all components of the specified page into a new page.

### `function clear_page(index)`
Remove all components from the specified page.

### `function previous_page()` / `function next_page()`
Switch to the previous / next page.

### `function is_first_page()` / `function is_last_page()`
Check whether the current page is the first / last page.

### `function select_com(com)`
Select or deselect a component; in multi-select mode it handles ancestor/descendant relationships.

### `function unselect_all_com()`
Clear all selected states.

### `function delete_com(id)`
Delete a component by its identification (also deletes all its descendants).

### `function copy_com(com)`
Duplicate a component (offset by `delta` pixels).

### `function getComById(id)`
Get a component or layer by identification, or by the reserved keys `"Wallpaper"`, `"Desktop"`, `"TopMost"`.

### `function getIndexById(id)` / `function getIndexByCom(com)`
Get the index of a component in the internal `component_list`.

### `function move_com_to_page(comId, indexPage)`
Move a component (and its descendants) to another page.

### `function loadPagesFromData()` / `function loadComponentsFromData()`
Reload pages and components from `UniDeskComponentsData`, typically used on startup or reset.

### `function loadComponentTypesFromData()`
Load all built-in and plugin component types from `UniDeskComponentsData` and `UniDeskPluginMgr.plugins_list`.

### `function insert_new_page(index)`
Insert a new page at the specified index.

### `function move_page_up(index)` / `function move_page_down(index)`
Move the specified page up or down.

### `function mouse_on_any_com(mousePos, layer)`
Check whether there is any visible component at the given coordinates within the specified layer, used for mouse penetration.

## Signals

### `signal menuClosed()`
Emitted after the context menu is closed, used to trigger the refresh of the window's mouse penetration state.

### `signal deleteComSignal(string id)`
Emitted before a component is deleted; the internal `onDeleteComSignal` handler performs the actual deletion.

### `signal multiSelectRightClicked(int x, int y)`
Emitted when a component is right-clicked in multi-select mode, used to pop up the multi-select action menu.

## Examples

```qml
// In components that inherit from UniDeskComBase, the comManager property
// is injected automatically when the component is created
UniDeskComBase {
    onSomeEvent: {
        comManager.toggle_page_to("other-page-id");
        comManager.new_page();
    }
}

// In singleton windows such as UniDeskSettingsWindow, the value is
// assigned explicitly by main.qml:
// UniDeskSettingsWindow.comManager = component_manager
UniDeskSettingsWindow {
    property var comManager
    onSomething: comManager.next_page()
}
```

## Notes

- `UniDeskComManager` inherits from `UniDeskObject`, so it has the common properties of `UniDeskObject` (e.g. `identification`, `name`, `parent`, `z`).
- Since it is **not** a QML singleton, it **cannot** be accessed via `UniDeskComManager.xxx`. It must be passed through the object tree via the `comManager` property.
- At startup, `main.qml` assigns it to `UniDeskSettingsWindow.comManager`, `UniDeskComWindow.comManager` and `UniDeskPageWindow.comManager`. Other controls propagate it further through their own `comManager` property.

## Related

- [UniDeskObject](../UniDeskObject.md) — The base type for all interactive items
- [UniDeskComBase](../UniDeskComBase.md) — Base type for all desktop components, provides the `comManager` property by default