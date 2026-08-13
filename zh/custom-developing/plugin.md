---
title: 插件开发指南
layout: doc
editLink: true
---

# 插件开发指南

Uniquenium 提供了基于 Qt C++ 插件机制 + QML 动态加载的插件系统。插件可以扩展新的组件类型，提供自定义的 C++ 后端逻辑，或添加全新的功能。

## 插件系统架构

Uniquenium 的插件由两部分组成：

| 组成部分 | 说明 |
|---------|------|
| **C++ DLL** | 实现 `UniDeskPluginInterface` 接口，注册 QML 类型，提供后端逻辑 |
| **QML 文件** | 定义组件的 UI 外观和选项面板 |

插件加载流程：
1. `UniDeskPluginMgr` 扫描 `data/plugins/` 下的子目录
2. 读取每个子目录下的 `plugin-info.json` 元数据
3. 加载 `dlls` 字段指定的 DLL 文件
4. 检查 DLL 是否实现 `UniDeskPluginInterface` 接口
5. 调用 `registerQmlTypes()` 注册 QML 类型
6. 调用 `initialize()` 初始化插件
7. 将插件目录添加到 QML 导入路径

### 组件类型 ID

组件的类型 ID 由 `plugin-info.json` 中的 `author`、`id` 和组件 `name` 拼接而成：

```
{author}.{id}.{component_name}
```

例如 `Uniquenium-Official.uniquenium-official-plugin.typing-follower`。主程序通过此 ID 识别和加载组件。

---

## 插件接口

所有插件必须实现 `UniDeskPluginInterface` 接口：

```cpp
// UniDeskPluginInterface.h
class UniDeskPluginInterface
{
public:
    virtual ~UniDeskPluginInterface() = default;
    virtual void registerQmlTypes(QQmlApplicationEngine *engine) = 0;
    virtual void initialize() = 0;
};

#define UniDeskPluginInterface_iid "com.unidesk.plugin.PluginInterface"
Q_DECLARE_INTERFACE(UniDeskPluginInterface, UniDeskPluginInterface_iid)
```

---

## 插件目录结构

### 运行时目录结构

每个插件安装在 `data/plugins/` 下的一个子目录中：

```
data/plugins/
├── uniquenium-official-plugin/    # 官方插件
│   ├── plugin-info.json
│   ├── uniqueniumOfficialplugin.dll
│   ├── Settings.qml
│   ├── SignalHandler.qml
│   ├── defaultSettings.json
│   └── TypingFollower/
│       ├── TypingFollower.qml
│       ├── TypingFollowerOptions.qml
│       ├── TypingFollowerBackend.h
│       ├── TypingFollowerBackend.cpp
│       └── qmldir
└── uq-plugin-example/             # 示例插件（文件夹名可与 id 不同）
    ├── plugin-info.json
    ├── uqPluginExample.dll
    ├── Settings.qml
    ├── SignalHandler.qml
    ├── defaultSettings.json
    ├── media/
    └── ExamplePlugin/
        ├── ExamplePlugin.qml
        ├── ExamplePluginOptions.qml
        ├── ExamplePluginBackend.h
        ├── ExamplePluginBackend.cpp
        └── qmldir
```

### 源码项目结构

```
uqPluginExample/
├── CMakeLists.txt                  # 构建配置
├── Plugin.h / Plugin.cpp            # 插件入口，注册 QML 类型
├── BackendAll.h / BackendAll.cpp    # 单例翻译管理器
├── UniDeskPluginInterface.h         # 从主程序复制的接口头文件
├── singleton.h / stdafx.h           # 辅助宏定义
├── ExamplePlugin/                   # 组件模块（可多个）
│   ├── ExamplePlugin.qml           # 组件 QML
│   ├── ExamplePluginOptions.qml     # 组件选项页
│   ├── ExamplePluginBackend.h       # 后端头文件
│   ├── ExamplePluginBackend.cpp     # 后端实现
│   └── qmldir                      # QML 模块定义
├── Settings.qml                    # 插件设置页
├── SignalHandler.qml                # 信号处理器
├── plugin-info.json                # 插件元数据
├── defaultSettings.json             # 插件默认设置
├── translations/                   # 翻译文件
│   ├── BackendAll_zh_CN.ts
│   └── BackendAll_en_US.ts
├── media/                          # 资源文件（图片等）
├── deploy.bat                      # 打包脚本
└── README.md
```

---

## 插件元数据 (`plugin-info.json`)

`plugin-info.json` 是插件的核心配置文件，告诉 Uniquenium 插件的基本信息。

### 字段说明

| 字段 | 必填 | 类型 | 说明 |
|------|------|------|------|
| `id` | 是 | string | 插件唯一 ID，用于设置隔离和组件类型 ID |
| `name` | 是 | string | 插件显示名称 |
| `version` | 是 | string | 语义化版本号 |
| `author` | 是 | string | 作者名字或团队，参与组件类型 ID 拼接 |
| `description` | 是 | string | 插件描述 |
| `components` | 是 | array | 插件提供的组件列表 |
| `dlls` | 是 | array | 插件依赖的 DLL 文件列表 |
| `settings` | 否 | string | 设置页 QML 文件路径，指定后主程序显示设置按钮 |
| `signals` | 否 | string | 信号处理器 QML 文件路径 |

### `components[]` 字段

每个组件对象包含：

| 字段 | 说明 |
|------|------|
| `name` | 组件类型标识（如 `"example-plugin"`），参与组件类型 ID 拼接 |
| `nameTr` | 组件显示名称（如 `"示例插件"`） |
| `path` | QML 组件文件的相对路径（如 `"ExamplePlugin/ExamplePlugin.qml"`） |

### 完整示例

```json
{
    "id": "uq-plugin-example",
    "name": "Uniquenium插件示例",
    "version": "1.0.0",
    "author": "Uniquenium",
    "description": "UQ Qt plugin example",
    "settings": "Settings.qml",
    "signals": "SignalHandler.qml",
    "components": [
        {
            "name": "example-plugin",
            "nameTr": "示例插件",
            "path": "ExamplePlugin/ExamplePlugin.qml"
        }
    ],
    "dlls": [
        "uqPluginExample.dll"
    ]
}
```

---

## 从模板仓库创建插件

最快速的方式是使用官方提供的 `uq-plugin-example` 模板仓库：

```bash
# 克隆模板仓库
git clone https://github.com/Uniquenium/uq-plugin-example.git my-plugin
cd my-plugin

# 修改 CMakeLists.txt 中的 PLUGIN_NAME
# 修改 plugin-info.json 中的 id、name、author 等字段
```

### 需要修改的文件

| 文件 | 修改内容 |
|------|----------|
| `CMakeLists.txt` | `PLUGIN_NAME`、`PLUGIN_VERSION`、`find_package` 依赖 |
| `plugin-info.json` | `id`、`name`、`author`、`description`、`components` |
| `Plugin.cpp` | `registerQmlTypes()` 中注册的类型 |
| `ExamplePlugin/` | 重命名为你的组件名，修改 QML 和后端类名 |
| `Settings.qml` | `pluginId` 属性、设置项内容 |
| `SignalHandler.qml` | `pluginId` 引用 |
| `deploy.bat` | 无需修改，自动读取 `plugin-info.json` |
| `translations/*.ts` | 更新翻译内容 |
| `defaultSettings.json` | 修改默认设置项 |

---

## 从零创建插件

### 步骤 1：创建 C++ 插件项目

将 `UniDeskPluginInterface.h` 从主程序复制到项目中。

#### `CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.16)

set(PLUGIN_NAME my-plugin)
set(PLUGIN_VERSION_MAJOR 1)
set(PLUGIN_VERSION_MINOR 0)
set(PLUGIN_VERSION "${PLUGIN_VERSION_MAJOR}.${PLUGIN_VERSION_MINOR}")
set(TARGET ${PLUGIN_NAME}${PLUGIN_VERSION_MAJOR})

set(QML_IMPORT_PATH ${CMAKE_BINARY_DIR}/temp CACHE STRING "" FORCE)

project(${PLUGIN_NAME} LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

find_package(Qt6 6.0 REQUIRED COMPONENTS
    Core Qml Quick LinguistTools
)

qt_standard_project_setup()

set(sources_files "")
set(qml_files "")
set(resource_files "")
set(include_dirs "")

add_compile_definitions(PLUGIN_NAME="${PLUGIN_NAME}")

# 翻译文件
set(TS_FILES
    ${CMAKE_CURRENT_SOURCE_DIR}/translations/BackendAll_zh_CN.ts
    ${CMAKE_CURRENT_SOURCE_DIR}/translations/BackendAll_en_US.ts
)

# 扫描 C++ 源文件
file(GLOB CPP_FILES *.cpp */*.cpp)
foreach (filepath ${CPP_FILES})
    string(REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" filename ${filepath})
    list(APPEND sources_files ${filename})
    list(APPEND include_dirs ${filepath})
endforeach ()

# 扫描头文件
file(GLOB H_FILES *.h */*.h)
foreach (filepath ${H_FILES})
    string(REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" filename ${filepath})
    list(APPEND include_dirs ${filepath})
    list(APPEND sources_files ${filename})
endforeach ()

# 扫描 QML 文件（排除 build/dist/translations 目录）
file(GLOB_RECURSE QML_PATHS *.qml */*.qml qmldir */*.qmldir)
set(qml_filtered "")
set(resource_filtered "")
foreach (filepath ${QML_PATHS})
    string(REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" filename ${filepath})
    string(FIND "${filename}" "build/" _build_pos)
    string(FIND "${filename}" "dist/" _dist_pos)
    string(FIND "${filename}" "translations/" _trans_pos)
    if (_build_pos EQUAL -1 AND _dist_pos EQUAL -1 AND _trans_pos EQUAL -1)
        if (${filename} MATCHES "qmldir")
            list(APPEND resource_filtered ${filename})
        else ()
            list(APPEND qml_filtered ${filename})
        endif ()
    endif ()
endforeach (filepath)
set(qml_files ${qml_filtered})
set(resource_files ${resource_filtered})

# 扫描资源文件（图片等，排除 build/dist 目录）
set(RES_SUFFIX "")
set(RES_PATHS "")
list(APPEND RES_SUFFIX *.png *.jpg *.svg *.ico *.ttf *.webp *.js *.qm *.qsb)
list(APPEND RES_PATHS media)
set(resource_filtered "")
foreach (respath ${RES_PATHS})
    foreach (filesuffix ${RES_SUFFIX})
        file(GLOB_RECURSE RES_FOUND ${respath}/${filesuffix})
        foreach (filepath ${RES_FOUND})
            string(REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" filename ${filepath})
            string(FIND "${filename}" "build/" _res_build_pos)
            string(FIND "${filename}" "dist/" _res_dist_pos)
            if (_res_build_pos EQUAL -1 AND _res_dist_pos EQUAL -1)
                list(APPEND resource_filtered ${filename})
            endif ()
        endforeach()
    endforeach ()
endforeach (respath)
set(resource_files ${resource_filtered})

qt_add_library(${PLUGIN_NAME} SHARED)

target_include_directories(${PLUGIN_NAME}
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}
        ${include_dirs}
)

target_link_libraries(${PLUGIN_NAME}
    PUBLIC
    Qt6::Core
    Qt6::Gui
    PRIVATE
    Qt6::Qml
    Qt6::Quick
)

# 翻译编译
qt_add_translations(${PLUGIN_NAME}
    TS_FILES ${TS_FILES}
    SOURCES ${sources_files} ${qml_files}
    RESOURCE_PREFIX "/uq/pluginexample/i18n"
)

# 自动运行 lupdate 更新翻译
get_target_property(_lupdate_exe Qt6::lupdate LOCATION)
if(_lupdate_exe)
    set(_all_sources "")
    foreach(_file ${sources_files} ${qml_files})
        list(APPEND _all_sources "${CMAKE_CURRENT_SOURCE_DIR}/${_file}")
    endforeach()
    execute_process(
        COMMAND ${_lupdate_exe} ${_all_sources} -ts ${TS_FILES}
        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
        RESULT_VARIABLE _lupdate_result
        OUTPUT_VARIABLE _lupdate_output
        ERROR_VARIABLE _lupdate_error
    )
    if(NOT _lupdate_result EQUAL 0)
        message(WARNING "lupdate failed: ${_lupdate_error}")
    endif()
endif()

# QML 模块注册
qt6_add_qml_module(${PLUGIN_NAME}
    URI org.uq.${PLUGIN_NAME}
    OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/temp/bin"
    VERSION ${PLUGIN_VERSION}
    QML_FILES ${qml_files}
    RESOURCE_PREFIX "/uq/pluginexample"
    SOURCES ${sources_files}
    RESOURCES plugin-info.json ${resource_files}
    NO_PLUGIN
)

set_target_properties(${PLUGIN_NAME} PROPERTIES
    LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/temp/bin/"
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/temp/bin/"
    PREFIX ""
)
```

::: warning CMakeLists.txt 要点
- `RESOURCE_PREFIX` 必须与 `BackendAll::retranslate()` 中的路径一致
- QML 文件扫描时必须排除 `build/`、`dist/`、`translations/` 目录
- `PLUGIN_NAME` 宏通过 `add_compile_definitions` 传递给 C++ 代码
- URI 格式为 `org.uq.{PLUGIN_NAME}`，QML 中的 import 需与之匹配
:::

#### `Plugin.h`

```cpp
#ifndef PLUGIN_H
#define PLUGIN_H

#include <QObject>
#include <UniDeskPluginInterface.h>

class Plugin : public QObject, public UniDeskPluginInterface
{
    Q_OBJECT
    Q_PLUGIN_METADATA(IID UniDeskPluginInterface_iid)
    Q_INTERFACES(UniDeskPluginInterface)

public:
    Plugin();
    ~Plugin() override;

    void registerQmlTypes(QQmlApplicationEngine *engine) override;
    void initialize() override;
};

#endif // PLUGIN_H
```

#### `Plugin.cpp`

```cpp
#include "Plugin.h"
#include "BackendAll.h"
#include "MyComponent/MyBackend.h"
#include <qqmlregistration.h>
#include <QQmlApplicationEngine>
#include <QDebug>

Plugin::Plugin() {}
Plugin::~Plugin() {}

void Plugin::registerQmlTypes(QQmlApplicationEngine *engine)
{
    Q_UNUSED(engine);
    QString URI = QStringLiteral("org.uq.") + PLUGIN_NAME;
    char *URI2 = (char *)URI.toUtf8().data();
    qmlRegisterSingletonType<BackendAll>(URI2, 1, 0, "BackendAll", BackendAll::create);
    qmlRegisterType<MyBackend>(URI2, 1, 0, "MyBackend");
}

void Plugin::initialize()
{
    qDebug() << "Plugin initialized";
}
```

::: tip
`PLUGIN_NAME` 是在 `CMakeLists.txt` 中通过 `add_compile_definitions` 定义的宏，值为 `CMakeLists.txt` 中 `set(PLUGIN_NAME ...)` 指定的名称。在 `Plugin.cpp` 中拼接 URI 时使用此宏即可。
:::

---

## 创建组件

每个组件是插件下的一个子目录，包含 QML 文件、后端类和 `qmldir` 定义。

### 步骤 1：创建组件目录

```
MyPlugin/
└── MyComponent/
    ├── MyComponent.qml          # 主组件 QML
    ├── MyComponentOptions.qml   # 组件选项面板
    ├── MyBackend.h               # C++ 后端头文件
    ├── MyBackend.cpp             # C++ 后端实现
    └── qmldir                   # QML 模块定义
```

### 步骤 2：编写 `qmldir`

```
module org.uq.uqPluginExample.MyComponent
MyComponent 1.0 MyComponent.qml
MyComponentOptions 1.0 MyComponentOptions.qml
```

::: tip
`qmldir` 中的模块名格式为 `org.uq.{插件名}.{组件目录名}`。此文件会在打包时被删除（主程序通过 QML 文件路径直接加载），但在开发阶段用于 Qt Creator 的代码补全。
:::

### 步骤 3：编写 C++ 后端

#### `MyBackend.h`

```cpp
#ifndef MYBACKEND_H
#define MYBACKEND_H

#include <QObject>

class MyBackend : public QObject
{
    Q_OBJECT
    Q_PROPERTY(QString message READ message WRITE setMessage NOTIFY messageChanged)
    Q_PROPERTY(int counter READ counter NOTIFY counterChanged)

public:
    explicit MyBackend(QObject *parent = nullptr);

    QString message() const;
    void setMessage(const QString &newMessage);
    int counter() const;

    Q_INVOKABLE QString greet(const QString &name);
    Q_INVOKABLE void incrementCounter();

signals:
    void messageChanged();
    void counterChanged();

private:
    QString m_message;
    int m_counter;
};

#endif // MYBACKEND_H
```

#### `MyBackend.cpp`

```cpp
#include "MyBackend.h"

MyBackend::MyBackend(QObject *parent)
    : QObject(parent)
    , m_message("Hello from Backend")
    , m_counter(0)
{
}

QString MyBackend::message() const { return m_message; }

void MyBackend::setMessage(const QString &newMessage)
{
    if (m_message != newMessage) {
        m_message = newMessage;
        emit messageChanged();
    }
}

int MyBackend::counter() const { return m_counter; }

QString MyBackend::greet(const QString &name)
{
    return QString("Hello, %1!").arg(name);
}

void MyBackend::incrementCounter()
{
    m_counter++;
    emit counterChanged();
}
```

### 步骤 4：编写组件 QML

组件必须继承自 `UniDeskComBase`，并通过 `optionsWindow` 属性关联选项面板。

```qml
import QtQuick
import QtQuick.Controls
import UniDesk
import UniDesk.Controls
import org.uq.uq-plugin-example 1.0

UniDeskComBase {
    id: base
    visible: true
    width: 300
    height: 300
    chosen: comManager.selectMode === UniDeskComponentSelectMode.NoSelect
            ? (optionsWindow.visible) : selected

    Rectangle {
        id: cont
        width: base.width
        height: base.height
        color: "#f0f0f0"
        radius: 8

        Column {
            anchors.centerIn: parent
            spacing: 16

            Text {
                text: qsTr("Plugin Component")
                font.bold: true
                font.pixelSize: 20
                color: "#333"
                anchors.horizontalCenter: parent.horizontalCenter
            }

            MyBackend {
                id: backend
            }

            Text {
                text: qsTr("Message: %1 ").arg(backend.message)
                font.pixelSize: 14
                anchors.horizontalCenter: parent.horizontalCenter
            }

            Button {
                text: qsTr("Greet")
                onClicked: console.log(backend.greet("World"))
                anchors.horizontalCenter: parent.horizontalCenter
            }
        }
    }

    optionsWindow: MyComponentOptions {
        id: options
        comManager: base.comManager
        editingComponent: base
    }
}
```

::: warning
- 必须继承 `UniDeskComBase`，否则无法被主程序正确识别和管理
- `chosen` 属性用于处理选中状态的视觉表现，保持示例中的写法
- `optionsWindow` 必须指向你的选项面板组件
- import 的 URI 必须与 `CMakeLists.txt` 中 `qt6_add_qml_module` 的 URI 一致
:::

### 步骤 5：编写组件选项面板

选项面板必须继承自 `UniDeskWindow`。

```qml
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import QtQuick.Dialogs
import QtQuick.Templates as T
import QtQuick.Controls.Basic
import UniDesk
import UniDesk.Controls
import UniDesk.Singletons

UniDeskWindow {
    id: window
    width: 1000
    height: 700
    title: qsTr("My Component Options")
    autoVisible: false
    showMinimize: false
    showMaximize: false
    autoDestroy: false
    property var comManager
    property UniDeskComBase editingComponent

    ScrollView {
        anchors.fill: parent
        hoverEnabled: true
        contentHeight: basicOptions.height + basicOptions.y + 20

        UniDeskComBasicOptions {
            id: basicOptions
            anchors.top: parent.top
            anchors.left: parent.left
            anchors.right: parent.right
            anchors.topMargin: 10
            comManager: window.comManager
            editingComponent: window.editingComponent
        }
    }
}
```

---

## 插件设置

### 概述

插件可以拥有独立的设置页面，使用主程序的 `UniDeskSettings` 单例进行存储。插件设置通过 `pluginId` 参数与主程序设置隔离，存储在独立的 JSON 文件中。

### 设置存储路径

插件设置存储在 `data/plugins/{pluginId}/settings.json`，由主程序自动管理，无需插件开发者手动读写。

### 创建设置页 `Settings.qml`

在插件根目录创建 `Settings.qml`：

```qml
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import QtQuick.Dialogs
import QtQuick.Templates as T
import QtQuick.Controls.Basic
import UniDesk
import UniDesk.Controls
import UniDesk.Singletons
import org.uq.uq-plugin-example 1.0

UniDeskWindow {
    id: window
    width: 1000
    height: 700
    title: qsTr("Example Plugin Settings")
    autoVisible: false
    showMinimize: false
    showMaximize: false
    autoDestroy: false

    readonly property string pluginId: "uq-plugin-example"

    ScrollView {
        anchors.fill: parent
        hoverEnabled: true
        clip: true
        contentHeight: columnLayout.childrenRect.height + 20

        ColumnLayout {
            id: columnLayout
            anchors.top: parent.top
            anchors.left: parent.left
            anchors.right: parent.right
            spacing: 10
            anchors.margins: 10

            UniDeskText {
                text: qsTr("Display Language")
                font: UniDeskTextStyle.little
                Layout.topMargin: 5
            }
            RowLayout {
                Layout.fillWidth: true
                spacing: 10
                UniDeskText {
                    text: qsTr("Language")
                    font: UniDeskTextStyle.little
                    Layout.alignment: Qt.AlignVCenter
                }
                UniDeskComboBox {
                    id: languageComboBox
                    Layout.fillWidth: true
                    model: ["中文", "English"]
                    currentIndex: ["zh_CN", "en_US"].indexOf(
                        UniDeskSettings.get("language", pluginId) || "zh_CN"
                    )
                    onActivated: {
                        var lang = ["zh_CN", "en_US"][currentIndex]
                        UniDeskSettings.set("language", lang, pluginId)
                        BackendAll.retranslate(window, lang)
                    }
                }
            }
        }
    }
}
```

::: tip 使用 UniDeskSettings
- `UniDeskSettings.get(key, pluginId)` - 读取插件设置
- `UniDeskSettings.set(key, value, pluginId)` - 写入插件设置
- `pluginId` 参数传 `plugin-info.json` 中的 `id` 字段值
- 不传 `pluginId` 则操作主程序设置
:::

### 设置默认值 `defaultSettings.json`

在插件根目录创建 `defaultSettings.json` 定义默认设置值：

```json
{
    "language": "zh_CN"
}
```

主程序加载插件时会自动读取此文件，将默认值注册到 `UniDeskSettings`。

### 启用设置按钮

在 `plugin-info.json` 中添加 `settings` 字段指向设置页：

```json
{
    "settings": "Settings.qml"
}
```

主程序检测到 `settings` 字段后，会在插件详情中显示设置按钮。

---

## 加载资源文件

### 使用 `pluginDir` 属性

`UniDeskComBase` 提供了 `pluginDir` 属性，指向组件所在插件的绝对目录路径。在 `Component.onCompleted` 中自动获取，可直接用于加载资源文件。

```qml
UniDeskComBase {
    id: base

    Image {
        id: img
        source: "file:" + (pluginDir || "") + "/media/my-image.png"
        anchors.horizontalCenter: parent.horizontalCenter
        width: 200
        height: 100
    }
}
```

::: warning 资源路径
- 使用 `pluginDir` 属性加载资源，格式为 `"file:" + pluginDir + "/相对路径"`
- 不要使用 `qrc:/` 路径，因为插件资源编译后路径不稳定
- `pluginDir` 在 `Component.onCompleted` 时通过 `UniDeskPluginMgr.getPluginDir()` 获取
- 如果 `pluginDir` 为空（理论上不会），`|| ""` 保证表达式有效
:::

### 将资源文件加入构建

在 `CMakeLists.txt` 中，`media/` 目录下的资源文件会被自动扫描：

```cmake
set(RES_PATHS "")
list(APPEND RES_PATHS media)
# ... 扫描 media 下的 *.png *.jpg *.svg 等文件
```

### 打包资源文件

运行 `deploy.bat` 时，构建产物中的资源文件会被自动复制到 `dist/{pluginId}/media/` 目录。

---

## 设置语言（翻译支持）

### 概述

插件通过 `BackendAll` 单例管理翻译，使用 Qt 的 `QTranslator` 和 `qtAdd_translations` 实现多语言支持。

### 架构说明

```
主程序                          插件
┌─────────────────┐            ┌──────────────────────┐
│ UniDeskSettings │──get/set──▶│ Settings.qml         │
│  (language 键)  │            │   修改语言设置        │
└─────────────────┘            └──────────┬───────────┘
                                          │ onLanguageChanged
                                          ▼
┌─────────────────┐            ┌──────────────────────┐
│ UniDeskPluginMgr│──信号─────▶│ SignalHandler.qml    │
│  (languageChanged)│          │   接收语言变更信号    │
└─────────────────┘            └──────────┬───────────┘
                                           │ BackendAll.retranslate()
                                           ▼
                              ┌──────────────────────┐
                              │ BackendAll 单例       │
                              │   加载翻译文件         │
                              │   刷新 QML 引擎       │
                              └──────────┬───────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │ qsTr() 自动翻译       │
                              │   所有组件文本更新     │
                              └──────────────────────┘
```

### 步骤 1：创建翻译源文件

在 `translations/` 目录下创建 `.ts` 文件：

**`translations/BackendAll_zh_CN.ts`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="zh_CN">
<context>
    <name>Settings</name>
    <message>
        <location filename="../Settings.qml" line="16"/>
        <source>Example Plugin Settings</source>
        <translation type="unfinished">示例插件设置</translation>
    </message>
</context>
</TS>
```

**`translations/BackendAll_en_US.ts`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="en_US" sourcelanguage="en">
<context>
    <name>Settings</name>
    <message>
        <location filename="../Settings.qml" line="16"/>
        <source>Example Plugin Settings</source>
        <translation type="unfinished">Example Plugin Settings</translation>
    </message>
</context>
</TS>
```

::: tip
`ts` 文件会在构建时由 `lupdate` 自动更新 `source` 字段。`translation` 字段需要手动填写或使用 Qt Linguist 工具编辑。
:::

### 步骤 2：创建 BackendAll 单例

#### `BackendAll.h`

```cpp
#ifndef BACKENDALL_H
#define BACKENDALL_H

#include <QObject>
#include <QTranslator>
#include <QtQml/qqml.h>
#include "stdafx.h"
#include "singleton.h"

class BackendAll : public QObject
{
    Q_OBJECT
    QML_SINGLETON
public:
    SINGLETON(BackendAll)
    static auto create(QQmlEngine*, QJSEngine*) { return getInstance(); }
    explicit BackendAll(QObject *parent = nullptr);

    Q_INVOKABLE void retranslate(const QObject *object, const QString &language);

private:
    QTranslator* m_translator;
};

#endif // BACKENDALL_H
```

#### `BackendAll.cpp`

```cpp
#include "BackendAll.h"
#include <QTranslator>
#include <QCoreApplication>
#include <QQmlEngine>

BackendAll::BackendAll(QObject *parent)
    : QObject(parent)
{
    m_translator = new QTranslator(this);
    QCoreApplication::installTranslator(m_translator);
}

void BackendAll::retranslate(const QObject *object, const QString &language)
{
    QQmlEngine *engine = qmlEngine(object);
    if (engine) {
        m_translator->load(":/uq/pluginexample/i18n/BackendAll_" + language);
        engine->retranslate();
    }
}
```

::: warning 路径一致性
`BackendAll::retranslate()` 中的资源路径前缀必须与 `CMakeLists.txt` 中 `qt_add_translations` 的 `RESOURCE_PREFIX` 一致。
:::

### 步骤 3：创建信号处理器 `SignalHandler.qml`

在插件根目录创建 `SignalHandler.qml`，用于接收主程序的语言变更信号：

```qml
import QtQuick
import UniDesk
import UniDesk.Controls
import UniDesk.Singletons
import org.uq.uq-plugin-example 1.0

UniDeskPluginSignals {
    id: signalHandlerSignals

    Component.onCompleted: {
        var lang = UniDeskSettings.get("language", "uqPluginExample") || "zh_CN"
        BackendAll.retranslate(signalHandlerSignals, lang)
    }

    onLanguageChanged: {
        var lang = UniDeskSettings.get("language", "uqPluginExample") || "zh_CN"
        BackendAll.retranslate(signalHandlerSignals, lang)
    }
}
```

### 步骤 4：在 `plugin-info.json` 中注册信号处理器

```json
{
    "signals": "SignalHandler.qml"
}
```

### 步骤 5：在 QML 中使用翻译

在所有 QML 文件中使用 `qsTr()` 包裹需要翻译的字符串：

```qml
Text {
    text: qsTr("Hello World")
}

Button {
    text: qsTr("Click Me")
}
```

`qsTr()` 会根据当前语言自动查找翻译并显示对应文本。

---

## 组件数据扩展

组件可以通过实现 `propertyDataEx()` 和 `loadPropertyDataEx()` 方法来保存和加载自定义属性：

```qml
UniDeskComBase {
    id: base

    property string myCustomProperty: "default"

    function propertyDataEx() {
        return {
            "myCustomProperty": myCustomProperty
        }
    }

    function loadPropertyDataEx(data) {
        if (data.myCustomProperty !== undefined) {
            myCustomProperty = data.myCustomProperty;
        }
    }
}
```

---

## 打包与安装

### 使用 `deploy.bat`

```batch
deploy.bat                  :: 正常打包
deploy.bat --clean          :: 先清理 dist 目录
deploy.bat --build-dir <path>  :: 指定构建目录
```

打包脚本会：
1. 自动在 `build/` 目录中查找 DLL 构建产物
2. 读取 `plugin-info.json` 获取插件 ID
3. 将 DLL、QML 文件、资源文件复制到 `dist/{pluginId}/`
4. 从源码目录复制 `plugin-info.json`、`defaultSettings.json`、`SignalHandler.qml` 等
5. 清理 `qmldir` 和临时文件

### 手动安装

1. 运行 `deploy.bat` 生成 `dist/{pluginId}/` 目录
2. 将该目录复制到以下任一位置：
   - `<Uniquenium 安装目录>/data/plugins/{pluginId}/`
   - `%APPDATA%/Uniquenium/Plugins/{pluginId}/`
3. 重启 Uniquenium

---

## 注意事项

### 开发规范

1. **继承 UniDeskComBase**：组件 QML 必须继承 `UniDeskComBase`，否则无法被主程序管理
2. **继承 UniDeskWindow**：选项面板必须继承 `UniDeskWindow`，否则会显示为系统默认边框窗口
3. **URI 一致性**：`CMakeLists.txt` 中的 URI、QML 中的 import、`qmldir` 中的模块名必须保持一致
4. **qsTr() 包裹**：所有用户可见文本必须使用 `qsTr()` 包裹以支持翻译
5. **chosen 属性**：必须使用 `chosen: comManager.selectMode === UniDeskComponentSelectMode.NoSelect ? (optionsWindow.visible) : selected`
6. **pluginDir**：使用 `pluginDir` 属性加载外部资源，不要硬编码路径

### 常见问题

#### Q: 组件加载失败，控制台提示"Plugin does not implement PluginInterface"

确保 `Plugin` 类正确继承了 `UniDeskPluginInterface` 并声明了 `Q_PLUGIN_METADATA` 和 `Q_INTERFACES`。

#### Q: DLL 加载失败

检查 `plugin-info.json` 中 `dlls` 字段指定的文件名是否与实际 DLL 文件名一致。

#### Q: 设置按钮不显示

确保 `plugin-info.json` 中包含 `settings` 字段，且 `Settings.qml` 文件存在于插件目录。

#### Q: 资源图片无法加载

确保使用 `"file:" + pluginDir + "/media/xxx.png"` 格式加载，不要使用 `qrc:` 路径。

#### Q: 翻译不生效

检查：
- `BackendAll::retranslate()` 中的路径前缀与 `CMakeLists.txt` 中的 `RESOURCE_PREFIX` 一致
- `SignalHandler.qml` 在 `plugin-info.json` 中正确注册
- `qsTr()` 包裹的文本在 `.ts` 文件中有对应翻译

#### Q: `PLUGIN_NAME` 未定义

`PLUGIN_NAME` 宏由 `CMakeLists.txt` 中的 `add_compile_definitions` 定义。如果在 IDE 中编辑时提示未定义，这是正常的——宏会在构建时由 CMake 注入。

#### Q: 多个组件如何管理

每个组件创建独立的子目录和 `qmldir`。在 `Plugin.cpp` 中注册所有后端类型，并在 `plugin-info.json` 的 `components` 数组中添加所有组件条目。

#### Q: 如何调试插件

在 Qt Creator 中打开插件项目并编译。将构建产物复制到主程序的 `data/plugins/` 目录后，启动主程序查看插件加载日志。主程序的日志窗口会显示插件加载状态。

#### Q: 目录名、插件 ID、PLUGIN_NAME 分别怎么命名

三者的命名规则和用途不同：

| 名称 | 用途 | 命名规则 | 示例 |
|------|------|----------|------|
| **目录名** | 源码项目文件夹名、安装目录名 | 可用横杠，无特殊限制 | `uq-plugin-example` |
| **`id`** (plugin-info.json) | 设置隔离、组件类型 ID 拼接 | 建议驼峰命名，不含横杠 | `uqPluginExample` |
| **`PLUGIN_NAME`** (CMakeLists.txt) | QML 模块 URI (`org.uq.{name}`) | 驼峰命名，**不能含横杠** | `uqPluginExample` |

::: warning
`PLUGIN_NAME` 和 `plugin-info.json` 中的 `id` 不能使用横杠（`-`），因为它们会被用作 QML 模块 URI（如 `import org.uq.uqPluginExample 1.0`），QML 的 import 语法不支持横杠。
:::

---

## 最佳实践

1. 为 C++ 后端类使用有意义的命名，如 `ExamplePluginBackend`
2. 每个组件使用独立的子目录，便于管理和维护
3. 使用 `defaultSettings.json` 定义合理的默认值
4. 保持 `plugin-info.json` 中的信息准确完整
5. 使用 `pluginDir` 属性加载外部资源文件
6. 通过 `propertyDataEx()` / `loadPropertyDataEx()` 扩展组件数据
7. 插件设置始终使用 `pluginId` 参数与主程序设置隔离
8. 翻译文件中的 `source` 字段保持英文原文，`translation` 字段为目标语言

---

## 相关参考

- [UniDeskComBase 控件](/controls-reference/UniDeskComBase.md)：组件基类 API 文档
- [UniDeskSettings 单例](/controls-reference/singletons/UniDeskSettings.md)：设置存储 API
- [模板系统](/custom-developing/template.md)：模板开发指南
- [自定义光标](/custom-developing/cursor-style.md)：在插件中使用自定义光标