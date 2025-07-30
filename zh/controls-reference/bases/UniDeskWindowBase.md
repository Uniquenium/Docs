---
title: UniDeskWindowBase
editLink: true
---
# UniDeskWindowBase 类型

UniDeskWindowBase 是一个无边框窗口，是[UniDeskWindow](../UniDeskWindow)的基控件。

| 控件类型    | 基                                                                  |
| ------- | ------------------------------------------------------------------ |
| 源代码文件路径 | `main/UniDeskBases.py`                                             |
| 继承      | [QtQuick Window](https://doc.qt.io/qt-6.8/qml-qtquick-window.html) |
## 使用的WindowFlags
```python
self.setFlag(Qt.WindowType.FramelessWindowHint,True)
self.setFlag(Qt.WindowType.Window,True)
self.setFlag(Qt.WindowType.WindowMinimizeButtonHint,True)
self.setFlag(Qt.WindowType.CustomizeWindowHint,True)
```
## 信号

### `focusOut`
该信号在本控件失去焦点时触发
::: info
使用的事件名是`onFocusOut`。
:::

