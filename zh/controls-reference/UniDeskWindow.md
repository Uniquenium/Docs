---
title: UniDeskWindow
editLink: true
---

# UniDeskWindow 类型

Uniquenium 的基础窗口控件，在 `QtQuick.Window` 之上封装了无边框、亚克力模糊、自定义标题栏（AppBar）、内置提示条等能力，是所有应用窗口（设置窗口、组件管理窗口、页面管理窗口等）的基类。

| 控件类型    | 可视化控件（Control）                    |
| ------- | -------------------------------- |
| 源代码文件路径 | `UniDesk/Controls/UniDeskWindow.qml` |
| 继承      | QtQuick Window                   |

## 属性

### `default property alias contentData`
默认属性，指向窗口主内容区域 `layout_content.data`，使用 `UniDeskWindow { Text { ... } }` 时子 Item 会自动进入内容区。

### `property string windowIcon`
窗口图标（显示在 AppBar 左侧）。

### `property int launchMode: UniDeskWindowType.Standard`
窗口启动模式（由 `UniDeskWindowType` 枚举定义）。

### `property var argument: ({})`
窗口初始化时传入的参数对象，会在 `Component.onCompleted` 中通过 `initArgument(argument)` 信号传递给子类。

### `property var background`
窗口背景，默认为内部的 `com_background` 组件（包含壁纸图 + 亚克力模糊）。

### `property bool fixSize: false`
是否固定窗口大小。开启后窗口不可拖拽缩放，最大化/最小化按钮也会被禁用。

### `property bool fitsAppBarWindows: false`
是否让 AppBar 区域与内容区域对齐（当 AppBar 嵌入系统标题栏时使用）。

### `property var tintOpacity`
亚克力背景的不透明度，深色模式默认 `0.50`，浅色模式默认 `0.75`。

### `property int blurRadius: 80`
亚克力模糊半径。

### `property var windowVisibility`
窗口 `visibility` 的属性别名（用于 QML 绑定）。

### `property alias effect: frameless.effect`
当前无边框窗口所使用的特效（指向 `UniDeskFrameless.effect`）。

### `readonly property alias effective: frameless.effective`
当前特效是否生效（只读）。

### `readonly property alias availableEffects: frameless.availableEffects`
可用的特效列表（只读）。

### `property Item appBar`
窗口自定义标题栏（默认创建一个 `UniDeskAppBar` 实例，会跟随窗口标题、图标和按钮显示状态自动更新）。

### `property color backgroundColor`
窗口背景色，根据主题（深色/浅色）、窗口激活状态、是否启用亚克力效果自动计算。

### `property bool stayTop: false`
窗口是否置顶。

### `property bool showDark: false`
是否强制窗口进入深色模式（影响 AppBar 按钮与边框色）。

### `property bool showClose: true`
是否显示关闭按钮。

### `property bool showMinimize: true`
是否显示最小化按钮。

### `property bool showMaximize: true`
是否显示最大化/还原按钮。

### `property bool showStayTop: false`
是否显示置顶按钮。

### `property bool autoMaximize: false`
窗口创建时是否自动最大化。

### `property bool autoVisible: true`
窗口创建后是否自动调用 `show()`。

### `property bool autoCenter: true`
窗口创建后是否自动移动到桌面中心。

### `property bool autoDestroy: true`
窗口关闭时是否自动销毁（若为 `false`，则将 `visibility` 置为 `Hidden`）。

### `property bool useSystemAppBar`
是否使用系统标题栏（由子类在 `Component.onCompleted` 中赋值，默认 `false`）。

### `property int __margins: 0`
窗口内容区域与窗口边框之间的内边距。

### `property color resizeBorderColor`
窗口边框颜色，依据主题与窗口激活状态自动计算。

### `property int resizeBorderWidth: 1`
窗口边框宽度，同时也是拖拽边框的命中区域宽度。

### `property var closeListener`
关闭事件回调，签名为 `function(event)`；当 `autoDestroy=false` 时会在这里拦截关闭事件，将窗口隐藏而非销毁。

### `property bool _hideShadow: false`
是否隐藏窗口阴影。

## 信号

### `signal focusOut()`
窗口失去焦点时由内部 `UniDeskFrameless` 转发。

### `signal initArgument(var argument)`
窗口完成初始化时发出，参数为构造时传入的 `argument`，供子类重写以获取启动参数。

### `signal lazyLoad()`
窗口首次显示时发出（懒加载触发），用于延迟加载重型资源。

## 方法

### `function moveWindowToDesktopCenter()`
将窗口移动到当前桌面可用区域的正中央。

### `function fixWindowSize()`
根据 `fixSize` 属性锁定窗口最大/最小尺寸。

### `function setResult(data)`
向窗口注册器（`_windowRegister`）返回结果。

### `function showMaximized()` / `function showMinimized()` / `function showNormal()`
显式地将窗口切换为最大化 / 最小化 / 普通状态。

### `function setHitTestVisible(val)`
设置窗口是否接收鼠标命中测试（透传开关）。

### `function deleteLater()`
延迟销毁窗口（最终调用 `UniDeskUtils.deleteLater`）。

### `function containerItem()`
返回窗口的根容器 Item（`layout_container`），便于将子组件动态挂载到窗口内。

### `function showActivate()`
若窗口已可见则激活（`requestActivate`），否则调用 `show()` 显示。

### `function showSuccess(text, duration, moremsg)` / `function showInfo(...)` / `function showWarning(...)` / `function showError(...)`
通过内置 `UniDeskInfoBar` 显示临时提示信息。

### `function clearAllInfo()`
清除窗口内所有正在显示的提示信息。

## 使用示例

```qml
UniDeskWindow {
    title: "我的窗口"
    windowIcon: "qrc:/icons/app.png"
    argument: { userId: 42 }
    autoCenter: true
    autoMaximize: false
    stayTop: true
    showDark: UniDeskGlobals.isLight ? false : true

    onInitArgument: console.log("收到启动参数:", argument)

    Column {
        anchors.centerIn: parent
        Text { text: "Hello Uniquenium" }
    }
}
```

## 备注

- `UniDeskWindow` 配合 `UniDeskFrameless` 实现真正的无边框窗口，所有拖拽、命中测试、亚克力效果均由后者提供。
- 窗口背景默认使用当前系统壁纸（`UniDeskTools.get_system_wallpaper()`）并叠加 `UniDeskAcrylic` 产生毛玻璃效果。
- 在 Wayland 或软件渲染模式下会自动回退为纯色背景（`UniDeskUtils.isSoftware()`）。
- 关闭行为由 `closeListener` 控制：`autoDestroy=true` 时直接销毁窗口；`autoDestroy=false` 时只隐藏窗口，常用于需要常驻的工具窗口。