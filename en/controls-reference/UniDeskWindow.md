---
title: UniDeskWindow
editLink: true
---

# UniDeskWindow Type
Basic window

| Control Type | Visual Control |
|-------------|----------------|
| Source File | `UniDesk/Controls/UniDeskWindow.qml` |
| Inherits | QtQuick Window |

## Properties

### `property string minimizeText`
Minimize tooltip text.

### `property string restoreText`
Restore tooltip text.

### `property string maximizeText`
Maximize tooltip text.

### `property string closeText`
Close tooltip text.

### `property url windowIcon`
Window icon.

### `property bool fixSize`
Whether to fix the window size. Default is `false`.

### `property bool isRestore`
Whether to restore (instead of maximize) the next time the window maximize button is clicked.

### `property var windowVisibility`
Equivalent to the window's `visibility` property.

### `property Item appBar`
Get the window's title bar.

### `property bool showClose`
Whether to show the close button. Default is `true`.

### `property bool showMinimize`
Whether to show the minimize button. Default is `true`.

### `property bool showMaximize`
Whether to show the maximize/restore button. Default is `true`.

### `property bool autoMaximize`
Whether to automatically maximize when the window is created. Default is `false`.

### `property bool autoCenter`
Whether to automatically center on the screen when the window is created. Default is `true`.

## Methods

### `function moveWindowToDesktopCenter()`
Move the window to the center of the screen.

### `function containerItem()`
Get the window's container element.