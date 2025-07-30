---
title: UniDeskTextStyle
editLink: true
---
# UniDeskTextStyle 类型
本单项存储了软件中各种字体大小。

| 控件类型    | 抽象单项                                                           |
| ------- | -------------------------------------------------------------- |
| 源代码文件路径 | `main/UniDeskTextStyle.py`                                     |
| 继承      | [QtQuick Item](https://doc.qt.io/qt-6.8/qml-qtquick-item.html) |
## 属性

### `property QFont tiny`
字号12

### `property QFont little`
字号13

### `property QFont littleStrong`
字号13， 加粗

### `property QFont small`
字号20，加粗

### `property QFont medium`
字号28，加粗

### `property QFont large`
字号40，加粗

### `property QFont huge`
字号68，加粗
## 方法 
### `@Slot(str) def changeFontFamily(self,name)`
改变界面字体家族
### 参数
- name: 字体家族名称



