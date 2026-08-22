---
title: UniDeskAcrylic
editLink: true
---

# UniDeskAcrylic Type

Acrylic blur effect control. Implements a Windows-style acrylic translucent effect by blurring a target area with `FastBlur`, layered with color tint, luminosity, and noise texture.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskAcrylic.qml` |
| Inherits | QtQuick Item |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tintColor` | `color` | `Qt.rgba(1, 1, 1, 1)` | Tint color |
| `tintOpacity` | `real` | `0.65` | Tint opacity |
| `luminosity` | `real` | `0.01` | Brightness overlay |
| `noiseOpacity` | `real` | `0.02` | Noise texture opacity |
| `target` | `var` | — | Target Item for acrylic rendering |
| `blurRadius` | `int` | `32` | Blur radius |
| `targetRect` | `rect` | Item bounds | Render rect range |
| `cornerRadius` | `int` | `5` | Corner radius |

## Implementation

1. Uses `ShaderEffectSource` to capture the target area
2. Applies `FastBlur` for Gaussian blur
3. Overlays luminosity, tint, and noise layers

## Example

```qml
import UniDesk 1.0

UniDeskAcrylic {
    anchors.fill: parent
    target: parent
    blurRadius: 32
    cornerRadius: 8
    tintColor: UniDeskGlobals.isLight ? Qt.rgba(1,1,1,1) : Qt.rgba(0,0,0,1)
    tintOpacity: 0.65
    luminosity: 0.01
    noiseOpacity: 0.02
}
```

## Related

- [UniDeskWindow](./UniDeskWindow.md) — Window using acrylic effects
- [UniDeskFrame](./UniDeskFrame.md) — Frame container