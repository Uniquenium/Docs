---
title: UniDeskComponentsData
editLink: true
---

# UniDeskComponentsData Type

Persistence manager for component and page data. Responsible for loading page/component JSON from disk at application startup and writing back whenever the user adds, removes, or modifies components. It is the data backend of `UniDeskComManager`.

| Item | Description |
|------|-------------|
| Control Type | Global Singleton |
| Source File | `UniDesk/CppExt/UniDeskComponentsData.h` / `.cpp` |
| Inherits | QQuickItem |
| QML Import | `import UniDesk 1.0` |

## Methods

### `function getPages() → QJsonArray`
Get the JSON array of all saved pages. Each entry contains `id`, `name`, `index` fields.

### `function getComponents() → QJsonArray`
Get the JSON array of all saved components. Each entry contains `identification`, `type`, `parent`, `geometry`, `properties` fields.

### `function updatePage(pIndex, page)`
Update the JSON data of the page at the given index.

### `function updateComponent(componentIndex, component)`
Update the JSON data of the component at the given index.

### `function addComponent(component)`
Add a new component (QJsonObject) to the persisted data.

### `function removeComponent(identification)`
Remove a component's persisted data by its unique `identification`.

### `function addPage(page)`
Add a new page.

### `function insertPage(index, page)`
Insert a new page at the specified index.

### `function removePage(idx)`
Remove a page by its index.

### `function setCurrentPage(id)`
Set the currently active page ID.

### `function getCurrentPage() → QString`
Get the currently active page ID.

### `function getComponentTypes() → QVariant`
Get the metadata list of all registered component types (built-in + plugin).

### `function getBasicComponentTypes() → QVariant`
Get only the built-in (non-plugin) component type metadata list.

## Example

```qml
import UniDesk 1.0

var pages = UniDeskComponentsData.getPages()
console.log("Saved pages:", pages.length)
for (var i = 0; i < pages.length; i++)
    console.log("  -", pages[i].name)

console.log("Current page ID:", UniDeskComponentsData.getCurrentPage())
UniDeskComponentsData.setCurrentPage("page-2")
```

## Notes

- `UniDeskComponentsData` handles only data persistence, not QML component instances. Actual component creation and destruction are handled by `UniDeskComManager`.
- Data files are stored at `%APPDATA%/Uniquenium/components.json` and `pages.json`.
- All methods are synchronous; for bulk operations consider running off the UI thread.

## Related

- [UniDeskComManager](../singletons/UniDeskComManager.md) — Upper-level component manager that calls this singleton
- [UniDeskPluginMgr](./UniDeskPluginMgr.md) — Plugin manager providing plugin component types