---
title: UniDeskGlobals
editLink: true
---

# UniDeskGlobals Singleton

Global state singleton, used to store and provide access to global state within the program, such as theme mode, event notification, etc.

| Project | Description |
|---------|-------------|
| Type | Singleton |
| Source File | `UniDesk/Singletons/UniDeskGlobals.qml` |
| QML Import | `import UniDesk 1.0` |

## Using the Singleton

```qml
import UniDesk 1.0

// Access properties
console.log("Is Light Mode:", UniDeskGlobals.isLight)
console.log("Accent Color:", UniDeskGlobals.accentColor)

// Listen for changes
Connections {
    target: UniDeskGlobals
    function onIsLightChanged() {
        console.log("Theme changed to:", UniDeskGlobals.isLight ? "Light" : "Dark")
    }
}
```

## Properties

### `property bool isLight`
Current theme mode. `true` indicates light mode, `false` indicates dark mode.

### `property color accentColor`
Current accent/theme color.

### `property string version`
Current program version.

### `property var eventBus`
Global event bus object for communication between different components.

## Signals

### `signal isLightChanged()`
Triggered when the theme mode changes.

### `signal accentColorChanged()`
Triggered when the accent color changes.

### `signal versionChanged()`
Triggered when the version number changes.

## Basic Usage

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

Rectangle {
    // Dynamic color based on theme
    color: UniDeskGlobals.isLight ? "#FFFFFF" : "#202020"

    Rectangle {
        width: 4
        height: parent.height
        color: UniDeskGlobals.accentColor
    }

    Connections {
        target: UniDeskGlobals
        function onIsLightChanged() {
            console.log("Theme switched to:", UniDeskGlobals.isLight ? "Light" : "Dark")
        }
    }
}
```

## Related Singletons

- [UniDeskTools](/en/controls-reference/singletons/UniDeskTools.md) - Tool functions
- [UniDeskSettings](/en/controls-reference/singletons/UniDeskSettings.md) - Settings
- [UniDeskTextStyle](/en/controls-reference/singletons/UniDeskTextStyle.md) - Font preset
- [UniDeskComManager](/en/controls-reference/singletons/UniDeskComManager.md) - Component management

## Related Documentation

- [Theme Adaptation Best Practices](/en/controls-reference/overview.md#theme-adaptation-best-practices)
- [Glossary](/en/glossary.md) - Singleton vs. Control vs. Component