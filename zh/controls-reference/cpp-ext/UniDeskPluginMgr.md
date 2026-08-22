---
title: UniDeskPluginMgr
editLink: true
---

# UniDeskPluginMgr 类型

插件管理器，负责扫描并加载 `plugins/` 目录下的 DLL 插件、管理插件元数据、启停插件，以及向 QML 注册插件提供的类型。

| 项目 | 说明 |
|------|------|
| 控件类型 | 全局单例 |
| 源文件 | `UniDesk/CppExt/UniDeskPluginMgr.h` / `.cpp` |
| 继承 | QQuickItem |
| QML 导入 | `import UniDesk 1.0` |

## 属性

### `property bool isLoading`
是否正在加载插件（可用于 UI 显示加载状态）。

### `property QVariantList pluginList`
当前已扫描到的插件列表。每项为 `QVariantMap`，包含 `name`、`version`、`author`、`enabled` 等元数据。

### `property QString pluginDir`
插件扫描目录，默认为 `<应用目录>/plugins/`。

## 方法

### `function loadPlugins()`
从 `pluginDir` 扫描所有 DLL 文件并尝试加载。对每个有效的插件：
1. 通过 `QPluginLoader` 加载
2. 使用 `qobject_cast<UniDeskPluginInterface*>` 检查是否实现了插件接口
3. 依次调用 `registerQmlTypes(engine)` 和 `initialize()`

### `function unloadPlugins()`
卸载所有已加载的插件，释放 `QPluginLoader` 并清理引用。

### `function enablePlugin(name, enabled)`
按名称启用或禁用指定插件。

### `function getPluginList() → QVariantList`
返回当前插件列表（等同于 `pluginList` 属性）。

### `function refreshPluginList()`
重新扫描插件目录并刷新 `pluginList`。

## 信号

### `signal pluginLoaded(name, success)`
单个插件加载完成时发出，`success` 表示是否加载成功。

### `signal allPluginsLoaded(count)`
所有插件加载完成后发出，`count` 为成功加载的数量。

### `signal pluginListChanged()`
插件列表发生变化时发出。

### `signal pluginError(name, message)`
插件加载/卸载出错时发出。

## 使用示例

```qml
import UniDesk 1.0

UniDeskPluginMgr.loadPlugins()

Connections {
    target: UniDeskPluginMgr
    function onPluginLoaded(name, success) {
        console.log("Plugin:", name, success ? "loaded" : "failed")
    }
    function onAllPluginsLoaded(count) {
        console.log("All plugins loaded, total:", count)
    }
}
```

## 插件目录结构

```
plugins/
├── MyPlugin/
│   └── MyPlugin.dll
├── AnotherPlugin/
│   └── AnotherPlugin.dll
└── ...
```

## 备注

- 插件通过 `QPluginLoader` 动态加载，依赖 `UniDeskPluginInterface` 接口识别。
- 加载失败的插件不会影响主程序稳定性，会跳过继续加载下一个。
- 插件元数据（`name`、`version` 等）来自插件 DLL 内部的 `Q_PLUGIN_METADATA`。

## 相关文档

- [UniDeskPluginInterface](./UniDeskPluginInterface.md) — 插件开发接口
- [自定义开发：插件](../../custom-developing/plugin.md) — 完整的插件开发流程
- [官方插件](../../official-plugins.md) — 官方插件包使用说明