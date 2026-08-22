---
title: Official Plugins
editLink: true
---

# Official Plugins

The Uniquenium official plugin pack provides a set of commonly used component extensions covering system monitoring, network info, weather, calendar, and more. Installing official plugins gives your desktop a rich set of out-of-the-box components immediately.

## Plugin List

The official plugin pack (`Uniquenium-Official-Plugins`) typically includes:

| Plugin | Components | Description |
|--------|-----------|-------------|
| **SystemMonitor** | CPUMonitor, MemoryMonitor, NetMonitor, BatteryMonitor | Real-time system monitoring |
| **Weather** | WeatherCard, WeatherForecast | Weather display (API key required) |
| **Calendar** | CalendarCard, ClockCard | Calendar and clock components |
| **Media** | MediaPlayer, VolumeControl | Media playback and volume control |
| **QuickNote** | NotePad, TodoList | Notes and todo list |

> The plugin list may change between versions. Refer to the official repository for the latest list.

## Installation

### Option 1: Using the installer (recommended)

1. Download `Uniquenium-Plugins-Setup-*.exe` from the releases page
2. Run the installer and select the Uniquenium installation directory
3. After installation, plugins are automatically placed in the `plugins/` directory
4. Launch Uniquenium and check installed plugins under **Settings → Plugins**

### Option 2: Manual installation

1. Download the latest release from the [Official Plugins repository](https://github.com/Uniquenium/Official-Plugins)
2. Extract the DLL files into subfolders under `<Uniquenium install dir>/plugins/`
3. Launch Uniquenium; plugins are auto-scanned and loaded

```
Uniquenium/
├── Uniquenium.exe
├── plugins/
│   ├── SystemMonitor/
│   │   └── SystemMonitor.dll
│   ├── Weather/
│   │   └── Weather.dll
│   └── Calendar/
│       └── Calendar.dll
```

### Option 3: In-app installation

1. Open Uniquenium Settings
2. Go to the **Plugins** tab
3. Click **Install from local** to select a downloaded plugin pack
4. Or click **Check for updates** to fetch the latest plugins from the remote repository

## Configuring Plugins

Some plugins require additional configuration. Taking the Weather plugin as an example:

1. Open the component editor and drag a `WeatherCard` from the plugin category
2. Right-click the component → **Properties** → fill in the API key and city
3. Or configure it globally under the **Plugins** tab in Settings

## Uninstalling Plugins

1. Open **Settings → Plugins**
2. Find the plugin to remove
3. Click the **Uninstall** button
4. Or directly delete the corresponding subfolder under `plugins/`

## Developing Plugins

If you want to develop your own plugins, refer to the [Plugin Development Guide](/en/custom-developing/plugin.md) and [UniDeskPluginInterface](/en/controls-reference/cpp-ext/UniDeskPluginInterface.md).

## Notes

- The official plugins must match the major version of the Uniquenium main program.
- A plugin that fails to load at runtime does not affect the stability of the main program; the system skips the failed plugin and continues loading others.
- Install third-party plugins only from trusted sources.