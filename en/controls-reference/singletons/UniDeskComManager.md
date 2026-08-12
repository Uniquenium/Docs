---
title: UniDeskComManager
editLink: true
---

# UniDeskComManager Singleton

Component management singleton, responsible for all operations related to component creation, registration, destruction, and search. This is the core singleton for component-level functionality in the Uniquenium system.

| Project | Description |
|---------|-------------|
| Type | Singleton |
| Source File | `UniDesk/Singletons/UniDeskComManager.qml` |
| QML Import | `import UniDesk 1.0` |

## Using the Singleton

```qml
import UniDesk 1.0

// Create component
var com = UniDeskComManager.createCom("MyPlugin.MyComponent")
console.log("New component ID:", com.identification)

// Get component
var targetCom = UniDeskComManager.getComByIdentification("com_a1b2c3d4")

// Delete component
UniDeskComManager.removeCom(com.identification)
```

## Methods

### `function createCom(typeName: string, parent: Item = null): Item`
Create a new component instance. `typeName` is the full type name (e.g., "ClockPlugin.ClockComponent"), and `parent` is the parent item. Returns the component instance.

### `function getComByIdentification(identification: string): Item`
Get a component instance by its unique identifier. Returns `null` if not found.

### `function getComByTypeName(typeName: string): list`
Get all component instances by type name, returning a list.

### `function removeCom(identification: string): bool`
Delete a component instance by its unique identifier. Returns `true` if successful.

### `function registerCom(typeName: string, qmlUrl: url): bool`
Register a new component type. `typeName` is the type name and `qmlUrl` is the QML file path.

### `function unregisterCom(typeName: string): bool`
Unregister a component type.

### `function getComList(): list`
Get a list of all component instances in the current system.

### `function loadTemplate(templateUrl: url): bool`
Load a template from the specified path and restore components.

### `function saveTemplate(templateUrl: url, identificationList: list): bool`
Save the specified component instances as a template.

### `function moveComToTop(identification: string): bool`
Move a component to the top (set Z to maximum).

### `function moveComToBottom(identification: string): bool`
Move a component to the bottom (set Z to minimum).

### `function moveComUp(identification: string): bool`
Move a component up one layer (Z +1).

### `function moveComDown(identification: string): bool`
Move a component down one layer (Z -1).

## Signals

### `signal comCreated(com: Item)`
Triggered when a new component is created.

### `signal comRemoved(identification: string)`
Triggered when a component is deleted.

### `signal comRegistered(typeName: string)`
Triggered when a new component type is registered.

### `signal templateLoaded(templateUrl: url)`
Triggered when a template is loaded.

### `signal templateSaved(templateUrl: url)`
Triggered when a template is saved.

## Basic Usage

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

UniDeskButton {
    text: "Create Clock Component"
    onClicked: {
        var clock = UniDeskComManager.createCom("ClockPlugin.ClockComponent")
        if (clock) {
            clock.x = 200
            clock.y = 200
            console.log("Created:", clock.identification)
        }
    }
}

UniDeskButton {
    text: "Delete All Components"
    onClicked: {
        var list = UniDeskComManager.getComList()
        for (var i = 0; i < list.length; i++) {
            UniDeskComManager.removeCom(list[i].identification)
        }
    }
}

Connections {
    target: UniDeskComManager
    function onComCreated(com) {
        console.log("New component created:", com.identification)
    }
    function onComRemoved(identification) {
        console.log("Component deleted:", identification)
    }
}
```

## Notes

- This singleton is the core of the Uniquenium component system and should only be used by plugin developers and advanced users.
- When a component is created via `createCom`, the system automatically assigns a unique `identification`.
- All component instances share the same identification space, so you should be careful when deleting.

## Related Singletons

- [UniDeskGlobals](/en/controls-reference/singletons/UniDeskGlobals.md) - Global state
- [UniDeskTools](/en/controls-reference/singletons/UniDeskTools.md) - Tool functions
- [UniDeskSettings](/en/controls-reference/singletons/UniDeskSettings.md) - Settings

## Related Documentation

- [Plugin Development Guide](/en/custom-developing/plugin.md) - How to develop plugins and components
- [Template System](/en/custom-developing/template.md) - Template import/export
- [Glossary](/en/glossary.md) - Term distinctions