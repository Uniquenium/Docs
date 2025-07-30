---
title: UniDeskGlobals
editLink: true
---
# UniDeskGlobals 类型
本单项用于存储一些不直接被记录在设置文件中的全局常量

| 控件类型    | 抽象单项                                                           |
| ------- | -------------------------------------------------------------- |
| 源代码文件路径 | `main/UniDeskGlobals.py`                                       |
| 继承      | [QtQuick Item](https://doc.qt.io/qt-6.8/qml-qtquick-item.html) |
## 访问

```qml
UniDeskGlobals.<常量名>
```

## 常量属性

### `property bool isLight`
存储软件当前的颜色状态是否为浅色。
## 方法
### `@Slot(int) def updateIsLight(self,val)`
刷新软件当前的颜色状态
#### 参数
- val: 保留属性，无意义

