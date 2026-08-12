---
title: UniDeskSettingsWindow
editLink: true
---

# UniDeskSettingsWindow Singleton

Settings window singleton for opening and managing the program settings window, supporting tab switching and parameter configuration.

| Project | Description |
|---------|-------------|
| Type | Singleton |
| Source File | `UniDesk/Singletons/UniDeskSettingsWindow.qml` |
| QML Import | `import UniDesk 1.0` |

## Using the Singleton

```qml
import UniDesk 1.0

// Open settings window
UniDeskSettingsWindow.open()

// Open specific settings tab
UniDeskSettingsWindow.open("appearance")

// Close settings window
UniDeskSettingsWindow.close()
```

## Methods

### `function open(tab: string = "")`
Open the settings window. `tab` is the name of the tab to open (optional); if empty, the last viewed tab is opened.

### `function close()`
Close the settings window.

### `function switchTab(tab: string)`
Switch to the specified settings tab.

### `function isVisible(): bool`
Check if the settings window is currently visible.

## Signals

### `signal opened()`
Triggered when the settings window is opened.

### `signal closed()`
Triggered when the settings window is closed.

### `signal tabChanged(tab: string)`
Triggered when the settings tab is switched.

## Basic Usage

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

UniDeskButton {
    text: "Open Settings"
    onClicked: UniDeskSettingsWindow.open()
}

UniDeskButton {
    text: "Open Shortcut Settings"
    onClicked: UniDeskSettingsWindow.open("shortcuts")
}

Connections {
    target: UniDeskSettingsWindow
    function onOpened() {
        console.log("Settings window opened")
    }
    function onTabChanged(tab) {
        console.log("Switched to tab:", tab)
    }
}
```

## Notes

- This singleton is typically used by the tray menu, shortcuts, or other UI controls to open the settings window.
- Custom tabs can be added through the plugin system.

## Related Singletons

- [UniDeskSettings](/en/controls-reference/singletons/UniDeskSettings.md) - Settings read/write
- [UniDeskGlobals](/en/controls-reference/singletons/UniDeskGlobals.md) - Global state

## Related Documentation

- [UniDeskWindow](/en/controls-reference/UniDeskWindow.md) - Window control
- [Glossary](/en/glossary.md)