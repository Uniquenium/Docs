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

### `property string minimizeText`
最小化提示文字。
### `property string restoreText`
还原提示文字。
### `property string maximizeText`
最大化提示文字。
### `property string closeText`
关闭提示文字
### `property url windowIcon`
窗口的图标。
### `property bool fixSize`
是否固定窗口的大小不变。 默认值为`false`。
### `property bool isRestore`
下次点击窗口最大化按钮时是否还原（如果不是则最大化）
### `property var windowVisibility`
相当于窗口的`visibility`属性。
### `property Item appBar`
获取窗口的标题栏。
### `property bool showClose`
是否显示关闭按钮。默认为`true`。
### `property bool showMinimize`
是否显示最小化按钮。默认为`true`。
### `property bool showMaximize`
是否显示最大化/还原按钮。默认为`true`。
### `property bool autoMaximize`
是否在窗口创建时自动最大化。默认为`false`。
### `property bool autoCenter`
是否在窗口创建时自动移到屏幕正中央。默认为`true`。
## 方法
### `function moveWindowToDesktopCenter()`
将窗口移动到屏幕正中央。
### `function containerItem()`
获取窗口的容器元素。