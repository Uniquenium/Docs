---
title: UniDeskTools
editLink: true
---

# UniDeskTools 类型

本单例提供一组通用工具函数：颜色状态切换、系统命令、字体管理、壁纸读写、UUID 生成、开机自启等。**无需实例化**，在 QML 中直接通过名字调用。

| 项目 | 说明 |
|------|------|
| 控件类型 | 全局单例（Singleton） |
| 源代码文件路径 | `UniDesk/CppExt/UniDeskTools.h` / `.cpp` |
| 继承 | [QtQuick Item](https://doc.qt.io/qt-6.8/qml-qtquick-item.html) |
| QML 导入方式 | `import UniDesk 1.0` |

---

## 属性

### `property QList<QString> familyPaths`

已加载的自定义字体文件路径列表。通过 `addFontFamily()` 添加的字体路径会保存于此。

### `property QList<int> appFonts`

已注册的应用字体 ID 列表（内部使用）。

---

## 方法

---

### 颜色与状态

#### `switchColor(normal, hover, press, disable, hovered, pressed, disabled) → QColor`

```cpp
Q_INVOKABLE QColor switchColor(
    const QColor &normal, const QColor &hover, const QColor &press, const QColor &disable,
    bool hovered, bool pressed, bool disabled
);
```

根据控件状态自动选择对应颜色。**UniDesk 所有按钮控件都内部使用此函数**。

**参数**：
- `normal`：正常状态颜色
- `hover`：鼠标悬停（hovered）颜色
- `press`：按下（pressed）颜色
- `disable`：禁用（disabled）颜色
- `hovered`、`pressed`、`disabled`：当前状态布尔值

**示例**：
```qml
import UniDesk 1.0

Rectangle {
    id: btnBg
    property bool hovered: false
    property bool pressed: false
    property bool disabled: false
    
    color: UniDeskTools.switchColor(
        "#F0F0F0",       // normal
        "#E0E0E0",       // hover
        "#D0D0D0",       // press
        "#F8F8F8",       // disable
        hovered, pressed, disabled
    )
}
```

---

### 系统操作

#### `systemCommand(command)`

```cpp
Q_INVOKABLE void systemCommand(const QString &command);
```

执行系统命令（类似终端中运行命令）。Windows 下通过 cmd 解释执行。

```qml
// 打开记事本
UniDeskTools.systemCommand("notepad.exe")

// 打开计算器
UniDeskTools.systemCommand("calc")

// 调用 msg 弹框
UniDeskTools.systemCommand("msg * Hello from Uniquenium!")
```

::: warning 安全提示
执行用户输入的命令时务必做好校验，避免任意命令执行漏洞。
:::

---

#### `web_browse(url)`

```cpp
Q_INVOKABLE void web_browse(const QString &url);
```

使用**系统默认浏览器**打开指定 URL。

```qml
UniDeskTools.web_browse("https://github.com/Uniquenium/Uniquenium")
UniDeskTools.web_browse("https://docs.uniquenium.qyadbr.top")
```

---

#### `setTaskbarVisible(vis)`

```cpp
Q_INVOKABLE void setTaskbarVisible(bool vis);
```

显示或隐藏 **Windows 任务栏**。`true` 显示，`false` 隐藏。

::: danger 注意
隐藏任务栏后请确保提供恢复方式（例如快捷键），否则用户可能无法找回任务栏！
:::

```qml
// 沉浸模式：隐藏任务栏
UniDeskTools.setTaskbarVisible(false)

// 恢复显示
UniDeskTools.setTaskbarVisible(true)
```

---

#### `isSystemColorLight() → bool`

```cpp
Q_INVOKABLE bool isSystemColorLight();
```

**立即检测**一次系统主题模式（不会缓存）。返回 `true` 表示浅色。大多数场景使用 `UniDeskGlobals.isLight` 即可。

---

### 壁纸操作

#### `get_system_wallpaper() → QUrl`

```cpp
Q_INVOKABLE QUrl get_system_wallpaper();
```

获取当前**系统桌面壁纸**的文件路径（返回 QUrl，可直接作为 Image 的 source）。

```qml
import QtQuick 2.15
import UniDesk 1.0

Image {
    id: bgWallpaper
    anchors.fill: parent
    fillMode: Image.PreserveAspectCrop
    source: UniDeskTools.get_system_wallpaper()
}
```

---

#### `set_system_wallpaper(path)`

```cpp
Q_INVOKABLE void set_system_wallpaper(const QUrl &path);
```

将指定图片设置为**系统桌面壁纸**。

**参数**：
- `path`：图片的本地路径（QUrl 格式，可用 `fromLocalFile()` 转换）

```qml
import UniDesk 1.0

// 设置本地图片为壁纸
var localFile = "C:/Users/Pictures/wallpaper.jpg"
UniDeskTools.set_system_wallpaper(UniDeskTools.fromLocalFile(localFile))
```

---

#### `desktopGeometry(window) → QRect`

```cpp
Q_INVOKABLE QRect desktopGeometry(QQuickWindow *window);
```

获取当前窗口所在屏幕的**可用桌面区域**几何尺寸（即扣除任务栏后的区域）。

返回值包含 `x`, `y`, `width`, `height` 四个属性。

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

UniDeskWindow {
    id: win
    Component.onCompleted: {
        var geo = UniDeskTools.desktopGeometry(win)
        console.log("可用桌面区域：", geo.width, "x", geo.height)
        // 将窗口移动到右下角
        win.x = geo.x + geo.width - win.width - 20
        win.y = geo.y + geo.height - win.height - 20
    }
}
```

---

### 字体管理

#### `font(family, size) → QFont`

```cpp
Q_INVOKABLE QFont font(const QString &family, int size);
```

根据字体家族名称和字号创建 `QFont` 对象，可直接赋值给控件的 `font` 属性。

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

UniDeskText {
    text: "使用思源黑体"
    font: UniDeskTools.font("Source Han Sans CN", 18)
}
```

---

#### `applicationFontFamilies() → QVariant (QStringList)`

```cpp
Q_INVOKABLE QVariant applicationFontFamilies();
```

返回**系统已安装**的所有字体家族名称列表。效果等同于 `QFontDatabase.families()`。

```qml
import UniDesk 1.0

Component.onCompleted: {
    var families = UniDeskTools.applicationFontFamilies()
    console.log("系统字体数量：", families.length)
    // 打印前 10 个字体名
    for (var i = 0; i < Math.min(10, families.length); ++i)
        console.log("  -", families[i])
}
```

---

#### `fontIndex(familyName) → int`

```cpp
Q_INVOKABLE int fontIndex(const QString &familyName);
```

查找字体家族名在 `applicationFontFamilies()` 数组中的索引。若不存在返回 `-1`。

常用于判断某字体是否存在，再决定是否使用：

```qml
var idx = UniDeskTools.fontIndex("JetBrains Mono")
if (idx >= 0) {
    text.font = UniDeskTools.font("JetBrains Mono", 14)
} else {
    console.warn("未安装 JetBrains Mono，回退到等宽字体")
    text.font.family = "Consolas"
}
```

---

#### `addFontFamily(path)`

```cpp
Q_INVOKABLE void addFontFamily(const QString &path);
```

从本地 TTF/OTF 文件**动态加载字体**到应用中。加载成功后可通过 `font()` 使用。

```qml
// 加载自定义字体文件
UniDeskTools.addFontFamily("file:///C:/Fonts/MyFont.ttf")

// 稍后即可使用（注意字体加载是异步的，建议用 Timer 延时）
Timer {
    interval: 500
    onTriggered: myText.font = UniDeskTools.font("My Custom Font", 16)
}
```

---

#### `removeFontFamily(id)`

```cpp
Q_INVOKABLE void removeFontFamily(const QString &id);
```

卸载之前 `addFontFamily()` 加载的字体（内部使用）。

---

#### `getCustomFonts() → QVariant`

返回所有通过 `addFontFamily()` 动态加载的自定义字体信息。

---

### 路径与文件

#### `fromLocalFile(path) → QUrl`

```cpp
Q_INVOKABLE QUrl fromLocalFile(const QString &path);
```

等价于 `QUrl::fromLocalFile(path)`。将本地磁盘路径（如 `C:\a\b.png`）转换为 QML Image 等组件可接受的 `file:///` URL 格式。

```qml
var local = "C:/Users/Public/logo.png"
var url = UniDeskTools.fromLocalFile(local)
// url = "file:///C:/Users/Public/logo.png"
image.source = url
```

---

#### `isValidUrl(url) → bool`

```cpp
Q_INVOKABLE bool isValidUrl(const QUrl &url);
```

判断一个 URL 是否格式合法。

---

#### `localFileExists(url) → bool`

```cpp
Q_INVOKABLE bool localFileExists(const QUrl &url);
```

判断本地文件是否存在。

```qml
var p = UniDeskTools.fromLocalFile("C:/test.txt")
if (UniDeskTools.localFileExists(p)) {
    console.log("文件存在")
}
```

---

#### `openFileOrDir(path)`

```cpp
Q_INVOKABLE void openFileOrDir(const QString &path);
```

用系统默认程序打开**文件或目录**。
- 目录 → 资源管理器中打开
- 文档 → 用关联软件打开
- 可执行文件 → 直接运行

```qml
UniDeskTools.openFileOrDir("C:/Users")        // 打开用户目录
UniDeskTools.openFileOrDir("C:/test.docx")    // 用 Word 打开
```

---

#### `showFileInExplorer(path)`

```cpp
Q_INVOKABLE void showFileInExplorer(const QString &path);
```

在资源管理器中打开文件所在目录，并**自动选中**该文件（类似浏览器的「在文件夹中显示」）。

```qml
UniDeskTools.showFileInExplorer("C:/Downloads/Uniquenium-Setup.exe")
```

---

### 其他工具

#### `getCursorPosition() → QPoint`

```cpp
Q_INVOKABLE QPoint getCursorPosition();
```

获取当前**全局鼠标光标**在屏幕坐标系中的位置（x, y）。

```qml
Timer {
    running: true
    repeat: true
    interval: 100
    onTriggered: {
        var p = UniDeskTools.getCursorPosition()
        console.log("鼠标位置：", p.x, ",", p.y)
    }
}
```

---

#### `createUuid() → QString`

```cpp
Q_INVOKABLE QString createUuid();
```

生成一个符合 RFC 4122 标准的 **UUID** 字符串（形如 `{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}`）。

可作为组件 ID、缓存键、临时文件名等使用。

```qml
import UniDesk 1.0

var newComponentId = "com_" + UniDeskTools.createUuid()
console.log("新组件 ID：", newComponentId)
```

---

#### `getModuleVersionMajor / Minor / Patch() → QString`

```cpp
Q_INVOKABLE QString getModuleVersionMajor();
Q_INVOKABLE QString getModuleVersionMinor();
Q_INVOKABLE QString getModuleVersionPatch();
```

分别返回 UniDesk 模块的**主版本号 / 次版本号 / 修订号**。三者组合为完整版本号（如 `1.2.3`）。

```qml
var ver = [
    UniDeskTools.getModuleVersionMajor(),
    UniDeskTools.getModuleVersionMinor(),
    UniDeskTools.getModuleVersionPatch()
].join(".")
console.log("UniDesk 版本：", ver)   // 例如：1.0.0
```

---

### 开机自启

#### `isAppAutoStartEnabled() → bool`

```cpp
Q_INVOKABLE bool isAppAutoStartEnabled();
```

查询当前程序是否已加入 **Windows 开机自启动**列表。

---

#### `setAppAutoStart(enabled)`

```cpp
Q_INVOKABLE void setAppAutoStart(bool enabled);
```

将程序加入或移除开机自启动（通过注册表 `HKCU\...\Run` 键实现）。

```qml
// 开启开机自启
if (!UniDeskTools.isAppAutoStartEnabled())
    UniDeskTools.setAppAutoStart(true)
```

---

## 信号

### `customFontsChanged()`

通过 `addFontFamily` / `removeFontFamily` 修改自定义字体列表后触发。可用于刷新字体选择 UI。

---

## 完整示例

### 示例 1：一键打开 GitHub 并切换壁纸

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

UniDeskButton {
    contentText: "美化并访问官网"
    onClicked: {
        // 1. 切换到一张好看的壁纸
        UniDeskTools.set_system_wallpaper(
            UniDeskTools.fromLocalFile("C:/Wallpapers/Aurora.jpg")
        )
        // 2. 打开官方文档
        UniDeskTools.web_browse("https://docs.uniquenium.qyadbr.top")
    }
}
```

### 示例 2：主题色按钮（使用 switchColor）

```qml
import QtQuick 2.15
import UniDesk 1.0

Rectangle {
    id: myButton
    width: 140
    height: 36
    radius: 8

    property bool hovered: ma.containsMouse
    property bool pressed: ma.pressed
    property bool disabled: false

    color: UniDeskTools.switchColor(
        UniDeskSettings.primaryColor,
        UniDeskSettings.primaryColor.lighter(1.15),
        UniDeskSettings.primaryColor.darker(1.3),
        "#cccccc",
        hovered, pressed, disabled
    )

    MouseArea {
        id: ma
        anchors.fill: parent
        hoverEnabled: true
    }
}
```

---

## 相关文档

- [UniDeskGlobals](/controls-reference/singletons/UniDeskGlobals.md)：全局主题状态 `isLight`
- [UniDeskSettings](/controls-reference/singletons/UniDeskSettings.md)：`primaryColor` 主题色读取
- [UniDeskTextStyle](/controls-reference/singletons/UniDeskTextStyle.md)：四级预定义字体样式
