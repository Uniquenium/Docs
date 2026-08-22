---
title: UniDeskTools
editLink: true
---

# UniDeskTools Type

General utility singleton based on a C++ backend. Provides color-state switching, system commands, font management, wallpaper read/write, UUID generation, auto-start, path conversion, and other common helpers. No instantiation needed — access directly by name in QML.

| Item | Description |
|------|-------------|
| Control Type | Global Singleton |
| Source File | `UniDesk/CppExt/UniDeskTools.h` / `.cpp` |
| Inherits | QQuickItem |
| QML Import | `import UniDesk 1.0` |

## Properties

### `property QList<QString> familyPaths`
List of loaded custom font file paths.

### `property QList<int> appFonts`
List of registered application font IDs (internal use).

## Methods

### Color & State

#### `switchColor(normal, hover, press, disable, hovered, pressed, disabled) → QColor`
Selects the correct color based on control state. All UniDesk button controls use this internally.

```qml
color: UniDeskTools.switchColor(
    "#F0F0F0", "#E0E0E0", "#D0D0D0", "#F8F8F8",
    hovered, pressed, disabled
)
```

### System

#### `systemCommand(command)`
Executes a system command (via cmd on Windows).

#### `web_browse(url)`
Opens the specified URL in the system default browser.

#### `setTaskbarVisible(vis)`
Shows or hides the Windows taskbar.

#### `isSystemColorLight() → bool`
Performs an immediate, uncached detection of the system theme.

### Wallpaper

#### `get_system_wallpaper() → QUrl`
Returns the current system desktop wallpaper file path.

#### `set_system_wallpaper(path)`
Sets the specified image as the system desktop wallpaper.

#### `desktopGeometry(window) → QRect`
Returns the available desktop area for the screen containing the given window (excluding taskbar).

### Fonts

#### `font(family, size) → QFont`
Creates a `QFont` from family name and size.

#### `applicationFontFamilies() → QVariant`
Returns the list of all installed font families.

#### `fontIndex(familyName) → int`
Returns the index of a font family, or `-1` if not found.

#### `addFontFamily(path)`
Dynamically loads a TTF/OTF font file into the application.

#### `removeFontFamily(id)`
Unloads a previously loaded font.

#### `getCustomFonts() → QVariant`
Returns information about all dynamically loaded custom fonts.

### Path & File

#### `fromLocalFile(path) → QUrl`
Converts a local disk path to a `file:///` URL.

#### `isValidUrl(url) → bool`
Checks whether a URL is valid.

#### `localFileExists(url) → bool`
Checks whether a local file exists.

#### `openFileOrDir(path)`
Opens a file or directory with the system default program.

#### `showFileInExplorer(path)`
Opens the file's directory in Explorer and selects the file.

### Misc

#### `getCursorPosition() → QPoint`
Returns the global mouse cursor position in screen coordinates.

#### `createUuid() → QString`
Generates an RFC 4122-compliant UUID string.

#### `getModuleVersionMajor() → QString`
Returns the UniDesk major version number.

#### `getModuleVersionMinor() → QString`
Returns the UniDesk minor version number.

#### `getModuleVersionPatch() → QString`
Returns the UniDesk patch version number.

### Auto-Start

#### `isAppAutoStartEnabled() → bool`
Checks whether the application is in the Windows auto-start list.

#### `setAppAutoStart(enabled)`
Adds or removes the application from auto-start (registry-based).

## Signals

### `customFontsChanged()`
Emitted when the custom font list is modified via `addFontFamily` / `removeFontFamily`.

## Example

```qml
import UniDesk 1.0

// Open GitHub
UniDeskTools.web_browse("https://github.com/Uniquenium/Uniquenium")

// Set wallpaper
UniDeskTools.set_system_wallpaper(
    UniDeskTools.fromLocalFile("C:/Wallpapers/Aurora.jpg")
)

// Generate a component ID
var newId = "com_" + UniDeskTools.createUuid()
```

## Related

- [UniDeskGlobals](./UniDeskGlobals.md) — Global theme state
- [UniDeskSettings](./UniDeskSettings.md) — `primaryColor` theme color
- [UniDeskTextStyle](./UniDeskTextStyle.md) — Global font styles