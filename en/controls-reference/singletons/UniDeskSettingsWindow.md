---
title: UniDeskSettingsWindow
editLink: true
---

# UniDeskSettingsWindow Type

The settings window of Uniquenium, inheriting from `UniDeskWindow`. It organizes settings into tabs (Function, Appearance, Hotkeys, Plugins, About). Registered as a QML singleton (`pragma Singleton`), it still receives the component manager instance through the `comManager` property.

| Control Type | Concrete Item |
|-------------|---------------|
| Source File | `UniDesk/Singletons/UniDeskSettingsWindow.qml` |
| Inherits | [UniDeskWindow](../UniDeskWindow) |
| QML Import | `import UniDesk.Singletons 1.0` |

## Properties

### `property var comManager`
The component manager instance injected by `main.qml`, used to operate on components in the settings window (add/remove/preview components, etc.).

### `property var customWallpaper`
Reference to the custom wallpaper component, used to preview wallpaper effects in the Appearance tab.

### Inherited from `UniDeskWindow`
- `width: 1000`, `height: 700`: Default window size
- `title: qsTr("Settings")`: Window title
- `autoDestroy: false`: Hide instead of destroy on close
- `autoVisible: false`: Do not show on startup

## Tabs

| Tab | Description |
|-----|-------------|
| Function | Auto-start, tray behavior, main panel interaction toggles |
| Appearance | Theme mode, accent color, font, corner radius, Acrylic effect |
| Hotkeys | Global hotkey registration and management |
| Plugins | Installed plugin list, enable/disable, configure, and official plugin entry |
| About | Version info, repository links, acknowledgements, check for updates |

## Methods

### `function open()`
Show the settings window and restore the last viewed tab.

### `function close()`
Hide the settings window (the instance is kept alive because `autoDestroy: false`).

### `function switchTab(index)`
Switch to the tab at the specified index.

### `function isVisible() → bool`
Return whether the settings window is currently visible.

## Example

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0
import UniDesk.Singletons 1.0

UniDeskButton {
    text: "Open Settings"
    onClicked: UniDeskSettingsWindow.open()
}
```

## Notes

- `UniDeskSettingsWindow` inherits all capabilities of `UniDeskWindow`, including frameless rendering, Acrylic blur, auto-centering, and the info bar.
- Since it is registered with `pragma Singleton`, it can be accessed directly by type name (e.g. `UniDeskSettingsWindow.open()`), but the `comManager` property must still be injected externally.
- Each tab's implementation lives under `UniDesk/Singletons/SettingsViews/` (`AboutView.qml`, `AppearanceView.qml`, `FunctionView.qml`, `HotkeysView.qml`, `PluginsView.qml`).

## Related

- [UniDeskWindow](../UniDeskWindow.md) — Base window control
- [UniDeskComManager](../singletons/UniDeskComManager.md) — Component manager accessed via the `comManager` property
- [Official Plugins](../../official-plugins.md) — Official plugins entry in the Plugins tab