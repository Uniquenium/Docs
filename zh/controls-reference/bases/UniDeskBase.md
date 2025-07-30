---
title: UniDeskBase
editLink: true
---
# UniDeskBase 类型

UniDeskBase 是一个无边框无任务栏图标透明窗口，用于让元件直接显示在系统桌面上。

| 控件类型    | 基                                                                  |
| ------- | ------------------------------------------------------------------ |
| 源代码文件路径 | `main/UniDeskBases.py`                                             |
| 继承      | [QtQuick Window](https://doc.qt.io/qt-6.8/qml-qtquick-window.html) |

## 使用的WindowFlags

```python
self.setFlag(Qt.WindowType.FramelessWindowHint,True)
self.setFlag(Qt.WindowType.WindowStaysOnBottomHint,True)
self.setFlag(Qt.WindowType.Tool,True)
```
## 信号

### `focusOut`
该信号在本控件失去焦点时触发
::: info
使用的事件名是`onFocusOut`。
:::





