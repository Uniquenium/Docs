---
title: UniDeskGlobals
editLink: true
---

# UniDeskGlobals 类型

本单例负责全局状态管理，包括主题模式、应用生命周期事件、国际化翻译等功能。**无需实例化**，在 QML 中直接通过名字访问。

| 项目 | 说明 |
|------|------|
| 控件类型 | 全局单例（Singleton） |
| 源代码文件路径 | `UniDesk/CppExt/UniDeskGlobals.h` / `.cpp` |
| 继承 | [QtQuick Item](https://doc.qt.io/qt-6.8/qml-qtquick-item.html) |
| QML 导入方式 | `import UniDesk 1.0` |

---

## 属性

### `property bool isLight`

当前系统/应用是否为**浅色主题**。

- `true` → 浅色模式（Light）
- `false` → 深色模式（Dark）

该属性会自动随系统主题切换而变化（darkdetect 检测）。当主题变化时会触发 `isLightChanged()` 信号。

::: tip 颜色适配
所有自定义 UI 控件在设置颜色时，都应该基于该属性动态判断：

```qml
color: UniDeskGlobals.isLight ? "black" : "white"
```
:::

---

## 方法

### `updateIsLight()`

```cpp
Q_INVOKABLE void updateIsLight();
```

**立即刷新**当前主题状态 `isLight`。一般无需手动调用，系统主题变化时会自动更新。适用于：
- 程序刚启动时强制同步一次
- 系统通知丢失时手动刷新

```qml
Component.onCompleted: {
    UniDeskGlobals.updateIsLight();
    console.log("主题已同步:", UniDeskGlobals.isLight ? "浅色" : "深色");
}
```

---

### `emitApplicationQuit()`

```cpp
Q_INVOKABLE void emitApplicationQuit();
```

手动广播「**应用即将退出**」全局事件。调用后所有监听该信号的窗口都会收到通知并执行关闭逻辑。

通常不需要手动调用，关闭程序时 Uniquenium 主程序会自动调用。

---

### `startThread()`

```cpp
Q_INVOKABLE void startThread();
```

启动全局后台工作线程（用于主题监听、组件轮询等周期性任务）。

---

### `startListener()`

```cpp
Q_INVOKABLE void startListener();
```

启动系统事件监听器，包括：
- 系统主题变化监听（通过 darkdetect 轮询）
- 全局热键注册后的消息分发
- 壁纸变更通知

---

### `translate(QObject* object, QString locale)`

```cpp
Q_INVOKABLE void translate(QObject* object, QString locale);
```

将指定对象的 UI 文本切换为目标语言。

**参数**：
- `object`：要翻译的 QML 对象（通常传页面根节点）
- `locale`：语言代码，如 `"zh_CN"`、`"en_US"`

```qml
// 切换为英文界面
UniDeskGlobals.translate(myPageItem, "en_US");
```

---

## 信号

### `isLightChanged(bool isLight)`

主题模式变化时触发。新的 `isLight` 值作为参数传递。

```qml
import UniDesk 1.0

Connections {
    target: UniDeskGlobals
    function onIsLightChanged(isLight) {
        console.log("主题已切换为：", isLight ? "浅色模式" : "深色模式")
        // 自定义控件可以在这里执行额外的刷新逻辑
    }
}
```

---

### `applicationQuit()`

应用即将退出时触发。所有窗口和组件应监听此信号并保存状态、释放资源。

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

UniDeskWindow {
    Connections {
        target: UniDeskGlobals
        function onApplicationQuit() {
            console.log("程序关闭前保存页面数据")
            saveMyPageData()
        }
    }
}
```

---

## 使用示例

### 示例 1：深浅色背景色切换

```qml
import QtQuick 2.15
import UniDesk 1.0

Rectangle {
    id: myCard
    width: 300
    height: 180
    radius: 10
    
    color: UniDeskGlobals.isLight
        ? Qt.rgba(248/255, 249/255, 250/255, 1)   // 浅灰
        : Qt.rgba(30/255,  30/255,  32/255,  1)   // 深灰
    
    border.color: UniDeskGlobals.isLight
        ? Qt.rgba(0, 0, 0, 0.08)
        : Qt.rgba(1, 1, 1, 0.08)
    border.width: 1
}
```

### 示例 2：监听应用退出保存数据

```qml
import UniDesk 1.0

Item {
    Component.onCompleted: loadData()
    
    Connections {
        target: UniDeskGlobals
        function onApplicationQuit() {
            // 保存到 LocalStorage
            var db = LocalStorage.openDatabaseSync("myData", "1.0", "", 100000)
            db.transaction(function(tx) {
                tx.executeSql(
                    'INSERT OR REPLACE INTO cache VALUES (?, ?)',
                    ["lastContent", textArea.text]
                )
            })
        }
    }
}
```

### 示例 3：主题色 + 主题模式联动

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

UniDeskButton {
    id: accentBtn
    contentText: "强调按钮"
    radius: 6
    
    bgNormalColor: UniDeskSettings.primaryColor
    textNormalColor: UniDeskGlobals.isLight
        ? "white"
        : Qt.rgba(0, 0, 0, 0.87)
}
```

---

## 相关文档

- [UniDeskSettings](/controls-reference/singletons/UniDeskSettings.md)：读取/写入设置（含主题色 `primaryColor`）
- [UniDeskTools](/controls-reference/singletons/UniDeskTools.md)：颜色切换、壁纸操作等工具函数
- [UniDeskTextStyle](/controls-reference/singletons/UniDeskTextStyle.md)：预设字体样式
