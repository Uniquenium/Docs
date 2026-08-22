---
title: UDCImage
editLink: true
---

# UDCImage Component

Image display component supporting image/animated image rendering, rounded corner clipping, and optional button actions (open application, open webpage, execute command). Commonly used for desktop decorations and quick shortcuts.

| Item | Description |
|------|-------------|
| Component Type | Built-in (UDC) |
| Source File | `UniDesk/Components/UDCImage/UDCImage.qml` |
| Inherits | `UniDeskComBase` → `UniDeskComBox` → `UniDeskObject` |

## Properties

### Image Source
- `property string imagePath`: Image file path. Shows default logo when empty. Supports local file paths and `qrc:/` resource paths

### Display
- `property int fillMode`: Fill mode (matches `Image.fillMode`). Default: `Image.Stretch`
- `property bool smooth`: Enable smooth scaling. Default: `true`
- `property bool mipmap`: Enable mipmap. Default: `false`

### Appearance
- `property int radius`: Corner radius in pixels. 0 for sharp corners. Default: 0

### Button Behavior
- `property bool isButton`: Enable button behavior. Shows visual feedback on hover/press. Default: `false`
- `property int buttonActionType`: Button action type. Default: `UniDeskButtonActionType.ButtonActionApp`
  - `ButtonActionApp` (0): Open application
  - `ButtonActionWeb` (1): Open webpage
  - `ButtonActionCommand` (2): Execute command
- `property string buttonActionTarget`: Action target (app path / URL / command). Default: empty string

## Button Actions

When `isButton` is `true` and the user clicks the component, the corresponding action is executed based on `buttonActionType`:

| Type | Behavior | Implementation |
|------|----------|---------------|
| `ButtonActionApp` | Open application | `UniDeskTools.openFileOrDir(target)` |
| `ButtonActionWeb` | Open webpage | `UniDeskTools.web_browse(target)` |
| `ButtonActionCommand` | Execute system command | `UniDeskTools.systemCommand(target)` |

## Visual Feedback

When `isButton` is enabled:
- On hover: 20% black overlay
- On press: 30% black overlay
- Rounded corner clipping via `OpacityMask`, linked with `radius`

## Example

```qml
// Set image as shortcut button
// In the component editor, create UDCImage:
// - imagePath: "file:///C:/Icons/github.png"
// - isButton: true
// - buttonActionType: ButtonActionWeb
// - buttonActionTarget: "https://github.com"

// Desktop decoration image
// - imagePath: "file:///C:/Wallpapers/decor.png"
// - radius: 16
// - isButton: false
```

## Property Data Export

```javascript
function propertyDataEx() {
    return {
        imagePath, fillMode, smooth, mipmap, radius,
        isButton, buttonActionType, buttonActionTarget
    }
}
```

## Related

- [UniDeskTools](../controls-reference/cpp-ext/UniDeskTools.md) — `openFileOrDir`, `web_browse`, `systemCommand`
- [UniDeskButton](../controls-reference/UniDeskButton.md) — Regular button control