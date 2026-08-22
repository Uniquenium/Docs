---
title: UniDeskTools
editLink: true
---

# UniDeskTools 类型

通用工具单例，基于 C++ 后端实现。提供颜色状态切换、系统命令、字体管理、壁纸读写、UUID 生成、开机自启、路径转换等常用工具函数。**无需实例化**，在 QML 中直接通过名字调用。

| 项目 | 说明 |
|------|------|
| 控件类型 | 全局单例 |
| 源文件 | `UniDesk/CppExt/UniDeskTools.h` / `.cpp` |
| 继承 | QQuickItem |
| QML 导入 | `import UniDesk 1.0` |

## 属性

### `property QList<QString> familyPaths`
已加载的自定义字体文件路径列表。

### `property QList<int> appFonts`
已注册的应用字体 ID 列表（内部使用）。

## 方法

### 颜色与状态

#### `switchColor(normal, hover, press, disable, hovered, pressed, disabled) → QColor`
根据控件状态自动选择对应颜色。UniDesk 所有按钮控件都内部使用此函数。

```qml
color: UniDeskTools.switchColor(
    "#F0F0F0", "#E0E0E0", "#D0D0D0", "#F8F8F8",
    hovered, pressed, disabled
)
```

### 系统操作

#### `systemCommand(command)`
执行系统命令（Windows 下通过 cmd 解释执行）。

#### `web_browse(url)`
使用系统默认浏览器打开指定 URL。

#### `setTaskbarVisible(vis)`
显示或隐藏 Windows 任务栏。`true` 显示，`false` 隐藏。

#### `isSystemColorLight() → bool`
立即检测一次系统主题模式（不会缓存）。

### 壁纸操作

#### `get_system_wallpaper() → QUrl`
获取当前系统桌面壁纸的文件路径。

#### `set_system_wallpaper(path)`
将指定图片设置为系统桌面壁纸。

#### `desktopGeometry(window) → QRect`
获取当前窗口所在屏幕的可用桌面区域（扣除任务栏）。

### 字体管理

#### `font(family, size) → QFont`
根据字体家族名和字号创建 `QFont` 对象。

#### `applicationFontFamilies() → QVariant`
返回系统已安装的所有字体家族名称列表。

#### `fontIndex(familyName) → int`
查找字体家族名在数组中的索引，不存在返回 `-1`。

#### `addFontFamily(path)`
从 TTF/OTF 文件动态加载字体到应用中。

#### `removeFontFamily(id)`
卸载之前 `addFontFamily()` 加载的字体。

#### `getCustomFonts() → QVariant`
返回所有通过 `addFontFamily()` 动态加载的自定义字体信息。

### 路径与文件

#### `fromLocalFile(path) → QUrl`
将本地磁盘路径转换为 `file:///` URL 格式。

#### `isValidUrl(url) → bool`
判断 URL 是否格式合法。

#### `localFileExists(url) → bool`
判断本地文件是否存在。

#### `openFileOrDir(path)`
用系统默认程序打开文件或目录。

#### `showFileInExplorer(path)`
在资源管理器中打开文件所在目录并选中该文件。

### 其他工具

#### `getCursorPosition() → QPoint`
获取全局鼠标光标在屏幕坐标系中的位置。

#### `createUuid() → QString`
生成符合 RFC 4122 标准的 UUID 字符串。

#### `getModuleVersionMajor() → QString`
返回 UniDesk 主版本号。

#### `getModuleVersionMinor() → QString`
返回 UniDesk 次版本号。

#### `getModuleVersionPatch() → QString`
返回 UniDesk 修订号。

### 开机自启

#### `isAppAutoStartEnabled() → bool`
查询程序是否已加入 Windows 开机自启动列表。

#### `setAppAutoStart(enabled)`
将程序加入或移除开机自启动（通过注册表实现）。

## 信号

### `customFontsChanged()`
通过 `addFontFamily` / `removeFontFamily` 修改自定义字体列表后触发。

## 使用示例

```qml
import UniDesk 1.0

// 打开 GitHub
UniDeskTools.web_browse("https://github.com/Uniquenium/Uniquenium")

// 设置壁纸
UniDeskTools.set_system_wallpaper(
    UniDeskTools.fromLocalFile("C:/Wallpapers/Aurora.jpg")
)

// 生成组件 ID
var newId = "com_" + UniDeskTools.createUuid()
```

## 相关文档

- [UniDeskGlobals](./UniDeskGlobals.md) — 全局主题状态
- [UniDeskSettings](./UniDeskSettings.md) — `primaryColor` 主题色
- [UniDeskTextStyle](./UniDeskTextStyle.md) — 全局字体样式