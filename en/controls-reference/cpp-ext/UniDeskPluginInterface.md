---
title: UniDeskPluginInterface
editLink: true
---

# UniDeskPluginInterface

Abstract base class that any C++ plugin must implement to be loaded by `UniDeskPluginMgr`. Any DLL plugin that wishes to be loaded must inherit this class and override its two pure virtual methods.

| Item | Description |
|------|-------------|
| Type | C++ abstract interface (not a QML type) |
| Source File | `UniDesk/CppExt/UniDeskPluginInterface.h` |
| IID | `com.unidesk.plugin.PluginInterface` |

## Interface Definition

```cpp
class UniDeskPluginInterface {
public:
    virtual ~UniDeskPluginInterface() = default;
    virtual void registerQmlTypes(QQmlApplicationEngine *engine) = 0;
    virtual void initialize() = 0;
};
```

## Methods

### `virtual void registerQmlTypes(QQmlApplicationEngine *engine) = 0`
Plugins register their C++ types, singletons, or QML file paths with the QML engine here. Typical usage:

```cpp
void MyPlugin::registerQmlTypes(QQmlApplicationEngine *engine) {
    qmlRegisterType<MyComponent>("MyPlugin", 1, 0, "MyComponent");
    engine->addImportPath("qrc:/");
}
```

### `virtual void initialize() = 0`
Plugin initialization entry point. Called after `registerQmlTypes` for starting background threads, loading resources, initializing state, etc.

## Implementation Steps

1. Include `UniDeskPluginInterface.h` in your plugin project
2. Inherit `UniDeskPluginInterface` and override both methods
3. Declare the interface with `Q_DECLARE_INTERFACE`
4. Declare the IID with `Q_PLUGIN_METADATA` in the plugin source file

```cpp
// MyPlugin.h
#include "UniDeskPluginInterface.h"

class MyPlugin : public QObject, public UniDeskPluginInterface {
    Q_OBJECT
    Q_PLUGIN_METADATA(IID "com.unidesk.plugin.PluginInterface")
    Q_INTERFACES(UniDeskPluginInterface)
public:
    void registerQmlTypes(QQmlApplicationEngine *engine) override;
    void initialize() override;
};
```

```cpp
// MyPlugin.cpp
#include "MyPlugin.h"

void MyPlugin::registerQmlTypes(QQmlApplicationEngine *engine) {
    qmlRegisterType<MyClock>("MyPlugin", 1, 0, "MyClock");
}

void MyPlugin::initialize() {
    qDebug() << "MyPlugin initialized";
}
```

## Loading Mechanism

1. `UniDeskPluginMgr.loadPlugins()` scans all DLLs in the `plugins/` directory
2. Each DLL is loaded via `QPluginLoader`
3. `qobject_cast<UniDeskPluginInterface*>` checks whether the interface is implemented
4. For valid plugins, `registerQmlTypes(engine)` and `initialize()` are called in order

## Related

- [UniDeskPluginMgr](./UniDeskPluginMgr.md) — Plugin manager
- [Plugin Development Guide](/en/custom-developing/plugin.md) — Full plugin authoring workflow
- [Official Plugins](../../official-plugins.md) — Official plugin pack