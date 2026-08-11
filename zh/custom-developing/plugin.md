---
title: 插件开发指南
layout: doc
editLink: true
---

# 插件开发指南

Uniquenium 提供了灵活的插件系统，允许开发者扩展新的组件类型、添加自定义功能、甚至修改核心行为。本指南将带你从零开始开发你的第一个插件。

## 插件系统架构

Uniquenium 的插件基于 Qt 插件机制 + QML 动态加载，支持两种插件类型：

| 类型 | 语言 | 能力 | 适用场景 |
|------|------|------|---------|
| **QML 插件** | QML + JavaScript | 新增 UI 组件、页面逻辑 | 开发自定义组件（推荐新手） |
| **C++ 插件** | C++ (Qt) | 高性能逻辑、系统 API 调用 | 复杂计算、硬件交互 |

### 插件接口 (C++)

所有插件必须实现 `UniDeskPluginInterface` 接口：

```cpp
// UniDeskPluginInterface.h (核心接口)
class UniDeskPluginInterface {
public:
    virtual ~UniDeskPluginInterface() = default;
    
    // 注册 QML 类型到引擎（可注册新组件）
    virtual void registerQmlTypes(QQmlApplicationEngine *engine) = 0;
    
    // 插件初始化逻辑
    virtual void initialize() = 0;
};

#define UniDeskPluginInterface_iid "com.unidesk.plugin.PluginInterface"
Q_DECLARE_INTERFACE(UniDeskPluginInterface, UniDeskPluginInterface_iid)
```

---

## 快速开始：创建你的第一个 QML 插件

让我们创建一个简单的「Hello World」自定义组件插件。

### 步骤 1：创建插件目录结构

在插件目录下创建你的插件文件夹：

```
%APPDATA%\Uniquenium\Plugins\HelloPlugin\
├── plugin.json          # 插件元数据（必需）
├── HelloComponent.qml   # 自定义组件
└── qmldir               # QML 模块声明
```

### 步骤 2：编写 `plugin.json`

这个文件告诉 Uniquenium 插件的基本信息：

```json
{
    "name": "HelloPlugin",
    "displayName": "我的第一个插件",
    "version": "1.0.0",
    "author": "你的名字",
    "description": "一个显示 Hello World 的示例插件",
    "type": "qml",
    "minAppVersion": "1.0.0",
    "main": "qmldir",
    "icon": "icon.png",
    "homepage": "https://github.com/yourname/hello-plugin",
    "tags": ["示例", "组件"]
}
```

### 步骤 3：编写 `qmldir`

声明 QML 模块中的组件：

```
module HelloPlugin
HelloComponent 1.0 HelloComponent.qml
```

### 步骤 4：编写 `HelloComponent.qml`

这是你的自定义组件，使用 UniDesk 控件库：

```qml
import QtQuick 2.15
import UniDesk.Controls 1.0

UniDeskFrame {
    id: root
    
    // 暴露给属性面板的可编辑属性
    property string greetingText: "Hello, Uniquenium!"
    property int fontSize: 18
    
    width: 300
    height: 100
    
    UniDeskText {
        anchors.centerIn: parent
        text: root.greetingText
        font.pointSize: root.fontSize
        color: UniDeskSettings.primaryColor
        font.bold: true
    }
    
    // 点击组件时弹出问候
    MouseArea {
        anchors.fill: parent
        onClicked: {
            UniDeskTools.systemCommand("msg * Hello from plugin!")
        }
    }
}
```

### 步骤 5：安装并测试

1. 将整个 `HelloPlugin` 文件夹复制到：
   ```
   %APPDATA%\Uniquenium\Plugins\HelloPlugin\
   ```
2. 重启 Uniquenium
3. 打开 **设置 → 插件**，确认你的插件显示在列表中并已启用
4. 回到主面板 → 添加组件 → 左侧选择「自定义」→ 找到 `HelloComponent` → 添加到画布
5. 选中组件，右侧属性面板可以修改 `greetingText` 和 `fontSize`！

---

## 插件元数据规范 (`plugin.json`)

| 字段 | 必填 | 类型 | 说明 |
|------|------|------|------|
| `name` | ✅ | string | 插件唯一 ID（英文、数字、下划线） |
| `displayName` | ✅ | string | 插件显示名称（支持中文） |
| `version` | ✅ | string | 语义化版本号，如 `1.2.3` |
| `author` | ✅ | string | 作者名字或团队 |
| `description` | ✅ | string | 插件简短描述 |
| `type` | ✅ | string | `"qml"` 或 `"cpp"` |
| `minAppVersion` | ✅ | string | 最低支持的 Uniquenium 版本 |
| `main` | ✅ | string | 入口文件：`qmldir` 或 DLL 文件名 |
| `icon` | ❌ | string | 相对路径的图标文件（PNG/SVG） |
| `homepage` | ❌ | string | 插件主页 URL |
| `tags` | ❌ | string[] | 标签数组，用于分类筛选 |
| `dependencies` | ❌ | object | 依赖的其他插件：`{"OtherPlugin": ">=1.0.0"}` |

### 示例
```json
{
    "name": "WeatherPlugin",
    "displayName": "天气组件",
    "version": "2.1.0",
    "author": "Weather Dev",
    "description": "显示实时天气、温度和预报图",
    "type": "qml",
    "minAppVersion": "1.2.0",
    "main": "qmldir",
    "icon": "weather-icon.png",
    "tags": ["天气", "网络", "实用"],
    "dependencies": {
        "HttpPlugin": ">=1.0.0"
    }
}
```

---

## 开发进阶

### 访问 UniDesk 全局单例

在你的 QML 组件中可以直接使用这些全局对象：

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

Item {
    Component.onCompleted: {
        // 1. UniDeskGlobals - 全局状态
        console.log("是否浅色主题:", UniDeskGlobals.isLight)
        UniDeskGlobals.updateIsLight() // 手动刷新主题状态
        
        // 2. UniDeskTools - 工具函数
        var uuid = UniDeskTools.createUuid()  // 生成 UUID
        UniDeskTools.web_browse("https://uniquenium.com")  // 打开网页
        var wallpaper = UniDeskTools.get_system_wallpaper()  // 获取系统壁纸
        
        // 3. UniDeskSettings - 设置访问
        console.log("主题色:", UniDeskSettings.primaryColor)
        console.log("开机自启:", UniDeskTools.isAppAutoStartEnabled())
        
        // 4. UniDeskTextStyle - 预设样式
        var fontTiny = UniDeskTextStyle.tiny      // 小字
        var fontLittle = UniDeskTextStyle.little  // 常规
        var fontMiddle = UniDeskTextStyle.middle  // 中等
        var fontBig = UniDeskTextStyle.big        // 大字
    }
}
```

### 在组件中添加信号

使用信号实现组件之间的通信：

```qml
import QtQuick 2.15
import UniDesk.Controls 1.0

UniDeskButton {
    id: myButton
    
    // 自定义信号
    signal myCustomClicked(string message, int count)
    
    contentText: "点我发送信号"
    onClicked: {
        // 发射信号，可以在属性面板中绑定事件处理
        myCustomClicked("Hello from button!", 1)
    }
}
```

### 使用 UniDeskWindow 创建自定义窗口

```qml
import UniDesk.Controls 1.0

UniDeskWindow {
    id: myWindow
    width: 400
    height: 300
    title: "我的自定义窗口"
    
    // 窗口特性
    showStayTop: true
    tintOpacity: 0.8
    blurRadius: 60
    
    // 窗口内容
    UniDeskText {
        anchors.centerIn: parent
        text: "这是插件创建的窗口"
    }
    
    // 可以用这些方法显示提示
    Component.onCompleted: {
        showSuccess("窗口打开成功！")
        // showInfo / showWarning / showError
    }
}
```

### 存储插件数据

使用 `UniDeskSettings` 或本地文件存储：

```qml
import QtQuick 2.15
import UniDesk 1.0
import "storage.js" as Storage

Item {
    function saveMyData(value) {
        // 方式1：使用 LocalStorage（QML 内置）
        var db = LocalStorage.openDatabaseSync("MyPluginDB", "1.0", "Data", 1000000)
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS settings(key TEXT, value TEXT)')
            tx.executeSql('INSERT OR REPLACE INTO settings VALUES(?, ?)', ["myKey", value])
        })
        
        // 方式2：使用 UniDeskSettings（全局，建议简单值）
        // 需要通过 C++ 扩展暴露属性给 QML
    }
}
```

---

## C++ 插件开发（高级）

适合需要高性能或调用 Windows API 的场景。

### 项目结构

```
MyCppPlugin/
├── CMakeLists.txt
├── MyCppPlugin.h
├── MyCppPlugin.cpp
└── plugin.json
```

### CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.16)
project(MyCppPlugin)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_AUTOMOC ON)

find_package(Qt6 REQUIRED COMPONENTS Core Qml Quick)

add_library(MyCppPlugin SHARED
    MyCppPlugin.cpp
)

target_link_libraries(MyCppPlugin PRIVATE
    Qt6::Core Qt6::Qml Qt6::Quick
)

# 必须定义这个 IID 才能被识别为 UniDesk 插件
target_compile_definitions(MyCppPlugin PRIVATE
    UNIDESK_PLUGIN_IID="com.unidesk.plugin.PluginInterface"
)
```

### 插件头文件 `MyCppPlugin.h`

```cpp
#ifndef MYP_CPP_PLUGIN_H
#define MYP_CPP_PLUGIN_H

#include <QObject>
#include <QQmlApplicationEngine>
#include "UniDeskPluginInterface.h"

class MyCppPlugin : public QObject, public UniDeskPluginInterface
{
    Q_OBJECT
    Q_PLUGIN_METADATA(IID UniDeskPluginInterface_iid FILE "plugin.json")
    Q_INTERFACES(UniDeskPluginInterface)

public:
    void registerQmlTypes(QQmlApplicationEngine *engine) override;
    void initialize() override;
};

#endif
```

### 插件实现 `MyCppPlugin.cpp`

```cpp
#include "MyCppPlugin.h"
#include <QtQml>

// 示例：自定义一个 C++ 类型暴露给 QML
class MyAwesomeAPI : public QObject {
    Q_OBJECT
    Q_PROPERTY(int magicNumber READ magicNumber CONSTANT)
public:
    int magicNumber() const { return 42; }
    
    Q_INVOKABLE QString greet(const QString& name) {
        return QString("Hello, %1! 来自 C++ 插件~").arg(name);
    }
};

void MyCppPlugin::registerQmlTypes(QQmlApplicationEngine *engine)
{
    // 注册单例类型，QML 中 import MyPlugin 即可使用
    qmlRegisterSingletonType<MyAwesomeAPI>(
        "MyPlugin", 1, 0, "MyAPI",
        [](QQmlEngine *, QJSEngine *) -> QObject* {
            return new MyAwesomeAPI();
        }
    );
}

void MyCppPlugin::initialize()
{
    qDebug() << "[MyCppPlugin] 初始化完成！";
}

#include "MyCppPlugin.moc"
```

### 在 QML 中使用 C++ 插件提供的 API

```qml
import MyPlugin 1.0

UniDeskText {
    text: MyAPI.greet("Uniquenium")  // "Hello, Uniquenium! 来自 C++ 插件~"
    Component.onCompleted: console.log("Magic:", MyAPI.magicNumber)  // 42
}
```

---

## 调试与日志

### 输出日志

```qml
// QML 中
console.log("[我的插件] 组件加载完成")
console.warn("[我的插件] 网络请求失败")
console.error("[我的插件] 严重错误:", errorMessage)
```

日志输出位置：
- **控制台**：使用 `Uniquenium0 --debug` 启动
- **文件**：`%APPDATA%\Uniquenium\Logs\`

### 热重载

开发时不需要每次重启程序：
1. 修改 QML 文件后保存
2. 在 Uniquenium 中按 `Ctrl + Shift + R` 重载当前页面
3. 或通过菜单 → 开发者工具 → 重载 QML 引擎

---

## 插件打包与分发

完成开发后，将整个插件文件夹打包为 ZIP 即可分发：

```
HelloPlugin-v1.0.0.zip
└── HelloPlugin/
    ├── plugin.json
    ├── qmldir
    ├── HelloComponent.qml
    └── README.md（可选，说明文档）
```

用户安装方式：
1. 设置 → 插件 → 「安装插件」→ 选择 ZIP 文件
2. 或手动解压到 `%APPDATA%\Uniquenium\Plugins\`

---

## 最佳实践

1. ✅ **命名空间隔离**：QML 类型前缀使用你的插件名，如 `WeatherText` 而非 `Text`
2. ✅ **处理异常**：网络请求、文件操作务必加上 try-catch
3. ✅ **内存管理**：动态创建的对象用完记得 destroy()
4. ✅ **主题适配**：始终使用 `UniDeskGlobals.isLight` 判断主题，颜色使用 UniDeskSettings
5. ❌ **不要**直接修改 Uniquenium 源文件，通过插件扩展
6. ❌ **不要**在 onCompleted 中写死路径，使用 `UniDeskTools.fromLocalFile()`
7. ❌ **不要**频繁调用 `UniDeskTools.get_system_wallpaper()`，会消耗资源

---

## 插件示例索引

| 插件类型 | 功能示例 | 难度 |
|---------|---------|------|
| QML 组件 | 便签、时钟、计数器、快捷启动图标 | ⭐ 入门 |
| 数据请求 | 天气、新闻、RSS 订阅 | ⭐⭐ 简单 |
| 系统交互 | 打开软件、执行命令、读取硬件状态 | ⭐⭐⭐ 中等 |
| C++ 扩展 | CPU 监控、全局鼠标钩子、自定义文件格式 | ⭐⭐⭐⭐ 进阶 |

遇到问题？
- [📖 UniDesk 控件库](/controls-reference/overview.md)
- [🐛 提交 Issue](https://github.com/Uniquenium/Uniquenium/issues)
