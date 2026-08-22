---
title: CppExt Backend Overview
editLink: true
---

# CppExt Backend Overview

The `CppExt` folder contains all C++-based backend singletons and utility classes used by Uniquenium. These classes are registered into the QML type system via `QML_SINGLETON` and can be accessed directly in QML by their type name without instantiation.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Uniquenium App                      │
│  main.qml  ───  Creates UniDeskComManager instance   │
└────────────┬────────────────────────────────────────┘
             │ passes comManager property
             ▼
┌─────────────────────────────────────────────────────┐
│  UniDesk Controls / Components (QML)                │
│  ├─ UniDeskWindow / UniDeskButton / UDCText ...    │
│  └─ Accesses services via comManager                │
└────────────┬────────────────────────────────────────┘
             │ import UniDesk 1.0
             ▼
┌─────────────────────────────────────────────────────┐
│  CppExt C++ Singleton Layer                          │
│  ├─ UniDeskGlobals      Global theme state          │
│  ├─ UniDeskSettings     User settings persistence   │
│  ├─ UniDeskTools        General utility functions   │
│  ├─ UniDeskExpr         Expression engine          │
│  ├─ UniDeskSystemInfo   System information         │
│  ├─ UniDeskPluginMgr    Plugin loading/management   │
│  ├─ UniDeskTempleteMgr  Template import/export      │
│  ├─ UniDeskComponentsData Component data persistence│
│  └─ ...                                             │
└─────────────────────────────────────────────────────┘
```

## Access

All CppExt singletons are registered via `QML_SINGLETON` + `QML_NAMED_ELEMENT`. After `import UniDesk 1.0`, they can be accessed directly:

```qml
import UniDesk 1.0

// Read system theme
console.log("Theme:", UniDeskGlobals.isLight ? "Light" : "Dark")

// Get CPU usage
var stats = UniDeskSystemInfo.getSystemStats()
console.log("CPU:", stats.cpu.usagePercent, "%")

// Evaluate expression
var text = UniDeskExpr.convertStr("Current CPU: %{cpu}%")
```

## Relationship with UniDeskComManager

CppExt singletons are responsible for low-level data and native features, while `UniDeskComManager` (a QML control) is responsible for organizing components and pages at a higher level:

- `UniDeskComManager` calls methods on `UniDeskComponentsData` for persistence when creating/saving/loading components
- Template import/export is handled by `UniDeskTempleteMgr`, which signals `UniDeskComManager` to rebuild components
- After plugins are loaded by `UniDeskPluginMgr`, the newly registered types are merged into `UniDeskComManager.type_list`

## Documentation Index

| Class | Category | Description |
|-------|----------|-------------|
| [UniDeskGlobals](./UniDeskGlobals.md) | Global State | Theme mode, app quit signal, i18n |
| [UniDeskSettings](./UniDeskSettings.md) | Global State | User settings read/write |
| [UniDeskTools](./UniDeskTools.md) | Utilities | Colors, system commands, fonts, wallpapers, UUID, auto-start |
| [UniDeskExpr](./UniDeskExpr.md) | Expression Engine | `%{value}` evaluation, API response parsing |
| [UniDeskSystemInfo](./UniDeskSystemInfo.md) | System Info | CPU, memory, network, battery real-time data |
| [UniDeskPluginMgr](./UniDeskPluginMgr.md) | Plugin Manager | DLL plugin load, unload, type registration |
| [UniDeskTempleteMgr](./UniDeskTempleteMgr.md) | Template System | Template save, load, list refresh, media handling |
| [UniDeskComponentsData](./UniDeskComponentsData.md) | Data Persistence | Page/component JSON read/write |
| [UniDeskPluginInterface](./UniDeskPluginInterface.md) | Plugin Interface | Abstract base class for C++ plugins |