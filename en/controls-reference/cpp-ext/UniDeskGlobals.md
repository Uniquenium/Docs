---
title: UniDeskGlobals
editLink: true
---

# UniDeskGlobals Type

Global state singleton that maintains application-level theme mode (light/dark), i18n translator, and application quit signal. Almost all QML controls read the current theme through `UniDeskGlobals.isLight`.

| Item | Description |
|------|-------------|
| Control Type | Global Singleton |
| Source File | `UniDesk/CppExt/UniDeskGlobals.h` / `.cpp` |
| Inherits | QQuickItem |
| QML Import | `import UniDesk 1.0` |

## Properties

### `property bool isLight`
Current theme mode. `true` for light, `false` for dark. Updated automatically by `updateIsLight()` based on system settings or user configuration.

## Methods

### `function updateIsLight()`
Re-detect and update the `isLight` property. Also emits the `isLightChanged` signal.

### `function emitApplicationQuit()`
Emit the `applicationQuit` signal to notify all windows and components to perform pre-quit cleanup. `UniDeskWindow` internally listens for this signal and closes itself.

### `function startThread()`
Start background threads (for data sampling, hotkey listening, etc.).

### `function startListener()`
Start system event listeners (for detecting theme changes, tray status changes, etc.).

### `function translate(object, locale)`
Translate the given `object` (typically a QML Item) using the specified `locale` (e.g. `"zh_CN"`, `"en_US"`). Internally uses `QTranslator` to load the corresponding `.ts` file.

## Signals

### `signal isLightChanged(bool isLight)`
Emitted when the theme mode changes.

### `signal applicationQuit()`
Emitted when the application is about to quit.

## Example

```qml
import UniDesk 1.0

Rectangle {
    color: UniDeskGlobals.isLight ? "#F3F3F3" : "#1A1A1A"
}

Connections {
    target: UniDeskGlobals
    function onIsLightChanged(isLight) {
        console.log("Theme changed to:", isLight ? "Light" : "Dark")
    }
}

Component.onCompleted: {
    UniDeskGlobals.translate(rootWindow, "en_US")
}
```

## Notes

- `isLight` can be overridden by user preferences in `UniDeskSettings`.
- `emitApplicationQuit()` should only be called from `main.cpp` on exit to avoid duplicate calls.

## Related

- [UniDeskThemeManager](./UniDeskThemeManager.md) — Theme switching implementation
- [UniDeskSettings](./UniDeskSettings.md) — User settings persistence