---
title: UniDeskMenuItem
editLink: true
---

# UniDeskMenuItem Type
Menu item

| Control Type | Visual Control |
|-------------|----------------|
| Source File | `UniDesk/Controls/UniDeskMenuItem.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

## Introduction

UniDeskMenuItem is a single clickable item within a [UniDeskMenu](./UniDeskMenu.md), used to display text and icons, and to trigger corresponding actions on click.

## Properties

### `property string text`
Display text of the menu item.

### `property string iconSource`
Icon source path.

### `property bool checkable`
Whether the item is checkable (can be selected).

### `property bool checked`
Current selected state.

### `property bool enabled`
Whether the item is enabled.

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskMenuItem {
    text: "Copy"
    iconSource: "qrc:/icon/copy.svg"
    onClicked: console.log("Copy command executed")
}
```

## Related Controls

- [UniDeskMenu](/en/controls-reference/UniDeskMenu.md) - Menu container
- [UniDeskMenuSeparator](/en/controls-reference/UniDeskMenuSeparator.md) - Separator

## Related Documentation

- [UniDeskButton](/en/controls-reference/UniDeskButton.md) - Button control
- [Glossary](/en/glossary.md)