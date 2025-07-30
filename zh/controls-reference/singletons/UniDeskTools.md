---
title: UniDeskTools
editLink: true
---
# UniDeskTools 类型
本单项提供了一些工具

| 控件类型    | 抽象单项                                                           |
| ------- | -------------------------------------------------------------- |
| 源代码文件路径 | `main/UniDeskTools.py`                                         |
| 继承      | [QtQuick Item](https://doc.qt.io/qt-6.8/qml-qtquick-item.html) |
## 方法
### `@Slot(QColor,QColor,QColor,QColor,bool,bool,bool,result=QColor) def switchColor(self,normal,hover,press,disable,hovered,pressed,disabled):`
根据不同条件切换颜色
#### 参数
- normal：正常情况下的颜色
- hover： 鼠标悬停时的颜色
- press： 鼠标点击时的颜色
- disable： 控件不可用的颜色
- hovered： 鼠标是否悬停
- pressed： 鼠标是否点击
- disabled： 控件是否不可用
#### 返回值
`QColor`
根据条件判断出的颜色
### `@Slot(str) def systemCommand(self,command)`
使用系统命令
#### 参数
- command： 命令内容
### `@Slot(str,int,result=QFont) def font(self,family,size)`
给定字体家族和字号，返回类型为`QFont`的字体
#### 参数
- family: 字体家族
- size： 字号
#### 返回值
`QFont`
返回的字体

### `@Slot(result=bool) def isSystemColorLight(self)`
获取当前系统的颜色模式是否为浅色
#### 返回值
`bool`
系统颜色模式是否为浅色

### `@Slot(str) def web_browse(self,url)`
用系统浏览器打开网页链接
#### 参数
- url： 网页链接
### `@Slot(bool) def setTaskbarVisible(self,vis)`
设置系统任务栏是否可见。
#### 参数
- vis： 是否可见
### `@Slot(result=QUrl) def get_wallpaper(self)`
获取系统桌面背景的文件路径。
#### 返回值
`QUrl`
系统背景文件路径
### `@Slot(QQuickWindow,result=QRect) def desktopGeometry(self,window: QQuickWindow)`
获取系统桌面尺寸
#### 返回值
`QRect`
系统桌面尺寸
### `@Slot(QUrl) def set_wallpaper(self,path: QUrl)`
设置系统桌面背景。
#### 参数
- path: 新桌面背景的文件路径
### `@Slot(str,result=QUrl) def fromLocalFile(self,path)`
同`QUrl.fromLocalFile(path)`。
### `@Slot(result=list) def systemFontFamilies(self)`
同 `QFontDatabase.families()`。
### `@Slot(str,result=int) def fontIndex(self,familyName)`
返回`familyName`在`QFontDatabase.families()`中的索引。
#### 参数
- familyName: 字体家族名称

