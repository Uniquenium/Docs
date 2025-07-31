---
title: UniDeskWindow
editLink: true
---

# UniDeskWindow 类型
基本窗口

| 控件类型    | 元件                                             |
| ------- | ---------------------------------------------- |
| 源代码文件路径 | `UniDesk/UniDeskWindow.qml`                    |
| 继承      | [UniDeskWindowBase](./bases/UniDeskWindowBase) |
## 属性

### `property color tintColor`
控件的色调。默认值为`Qt.rgba(1, 1, 1, 1)`
### `property real tintOpacity`
控件的色调颜色的透明度。默认值为0.65
### `property real luminousity`
效果的亮度。默认值为`0.01`
### `property real noiseOpacity`
控件的色调。默认值为`0.02`
### `property var target`
毛玻璃效果渲染的目标
### `property int blurRadius`
效果的模糊半径。默认值为`32`
### `property rect target`
毛玻璃效果的渲染矩形范围。默认全部覆盖
