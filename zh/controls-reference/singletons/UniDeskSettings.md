---
title: UniDeskData
editLink: true
---
# UniDeskSettings 类型
本单项用于存储一些不直接被记录在设置文件中的全局变量

| 控件类型    | 抽象单项                                                           |
| ------- | -------------------------------------------------------------- |
| 源代码文件路径 | `main/UniDeskData.py`                                          |
| 继承      | [QtQuick Item](https://doc.qt.io/qt-6.8/qml-qtquick-item.html) |
## 访问

```qml
UniDeskSettings.<变量名>
```

## 属性

### `property bool hideTaskbar`
是否隐藏任务栏
当设置文件刚被创建时，默认值为`false`。
### `property int colorMode`
软件的颜色模式
#### 值对应意义

| 值   | 意义   |
| --- | ---- |
| 0   | 浅色模式 |
| 1   | 深色模式 |
| 2   | 跟随系统 |

当设置文件刚被创建时，默认值为2。
### `property color primaryColor`
软件的主题色
当设置文件刚被创建时，默认值为`QColor(0,100,255)`。
### `property string globalFontFamily`
使用全局字体家族名称
当设置文件刚被创建时，默认值为`微软雅黑`。
## 方法
### `@Slot(str) def notify(self, prop)`
使属性对应的更改信号触发一次。
::: tip
本方法在设置值更改但没有应用时调用
:::
#### 参数
- prop: 属性名称

