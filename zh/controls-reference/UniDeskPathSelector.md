---
title: UniDeskPathSelector
editLink: true
---
# UniDeskPathSelector 类型
路径选择器

| 控件类型    | 元件                                                             |
| ------- | -------------------------------------------------------------- |
| 源代码文件路径 | `UniDesk/UniDeskPathSelector.qml`                              |
| 继承      | [QtQuick Item](https://doc.qt.io/qt-6.8/qml-qtquick-item.html) |
## 属性
### `property url path`
当前选择的路径
### `property int mode: 0`

浏览是打开文件还是打开文件夹

| 值   | 意义    |
| --- | ----- |
| 0   | 打开文件  |
| 1   | 打开文件夹 |

## 信号
### `signal submit`
该信号在用户选择了路径时触发