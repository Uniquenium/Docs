---
title: UniDeskMenuSeparator
editLink: true
---

# UniDeskMenuSeparator Type
Menu separator

| Control Type | Visual Control |
|-------------|----------------|
| Source File | `UniDesk/Controls/UniDeskMenuSeparator.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

## Introduction

UniDeskMenuSeparator is a visual separator line within a [UniDeskMenu](./UniDeskMenu.md), used to divide different function groups.

## Properties

This control has no custom properties.

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskMenu {
    // ...
    UniDeskMenuItem {
        text: "Cut"
    }

    UniDeskMenuSeparator { }

    UniDeskMenuItem {
        text: "Paste"
    }
}
```

## Related Controls

- [UniDeskMenu](/en/controls-reference/UniDeskMenu.md) - Menu container
- [UniDeskMenuItem](/en/controls-reference/UniDeskMenuItem.md) - Menu item

## Related Documentation

- [UniDeskInfoBar](/en/controls-reference/UniDeskInfoBar.md) - Info bar
- [Glossary](/en/glossary.md)