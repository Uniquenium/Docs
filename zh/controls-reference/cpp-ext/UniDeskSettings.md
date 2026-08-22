---
title: UniDeskSettings
editLink: true
---

# UniDeskSettings 类型

用户设置持久化单例。处理主题色、字体、窗口行为、开机自启等用户偏好的读写。所有设置以 JSON 格式存储于 `%APPDATA%/Uniquenium/settings.json`。

| 项目 | 说明 |
|------|------|
| 控件类型 | 全局单例 |
| 源文件 | `UniDesk/CppExt/UniDeskSettings.h` / `.cpp` |
| 继承 | QQuickItem |
| QML 导入 | `import UniDesk 1.0` |

## 常用属性

（完整列表请参考源代码，以下为最常用的分类）

### 主题
- `primaryColor`：主题强调色（QColor）
- `isLightOverride`：强制浅色/深色模式（覆盖系统设置）
- `acrylicEnabled`：是否启用亚克力模糊效果

### 字体
- `fontFamily`：全局字体
- `fontSize`：基础字号

### 窗口
- `windowOpacity`：主面板透明度
- `autoStart`：开机自启
- `stayTop`：主面板是否置顶

## 方法

### `function loadSettings()`
从磁盘加载设置，覆盖默认值。

### `function saveSettings()`
将当前所有设置持久化到磁盘。

### `function resetToDefaults()`
将所有设置重置为默认值。

## 使用示例

```qml
import UniDesk 1.0

Rectangle {
    color: UniDeskSettings.primaryColor
}

UniDeskSettings.primaryColor = "#FF6B6B"
UniDeskSettings.acrylicEnabled = true
UniDeskSettings.saveSettings()
```

## 备注

- 修改设置后务必调用 `saveSettings()` 持久化，否则下次启动时将丢失。
- 某些设置（如 `autoStart`）还会操作系统注册表。

## 相关文档

- [UniDeskGlobals](./UniDeskGlobals.md) — 全局主题状态
- [UniDeskTools](./UniDeskTools.md) — 包含 `setAppAutoStart()` 等系统级设置辅助方法