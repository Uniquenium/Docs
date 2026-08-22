---
title: UniDeskTempleteMgr
editLink: true
---

# UniDeskTempleteMgr Type

Template manager responsible for persisting component layouts (export as template) and restoring them (load from template). It supports automatic packaging and unpacking of media resources (images, videos, etc.), and is the core of resource sharing and version migration.

| Item | Description |
|------|-------------|
| Control Type | Global Singleton |
| Source File | `UniDesk/CppExt/UniDeskTempleteMgr.h` / `.cpp` |
| Inherits | QQuickItem |
| QML Import | `import UniDesk 1.0` |

## Properties

### `property bool isWorking`
Whether the template manager is currently saving or loading (used by UI to show loading states).

### `property QVariantList templeteList`
List of currently scanned templates. Each entry is a QVariantMap with `name`, `dir`, `kind` metadata.

## Methods

### `function saveTemplete(components, name)`
Save the specified component list (`QJsonArray`) as a template named `name`. It automatically handles:
- JSON serialization of components
- Copying and renaming of associated media files
- UUID reassignment to avoid conflicts with existing components

### `function loadTemplete(dir, presets)`
Load a template from the specified directory `dir` and restore the components to the current page. `presets` is an optional preset variable map used to replace expression variables in the template.

### `function templeteList() → QVariantList`
Returns the current template list (equivalent to the read-only `templeteList` property).

### `function refreshTempleteList()`
Rescans the template directory and refreshes `templeteList`.

## Signals

### `signal errorOccurred(message)`
Emitted when a template operation fails, carrying the error message.

### `signal finished(success, message, templeteDir, kind)`
Emitted when template save or load completes. `success` is a boolean, `kind` is `"save"` or `"load"`.

### `signal templeteListChanged()`
Emitted when the template list changes.

### `signal templeteLoaded(components, presets)`
Emitted after a template is loaded and parsed, carrying the parsed component array and preset values for further processing by `UniDeskComManager`.

## Example

```qml
import UniDesk 1.0

// Save template
UniDeskTempleteMgr.saveTemplete(
    comManager.selectedComponents,
    "my-layout"
)

// Listen for save result
Connections {
    target: UniDeskTempleteMgr
    function onFinished(success, message, dir, kind) {
        if (success && kind === "save")
            console.log("Template saved to:", dir)
    }
}

// Load template
UniDeskTempleteMgr.loadTemplete(
    "C:/Users/Uniquenium/templates/my-layout",
    { "username": "Alice", "theme": "dark" }
)
```

## Notes

- Templates are stored as folders under `%APPDATA%/Uniquenium/templates/`. Each template folder contains `manifest.json`, `components.json` and a `media/` directory.
- UUIDs are reassigned on load, and media file path mappings are handled automatically.
- The `presets` parameter works with `UniDeskExpr`: `%{variable}` in the template is replaced by the corresponding preset value.

## Related

- [UniDeskExpr](./UniDeskExpr.md) — Expression engine for `%{}` variables
- [Template System](/en/custom-developing/template.md) — Template usage guide