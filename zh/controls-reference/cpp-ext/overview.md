---
title: CppExt 后端概览
editLink: true
---

# CppExt 后端模块总览

`CppExt` 文件夹包含了 UniDesk 框架的 C++ 后端实现，为 QML 控件提供底层能力支撑。这些 C++ 类通过 `Q_PROPERTY`、`Q_INVOKABLE` 和信号等机制暴露给 QML 使用，涵盖了全局状态、设置持久化、插件管理、模板系统、系统信息采集、表达式引擎等核心功能。

## 模块列表

| 类名 | 功能 | 关联 QML 单例 |
|------|------|---------------|
| [UniDeskGlobals](./UniDeskGlobals.md) | 全局主题状态、国际化、应用退出信号 | `UniDeskGlobals` |
| [UniDeskSettings](./UniDeskSettings.md) | 用户设置持久化 | `UniDeskSettings` |
| [UniDeskPluginMgr](./UniDeskPluginMgr.md) | 插件加载、卸载、元数据管理 | `UniDeskPluginMgr` |
| [UniDeskTempleteMgr](./UniDeskTempleteMgr.md) | 模板保存与加载 | `UniDeskTempleteMgr` |
| [UniDeskExpr](./UniDeskExpr.md) | `%{}` 表达式引擎 | `UniDeskExpr` |
| [UniDeskSystemInfo](./UniDeskSystemInfo.md) | CPU、内存、网络、电池数据采集 | `UniDeskSystemInfo` |
| [UniDeskComponentsData](./UniDeskComponentsData.md) | 组件与页面 JSON 数据持久化 | `UniDeskComponentsData` |
| [UniDeskPluginInterface](./UniDeskPluginInterface.md) | 插件开发抽象接口 | （C++ 接口） |

## 注册方式

每个 C++ 后端类都有两种注册方式：

1. **作为 QML 单例**：在 `main.cpp` 中通过 `qmlRegisterSingletonType` 注册，QML 中以 `UniDeskPluginMgr.method()` 形式调用
2. **作为 QML 类型**：通过 `qmlRegisterType` 注册，QML 中可以实例化

大部分后端类以单例方式注册，因为整个应用中只需一份实例。

## 线程模型

- `UniDeskGlobals`、`UniDeskSettings`、`UniDeskComponentsData` 运行在主线程
- `UniDeskPluginMgr` 在插件加载时会创建子线程
- `UniDeskExpr` 通过内部定时器（1000ms）刷新系统数据
- `UniDeskSystemInfo` 的数据采集通过独立线程运行

## 相关目录结构

```
UniDesk/CppExt/
├── UniDeskGlobals.h / .cpp
├── UniDeskSettings.h / .cpp
├── UniDeskPluginMgr.h / .cpp
├── UniDeskTempleteMgr.h / .cpp
├── UniDeskExpr.h / .cpp
├── UniDeskSystemInfo.h / .cpp
├── UniDeskComponentsData.h / .cpp
└── UniDeskPluginInterface.h
```

## 相关文档

- [UniDeskComManager](../singletons/UniDeskComManager.md) — 调用多个后端单例的高层管理器
- [控件库概览](../overview.md) — 整体控件体系介绍
- [自定义开发](../../custom-developing/plugin.md) — 插件开发指南