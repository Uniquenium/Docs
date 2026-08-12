---
title: UniDeskObject
editLink: true
---

# UniDeskObject Type

Base object control in the UniDesk system, providing the base properties and behaviors for all UniDesk visual objects.

| Project | Description |
|---------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskObject.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

## Properties

### `property string identification`
Unique identifier for the object.

### `property string typeName`
Type name of the object.

### `property bool visible`
Whether the object is visible.

### `property double opacity`
Object opacity, ranging from 0.0 (fully transparent) to 1.0 (fully opaque).

### `property int z`
Z-order stacking level.

### `property double x`
X coordinate of the object.

### `property double y`
Y coordinate of the object.

### `property double width`
Object width.

### `property double height`
Object height.

## Basic Usage

```qml
import UniDesk.Controls 1.0

UniDeskObject {
    id: myObj
    x: 100
    y: 100
    width: 200
    height: 100
    opacity: 0.8

    onVisibleChanged: {
        console.log("Object visibility changed:", visible)
    }
}
```

## Notes

- This is the lowest-level base control in the UniDesk system, and all other controls ultimately inherit from it.
- Developers typically do not need to use this control directly and should use more specific controls like [UniDeskText](/en/controls-reference/UniDeskText.md), [UniDeskButton](/en/controls-reference/UniDeskButton.md), etc.

## Related Documentation

- [UniDeskText](/en/controls-reference/UniDeskText.md) - Text control
- [UniDeskButton](/en/controls-reference/UniDeskButton.md) - Button control
- [Glossary](/en/glossary.md)