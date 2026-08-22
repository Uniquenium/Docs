---
title: UDCFrame
editLink: true
---

# UDCFrame Component

Frame/container component providing a rectangular area with border and background color for visual layout separation on the desktop. UDCFrame itself does not contain child components — it is primarily used for decorative layout partitioning.

| Item | Description |
|------|-------------|
| Component Type | Built-in (UDC) |
| Source File | `UniDesk/Components/UDCFrame/UDCFrame.qml` |
| Inherits | `UniDeskComBase` → `UniDeskComBox` → `UniDeskObject` |

## Properties

### Border
- `property int borderWidth`: Border width in pixels. Default: 1
- `property color borderColor`: Border color. Follows theme by default: black for light, white for dark
- `property int borderRadius`: Border corner radius in pixels. Default: 3

### Background
- `property color backgroundColor`: Background fill color. Follows theme by default: white for light, black for dark

## Example

```qml
// Create a rounded card-like background
// In the component editor, create UDCFrame:
// - width: 400, height: 300
// - borderRadius: 12
// - borderWidth: 1
// - backgroundColor: "#FFFFFF"
// - borderColor: "#E0E0E0"

// Transparent separator frame
// - backgroundColor: "transparent"
// - borderRadius: 8
// - borderWidth: 1
// - borderColor: "#333333"
```

## Property Data Export

```javascript
function propertyDataEx() {
    return {
        borderWidth,
        borderColorR, borderColorG, borderColorB, borderColorA,
        borderRadius,
        bgColorR, bgColorG, bgColorB, bgColorA
    }
}
```

## Notes

- `UDCFrame` is a purely decorative component and cannot nest child components. For container functionality, use `UniDeskComBox` as the parent.
- Background and border colors also support `%{}` expression for dynamic references.

## Related

- [UniDeskComBox](../controls-reference/UniDeskComBox.md) — Generic component container
- [UDCText](./UDCText.md) — Text component to pair with frames
- [UDCImage](./UDCImage.md) — Image component to pair with frames