---
title: UniDeskMenu
editLink: true
---

# UniDeskMenu Type
Menu control

| Control Type | Visual Control |
|-------------|----------------|
| Source File | `UniDesk/Controls/UniDeskMenu.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

## Introduction

UniDeskMenu is a pop-up menu control in the UniDesk library, typically used to provide contextual operations (right-click menus, dropdown menus). When combined with [UniDeskMenuItem](./UniDeskMenuItem.md) and [UniDeskMenuSeparator](./UniDeskMenuSeparator.md), a complete menu structure can be formed.

## Properties

### `property Item parentControl`
The parent control of the menu. When the parent control is clicked, the menu will show.

### `property var menuContent`
Menu content, typically a list of controls.

## Methods

### `function open()`
Show the menu.

### `function close()`
Close the menu.

### `function toggle()`
Toggle the menu open/close state.

## Signals

### `signal opened()`
Triggered when the menu is opened.

### `signal closed()`
Triggered when the menu is closed.

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskButton {
    id: myBtn
    text: "Options"
    onClicked: menu.open()
}

UniDeskMenu {
    id: menu
    parentControl: myBtn

    UniDeskMenuItem {
        text: "Option 1"
        onClicked: console.log("Option 1 clicked")
    }

    UniDeskMenuSeparator { }

    UniDeskMenuItem {
        text: "Option 2"
        onClicked: console.log("Option 2 clicked")
    }
}
```

## Related Controls

- [UniDeskMenuItem](/en/controls-reference/UniDeskMenuItem.md) - Menu item
- [UniDeskMenuSeparator](/en/controls-reference/UniDeskMenuSeparator.md) - Menu separator

## Related Documentation

- [UniDeskToolButton](/en/controls-reference/UniDeskButton.md) - Button control
- [Glossary](/en/glossary.md) - Control vs. Component