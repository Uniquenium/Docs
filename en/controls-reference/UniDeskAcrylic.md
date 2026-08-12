---
title: UniDeskAcrylic
editLink: true
---

# UniDeskAcrylic Type
Acrylic blur effect control

| Control Type | Element |
|-------------|---------|
| Source File | `UniDesk/UniDeskAcrylic.qml` |
| Inherits | [QtQuick Item](https://doc.qt.io/qt-6.8/qml-qtquick-item.html) |

## Properties

### `property color tintColor`
Control's tint color. Default is `Qt.rgba(1, 1, 1, 1)`.

### `property real tintOpacity`
Opacity of the tint color. Default is `0.65`.

### `property real luminousity`
Brightness of the effect. Default is `0.01`.

### `property real noiseOpacity`
Noise opacity. Default is `0.02`.

### `property var target`
Target for the acrylic blur effect rendering.

### `property int blurRadius`
Blur radius of the effect. Default is `32`.

### `property rect target`
Rendering rect range for the acrylic blur effect. Default covers the entire area.