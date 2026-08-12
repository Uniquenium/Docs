---
title: UniDeskTools
editLink: true
---

# UniDeskTools Singleton

Tool functions singleton, providing various utility functions including color conversion, wallpaper operations, font management, UUID generation, and more.

| Project | Description |
|---------|-------------|
| Type | Singleton |
| Source File | `UniDesk/Singletons/UniDeskTools.qml` |
| QML Import | `import UniDesk 1.0` |

## Using the Singleton

```qml
import UniDesk 1.0

// Call tool functions
var uuid = UniDeskTools.createUuid()
var isDark = UniDeskTools.isColorDark(someColor)
var webOpen = UniDeskTools.web_browse("https://github.com")
```

## Methods

### `function createUuid(): string`
Generate a new UUID (version 4), returning a unique identifier string.

### `function isColorDark(color: color): bool`
Determine whether a color is a "dark" color, returning `true` if so.

### `function switchColor(normal: color, hover: color, press: color, disabled: color, hovered: bool, pressed: bool, disabled: bool): color`
Based on the control's state (hover, press, disabled), return the corresponding color.

### `function getModuleVersionMajor(): int`
Get the major version number of the current module.

### `function getModuleVersionMinor(): int`
Get the minor version number of the current module.

### `function getModuleVersionPatch(): int`
Get the patch version number of the current module.

### `function web_browse(url: string): bool`
Open a URL in the default browser.

### `function set_wallpaper(path: string): bool`
Set the desktop wallpaper. Returns `true` if successful.

### `function get_wallpaper(): string`
Get the current desktop wallpaper path.

### `function add_font(fontPath: string): bool`
Add a font from the specified path to the system.

### `function remove_font(fontPath: string): bool`
Remove the font added from the specified path from the system.

## Basic Usage

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

Button {
    text: "Set Wallpaper"
    onClicked: {
        var path = "C:/images/wallpaper.jpg"
        var success = UniDeskTools.set_wallpaper(path)
        console.log("Wallpaper set:", success ? "Success" : "Failed")
    }
}

Text {
    text: "Current Wallpaper: " + UniDeskTools.get_wallpaper()
}
```

## Related Singletons

- [UniDeskGlobals](/en/controls-reference/singletons/UniDeskGlobals.md) - Global state
- [UniDeskSettings](/en/controls-reference/singletons/UniDeskSettings.md) - Settings
- [UniDeskTextStyle](/en/controls-reference/singletons/UniDeskTextStyle.md) - Font preset

## Related Documentation

- [UniDesk Control Library Overview](/en/controls-reference/overview.md)
- [Glossary](/en/glossary.md)