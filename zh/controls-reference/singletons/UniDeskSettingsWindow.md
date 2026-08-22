---
title: UniDeskSettingsWindow
editLink: true
---

# UniDeskSettingsWindow 类型

Uniquenium 的设置窗口，继承自 `UniDeskWindow`，以标签页形式组织各项设置（功能、外观、热键、插件、关于）。该窗口以 QML 单例（`pragma Singleton`）形式注册，但同样通过 `comManager` 属性获取组件管理器实例。

| 控件类型    | 具体单项                                |
| ------- | ----------------------------------- |
| 源代码文件路径 | `UniDesk/Singletons/UniDeskSettingsWindow.qml` |
| 继承      | [UniDeskWindow](../UniDeskWindow)   |
| QML 导入方式 | `import UniDesk.Singletons 1.0` |

## 属性

### `property var comManager`
由 `main.qml` 注入的组件管理器实例，用于在设置窗口中操作组件（如添加/删除/预览组件等）。

### `property var customWallpaper`
自定义壁纸组件引用，用于在「外观」标签中预览壁纸效果。

### 继承自 `UniDeskWindow` 的常用属性
- `width: 1000`、`height: 700`：默认窗口尺寸
- `title: qsTr("设置")`：窗口标题
- `autoDestroy: false`：关闭时隐藏而非销毁
- `autoVisible: false`：启动时不自动显示

## 标签页

| 标签 | 说明 |
|------|------|
| 功能 | 开机自启、托盘行为、主面板交互等功能开关 |
| 外观 | 主题模式、主题色、字体、圆角、亚克力效果等 |
| 热键 | 全局热键注册与管理 |
| 插件 | 已安装插件列表、启停、配置，以及官方插件入口 |
| 关于 | 版本信息、仓库链接、鸣谢、检查更新 |

## 方法

### `function open()`
显示设置窗口并恢复上次查看的标签页。

### `function close()`
隐藏设置窗口（由于 `autoDestroy: false`，窗口实例保留）。

### `function switchTab(index)`
切换到指定索引的标签页。

### `function isVisible() → bool`
返回设置窗口当前是否可见。

## 使用示例

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0
import UniDesk.Singletons 1.0

// 从其他窗口或托盘打开设置
UniDeskButton {
    text: "打开设置"
    onClicked: UniDeskSettingsWindow.open()
}
```

## 备注

- `UniDeskSettingsWindow` 继承了 `UniDeskWindow` 的所有能力，包括无边框、亚克力、自动居中、信息条等。
- 由于以 `pragma Singleton` 注册，可直接通过类型名访问（如 `UniDeskSettingsWindow.open()`），但 `comManager` 属性仍需由外部注入。
- 各标签页的具体实现位于 `UniDesk/Singletons/SettingsViews/` 目录下（`AboutView.qml`、`AppearanceView.qml`、`FunctionView.qml`、`HotkeysView.qml`、`PluginsView.qml`）。

## 相关文档

- [UniDeskWindow](../UniDeskWindow.md) — 基类窗口控件
- [UniDeskComManager](../singletons/UniDeskComManager.md) — 通过 `comManager` 属性访问的组件管理器
- [官方插件](../../official-plugins.md) — 插件标签页中的官方插件入口