---
title: UniDeskPluginInterface
editLink: true
---

# UniDeskPluginInterface

任何 C++ 插件欲被 `UniDeskPluginMgr` 加载，都必须继承此抽象基类。任何希望被加载的 DLL 插件必须继承此类并实现两个纯虚方法。

| 项目 | 说明 |
|------|------|
| 类型 | C++ 抽象接口（非 QML 类型） |
| 源文件 | `UniDesk/CppExt/UniDeskPluginInterface.h` |
| IID | `com.unidesk.plugin.PluginInterface` |

## 接口定义

```cpp
class UniDeskPluginInterface {
public:
    virtual ~UniDeskPluginInterface() = default;
    virtual void registerQmlTypes(QQmlApplicationEngine *engine) = 0;
    virtual void initialize() = 0;
};
```

## 方法

### `virtual void registerQmlTypes(QQmlApplicationEngine *engine) = 0`
插件在此处向 QML 引擎注册自己的 C++ 类型、单例或 QML 文件路径。典型用法：

```cpp
void MyPlugin::registerQmlTypes(QQmlApplicationEngine *engine) {
    qmlRegisterType<MyComponent>("MyPlugin", 1, 0, "MyComponent");
    engine->addImportPath("qrc:/");
}
```

### `virtual void initialize() = 0`
插件初始化入口。在 `registerQmlTypes` 之后调用，用于启动后台线程、加载资源、初始化状态等。

## 实现步骤

1. 在插件项目中包含 `UniDeskPluginInterface.h`
2. 继承 `UniDeskPluginInterface` 并重写两个方法
3. 使用 `Q_DECLARE_INTERFACE` 声明接口
4. 在插件源文件中使用 `Q_PLUGIN_METADATA` 声明 IID

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

## 加载机制

1. `UniDeskPluginMgr.loadPlugins()` 扫描 `plugins/` 目录下所有 DLL
2. 通过 `QPluginLoader` 加载每个 DLL
3. 使用 `qobject_cast<UniDeskPluginInterface*>` 检查是否实现了接口
4. 对有效插件依次调用 `registerQmlTypes(engine)` 和 `initialize()`

## 相关文档

- [UniDeskPluginMgr](./UniDeskPluginMgr.md) — 插件管理器
- [插件开发指南](../../custom-developing/plugin.md) — 完整的插件开发流程
- [官方插件](../../official-plugins.md) — 官方插件包