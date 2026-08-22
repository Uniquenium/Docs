---
title: UniDeskImage
editLink: true
---

# UniDeskImage Type

Image display control based on QtQuick `AnimatedImage`. Supports loading local, network, and QRC resource images, with a built-in fade transition animation on image changes.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskImage.qml` |
| Inherits | QtQuick AnimatedImage |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `animationEnabled` | `bool` | `true` | Enable transition animation |
| `animationDuration` | `int` | `300` | Animation duration in milliseconds |

## Behavior

- Auto-plays when image is loaded (`playing = status === Image.Ready`)
- Fade-out transition on `source` change: old image fades out, new image fades in
- Hidden when no `source` (`opacity: source.toString() !== "" ? 1 : 0`)
- Inherits all `AnimatedImage` properties (e.g. `fillMode`, `source`)

## Example

```qml
import UniDesk.Controls 1.0

UniDeskImage {
    width: 200
    height: 200
    source: "qrc:/images/logo.png"
    fillMode: Image.PreserveAspectCrop
    animationDuration: 500
}
```

## Related

- [UniDeskIcon](./UniDeskIcon.md) — Icon control
- [UniDeskFrame](./UniDeskFrame.md) — Container control