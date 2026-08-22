---
title: UniDeskSettings
editLink: true
---

# UniDeskSettings Type

User settings persistence singleton. Handles reading and writing of user preferences such as theme color, font, window behavior, auto-start, etc. All settings are stored in JSON format at `%APPDATA%/Uniquenium/settings.json`.

| Item | Description |
|------|-------------|
| Control Type | Global Singleton |
| Source File | `UniDesk/CppExt/UniDeskSettings.h` / `.cpp` |
| Inherits | QQuickItem |
| QML Import | `import UniDesk 1.0` |

## Common Properties

(For the complete list, refer to the source code. The most commonly used categories are listed below.)

### Theme
- `primaryColor`: Theme accent color (QColor)
- `isLightOverride`: Force light/dark mode (overrides system setting)
- `acrylicEnabled`: Whether the Acrylic blur effect is enabled

### Font
- `fontFamily`: Global font family
- `fontSize`: Base font size

### Window
- `windowOpacity`: Main panel opacity
- `autoStart`: Whether to auto-start on boot
- `stayTop`: Whether the main panel stays on top

## Methods

### `function loadSettings()`
Load settings from disk, overriding defaults.

### `function saveSettings()`
Persist all current settings to disk.

### `function resetToDefaults()`
Reset all settings to their default values.

## Example

```qml
import UniDesk 1.0

Rectangle {
    color: UniDeskSettings.primaryColor
}

UniDeskSettings.primaryColor = "#FF6B6B"
UniDeskSettings.acrylicEnabled = true
UniDeskSettings.saveSettings()
```

## Notes

- Call `saveSettings()` after modifying settings to persist them; otherwise changes are lost on next launch.
- Some settings (like `autoStart`) also manipulate the system registry.

## Related

- [UniDeskGlobals](./UniDeskGlobals.md) — Global theme state
- [UniDeskTools](./UniDeskTools.md) — Contains system-level settings helpers like `setAppAutoStart()`