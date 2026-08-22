---
title: UniDeskWindow
editLink: true
---

# UniDeskWindow Type

The base window control of Uniquenium. Built on top of `QtQuick.Window`, it adds frameless rendering, Acrylic blur, a custom AppBar, and a built-in info bar. It is the base class for all application windows (settings window, component manager window, page manager window, etc.).

| Control Type | Visual Control |
|-------------|----------------|
| Source File | `UniDesk/Controls/UniDeskWindow.qml` |
| Inherits | QtQuick Window |

## Properties

### `default property alias contentData`
Default property, pointing to the main content area `layout_content.data`. Child items placed directly inside a `UniDeskWindow { ... }` are automatically hosted in this area.

### `property string windowIcon`
Window icon (shown on the left side of the AppBar).

### `property int launchMode: UniDeskWindowType.Standard`
Window launch mode (defined by the `UniDeskWindowType` enumeration).

### `property var argument: ({})`
Parameters passed in at window creation. They are dispatched to subclasses via the `initArgument(argument)` signal in `Component.onCompleted`.

### `property var background`
Window background. Defaults to the internal `com_background` component (system wallpaper + Acrylic blur).

### `property bool fixSize: false`
Whether to lock the window size. When enabled, the window cannot be resized by dragging and maximize/minimize buttons are disabled.

### `property bool fitsAppBarWindows: false`
Whether the AppBar area aligns with the content area (used when the AppBar is embedded in the system title bar).

### `property var tintOpacity`
Opacity of the Acrylic background. Defaults to `0.50` in dark mode and `0.75` in light mode.

### `property int blurRadius: 80`
Blur radius of the Acrylic effect.

### `property var windowVisibility`
Alias of the window `visibility` property (used for QML binding).

### `property alias effect: frameless.effect`
Current effect used by the frameless window (points to `UniDeskFrameless.effect`).

### `readonly property alias effective: frameless.effective`
Whether the current effect is active (read-only).

### `readonly property alias availableEffects: frameless.availableEffects`
List of available effects (read-only).

### `property Item appBar`
Custom window title bar (a `UniDeskAppBar` instance is created by default and auto-updated with the window title, icon and button visibility).

### `property color backgroundColor`
Window background color, automatically computed based on theme (light/dark), active state, and whether the Acrylic effect is enabled.

### `property bool stayTop: false`
Whether the window should stay on top.

### `property bool showDark: false`
Whether to force the window into dark mode (affects AppBar buttons and border color).

### `property bool showClose: true`
Whether to show the close button.

### `property bool showMinimize: true`
Whether to show the minimize button.

### `property bool showMaximize: true`
Whether to show the maximize/restore button.

### `property bool showStayTop: false`
Whether to show the stay-on-top button.

### `property bool autoMaximize: false`
Whether to automatically maximize the window when created.

### `property bool autoVisible: true`
Whether to call `show()` automatically after the window is created.

### `property bool autoCenter: true`
Whether to automatically center the window on the screen when created.

### `property bool autoDestroy: true`
Whether to destroy the window on close. If set to `false`, the window is hidden (`visibility = Hidden`) instead.

### `property bool useSystemAppBar`
Whether to use the system title bar (assigned by subclasses in `Component.onCompleted`, default is `false`).

### `property int __margins: 0`
Inner padding between the window content area and the window border.

### `property color resizeBorderColor`
Window border color, automatically computed based on theme and active state.

### `property int resizeBorderWidth: 1`
Width of the window border and also the hit area for border dragging.

### `property var closeListener`
Close event callback with the signature `function(event)`. When `autoDestroy=false`, it intercepts the close event and hides the window instead of destroying it.

### `property bool _hideShadow: false`
Whether to hide the window shadow.

## Signals

### `signal focusOut()`
Forwarded by the internal `UniDeskFrameless` when the window loses focus.

### `signal initArgument(var argument)`
Emitted after the window is initialized. The argument is the `argument` passed at construction, used by subclasses to receive startup parameters.

### `signal lazyLoad()`
Emitted on the first show of the window (lazy-load trigger), used to delay-load heavy resources.

## Methods

### `function moveWindowToDesktopCenter()`
Move the window to the center of the current desktop's available area.

### `function fixWindowSize()`
Lock the window's maximum/minimum size according to the `fixSize` property.

### `function setResult(data)`
Return a result to the window registrar (`_windowRegister`).

### `function showMaximized()` / `function showMinimized()` / `function showNormal()`
Explicitly switch the window to maximized / minimized / normal state.

### `function setHitTestVisible(val)`
Set whether the window receives mouse hit-testing (transparency toggle).

### `function deleteLater()`
Defer-destroy the window (eventually calls `UniDeskUtils.deleteLater`).

### `function containerItem()`
Return the root container Item of the window (`layout_container`), useful for dynamically mounting child components.

### `function showActivate()`
If the window is visible, call `requestActivate()`; otherwise call `show()`.

### `function showSuccess(text, duration, moremsg)` / `function showInfo(...)` / `function showWarning(...)` / `function showError(...)`
Show a temporary message via the built-in `UniDeskInfoBar`.

### `function clearAllInfo()`
Clear all info messages currently displayed in the window.

## Example

```qml
UniDeskWindow {
    title: "My Window"
    windowIcon: "qrc:/icons/app.png"
    argument: { userId: 42 }
    autoCenter: true
    autoMaximize: false
    stayTop: true
    showDark: UniDeskGlobals.isLight ? false : true

    onInitArgument: console.log("Startup parameters:", argument)

    Column {
        anchors.centerIn: parent
        Text { text: "Hello Uniquenium" }
    }
}
```

## Notes

- `UniDeskWindow` works together with `UniDeskFrameless` to provide true frameless windows. Dragging, hit-testing and Acrylic effects are all handled by the latter.
- The window background uses the current system wallpaper by default (`UniDeskTools.get_system_wallpaper()`) with a `UniDeskAcrylic` blur on top.
- On Wayland or in software rendering mode, it automatically falls back to a solid color background (`UniDeskUtils.isSoftware()`).
- The closing behavior is controlled by `closeListener`: when `autoDestroy=true`, the window is destroyed directly; when `autoDestroy=false`, it is only hidden, which is useful for long-lived tool windows.