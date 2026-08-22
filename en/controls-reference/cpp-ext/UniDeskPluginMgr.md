---
title: UniDeskPluginMgr
editLink: true
---

# UniDeskPluginMgr Type

Plugin manager that scans and loads all C++ DLL plugins at application startup, exposing the QML types registered by plugins to the system. It is the unified entry point for both official and third-party plugins.

| Item | Description |
|------|-------------|
| Control Type | Global Singleton |
| Source File | `UniDesk/CppExt/UniDeskPluginMgr.h` / `.cpp` |
| Inherits | QQuickItem |
| QML Import | `import UniDesk 1.0` |

## Properties

### `property QVariantList plugins_list`
List of currently loaded plugins. Each entry is a QVariantMap containing plugin metadata (name, author, version, supported type names, etc.).

## Methods

### `function loadPlugins()`
Scans the plugin directory and loads all valid DLL plugins. Internally uses `QPluginLoader` to load each one, then calls the plugin's `registerQmlTypes(engine)` and `initialize()` methods on success.

### `function unloadPlugins()`
Unloads all loaded plugins and releases the `QPluginLoader` instances.

### `function setEngine(engine)`
Sets the `QQmlApplicationEngine` instance used by plugins to register QML types. Typically called once in `main.cpp`.

### `function getEngine() → QQmlApplicationEngine*`
Returns the current `QQmlApplicationEngine` instance.

### `function getPluginDir(comTypeId) → QString`
Returns the installation directory of the plugin identified by `comTypeId` (format `author.id.name`). Used by plugin components to locate their own resource files at runtime.

## Example

```qml
import UniDesk 1.0

Component.onCompleted: {
    UniDeskPluginMgr.loadPlugins()
    console.log("Loaded plugins:", UniDeskPluginMgr.plugins_list.length)
}

for (var i = 0; i < UniDeskPluginMgr.plugins_list.length; i++) {
    var p = UniDeskPluginMgr.plugins_list[i]
    console.log(p.name, "by", p.author, "v" + p.version)
}
```

## Notes

- Plugins must implement the `UniDeskPluginInterface` abstract interface and override `registerQmlTypes` and `initialize`.
- Plugin DLLs are placed in the `plugins/` subdirectory next to the application executable.
- Failed plugins are skipped without interrupting the loading of other plugins.

## Related

- [UniDeskPluginInterface](./UniDeskPluginInterface.md) — C++ plugin interface
- [Official Plugins](../../official-plugins.md) — Official plugin pack
- [Plugin Development Guide](/en/custom-developing/plugin.md) — Write your own plugins