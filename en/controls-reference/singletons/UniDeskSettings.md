---
title: UniDeskSettings
editLink: true
---

# UniDeskSettings Singleton

Settings singleton, providing read/write access to program configuration, including theme color, various options, and persistent settings.

| Project | Description |
|---------|-------------|
| Type | Singleton |
| Source File | `UniDesk/Singletons/UniDeskSettings.qml` |
| QML Import | `import UniDesk 1.0` |

## Using the Singleton

```qml
import UniDesk 1.0

// Read settings
console.log("Theme Color:", UniDeskSettings.primaryColor)
console.log("Enable Acrylic:", UniDeskSettings.acrylicEnabled)

// Write settings
UniDeskSettings.primaryColor = "#0078D4"
UniDeskSettings.acrylicEnabled = true
```

## Properties

### `property color primaryColor`
Current primary/theme color.

### `property bool acrylicEnabled`
Whether to enable the acrylic blur effect.

### `property bool windowShadowEnabled`
Whether to enable window shadows.

### `property string language`
Current language setting.

### `property var customSettings`
Custom settings storage for plugins or components.

## Signals

### `signal primaryColorChanged()`
Triggered when the primary color changes.

### `signal acrylicEnabledChanged()`
Triggered when the acrylic effect is enabled or disabled.

### `signal languageChanged()`
Triggered when the language changes.

## Basic Usage

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

UniDeskFrame {
    Rectangle {
        width: parent.width
        height: 4
        color: UniDeskSettings.primaryColor
    }

    Connections {
        target: UniDeskSettings
        function onPrimaryColorChanged() {
            console.log("Theme color changed to:", UniDeskSettings.primaryColor)
        }
    }
}
```

## Related Singletons

- [UniDeskGlobals](/en/controls-reference/singletons/UniDeskGlobals.md) - Global state
- [UniDeskTools](/en/controls-reference/singletons/UniDeskTools.md) - Tool functions
- [UniDeskTextStyle](/en/controls-reference/singletons/UniDeskTextStyle.md) - Font preset

## Related Documentation

- [Theme Adaptation Best Practices](/en/controls-reference/overview.md#theme-adaptation-best-practices)
- [Glossary](/en/glossary.md)