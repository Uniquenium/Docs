---
title: UniDeskGlobals
editLink: true
---

# UniDeskGlobals 类型

全局状态单例，维护应用级主题模式（浅色/深色）、国际化翻译器以及应用退出信号。几乎所有 QML 控件都通过 `UniDeskGlobals.isLight` 读取当前主题。

| 项目 | 说明 |
|------|------|
| 控件类型 | 全局单例 |
| 源文件 | `UniDesk/CppExt/UniDeskGlobals.h` / `.cpp` |
| 继承 | QQuickItem |
| QML 导入 | `import UniDesk 1.0` |

## 属性

### `property bool isLight`
当前主题模式。`true` 为浅色，`false` 为深色。通过 `updateIsLight()` 根据系统设置或用户配置自动更新。

## 方法

### `function updateIsLight()`
重新检测并更新 `isLight` 属性，同时发出 `isLightChanged` 信号。

### `function emitApplicationQuit()`
发出 `applicationQuit` 信号，通知所有窗口和组件执行退出前清理。`UniDeskWindow` 内部监听此信号并自行关闭。

### `function startThread()`
启动后台线程（用于数据采样、热键监听等）。

### `function startListener()`
启动系统事件监听器（用于检测主题变化、托盘状态变化等）。

### `function translate(object, locale)`
使用指定的 `locale`（如 `"zh_CN"`、`"en_US"`）翻译给定 `object`（通常为 QML Item）。内部使用 `QTranslator` 加载对应的 `.ts` 文件。

## 信号

### `signal isLightChanged(bool isLight)`
主题模式变化时发出。

### `signal applicationQuit()`
应用即将退出时发出。

## 使用示例

```qml
import UniDesk 1.0

Rectangle {
    color: UniDeskGlobals.isLight ? "#F3F3F3" : "#1A1A1A"
}

Connections {
    target: UniDeskGlobals
    function onIsLightChanged(isLight) {
        console.log("主题切换为:", isLight ? "浅色" : "深色")
    }
}

Component.onCompleted: {
    UniDeskGlobals.translate(rootWindow, "en_US")
}
```

## 备注

- `isLight` 可被 `UniDeskSettings` 中的用户偏好覆盖。
- `emitApplicationQuit()` 应仅在 `main.cpp` 退出时调用，以避免重复调用。

## 相关文档

- [UniDeskSettings](./UniDeskSettings.md) — 用户设置持久化