---
title: Plugin Development Guide
layout: doc
editLink: true
---

# Plugin Development Guide

Uniquenium provides a plugin system based on the Qt C++ plugin mechanism + QML dynamic loading. Plugins can extend new component types, provide custom C++ backend logic, or add brand-new features.

## Plugin System Architecture

A Uniquenium plugin consists of two parts:

| Component | Description |
|-----------|-------------|
| **C++ DLL** | Implements the `UniDeskPluginInterface`, registers QML types, provides backend logic |
| **QML Files** | Defines the UI appearance of components and their option panels |

Plugin Loading Flow:
1. `UniDeskPluginMgr` scans subdirectories under `data/plugins/`
2. Reads the `plugin-info.json` metadata from each subdirectory
3. Loads the DLL files specified in the `dlls` field
4. Checks whether the DLL implements the `UniDeskPluginInterface`
5. Calls `registerQmlTypes()` to register QML types
6. Calls `initialize()` to initialize the plugin
7. Adds the plugin directory to the QML import path

---

## Plugin Interface

All plugins must implement the `UniDeskPluginInterface`:

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

## Plugin Directory Structure

Each plugin is a subdirectory under `data/plugins/`, for example:

```
data/plugins/
├── p1/                          # Plugin directory (any name)
│   ├── plugin-info.json         # Plugin metadata (required)
│   ├── MyPlugin.dll             # C++ plugin DLL
│   ├── MyComponent.qml          # Component QML file
│   └── MyComponentOptions.qml   # Component options panel QML
├── p2/
│   └── ...
└── p3/
    ├── plugin-info.json
    ├── uniqueniumOfficialplugin.dll
    └── TypingFollower/
        ├── TypingFollower.qml
        └── TypingFollowerOptions.qml
```

---

## Plugin Metadata (`plugin-info.json`)

`plugin-info.json` is the core configuration file that tells Uniquenium the basic information about the plugin.

### Field Descriptions

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `id` | Yes | string | Unique plugin ID |
| `name` | Yes | string | Plugin display name |
| `version` | Yes | string | Semantic version number |
| `author` | Yes | string | Author name or team |
| `description` | Yes | string | Plugin description |
| `components` | Yes | array | List of components provided by the plugin |
| `dlls` | Yes | array | List of DLL files the plugin depends on |

### `components[]` Fields

Each component object contains:

| Field | Description |
|-------|-------------|
| `name` | Component type identifier (e.g., `"typing-follower"`) |
| `nameTr` | Component display name (e.g., `"Typing Follower"`) |
| `path` | Relative path to the QML component file (e.g., `"TypingFollower/TypingFollower.qml"`) |

### `dlls[]` Fields

An array of DLL file names to load. DLL files must be located in the plugin directory.

### Full Example

```json
{
    "id": "my-plugin",
    "name": "My Plugin",
    "version": "1.0.0",
    "author": "YourName",
    "description": "A sample plugin",
    "components": [
        {
            "name": "my-component",
            "nameTr": "My Component",
            "path": "MyComponent.qml"
        }
    ],
    "dlls": [
        "my-plugin.dll"
    ]
}
```

---

## Quick Start: Creating a Plugin from Scratch

### Step 1: Create a C++ Plugin Project

Create a new Qt C++ project and copy `UniDeskPluginInterface.h` into the project.

#### Project File Structure

```
MyPlugin/
├── CMakeLists.txt
├── Plugin.h
├── Plugin.cpp
├── MyBackend.h          # Optional: C++ backend class
├── MyBackend.cpp
├── MyComponent.qml      # Component QML
├── MyComponentOptions.qml # Component options panel QML
└── plugin-info.json
```

#### `CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.16)

set(PLUGIN_NAME my-plugin)
set(PLUGIN_VERSION_MAJOR 1)
set(PLUGIN_VERSION_MINOR 0)
set(PLUGIN_VERSION "${PLUGIN_VERSION_MAJOR}.${PLUGIN_VERSION_MINOR}")

project(${PLUGIN_NAME} LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

find_package(Qt6 6.0 REQUIRED COMPONENTS Core Qml Quick)

set(sources_files "")
set(qml_files "")
set(resource_files "")
set(include_dirs "")

add_compile_definitions(PLUGIN_NAME="${PLUGIN_NAME}")

file(GLOB CPP_FILES *.cpp */*.cpp)
foreach (filepath ${CPP_FILES})
    string(REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" filename ${filepath})
    list(APPEND sources_files ${filename})
    list(APPEND include_dirs ${filepath})
endforeach ()

file(GLOB H_FILES *.h */*.h)
foreach (filepath ${H_FILES})
    string(REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" filename ${filepath})
    list(APPEND include_dirs ${filepath})
    list(APPEND sources_files ${filename})
endforeach ()

file(GLOB_RECURSE QML_PATHS *.qml */*.qml qmldir */*.qmldir)
foreach (filepath ${QML_PATHS})
    string(REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" filename ${filepath})
    if (${filename} MATCHES "qmldir")
        list(APPEND resource_files ${filename})
    else ()
        list(APPEND qml_files ${filename})
    endif ()
endforeach ()

qt_add_library(${PLUGIN_NAME} SHARED)

target_include_directories(${PLUGIN_NAME}
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}
        ${include_dirs}
)

target_link_libraries(${PLUGIN_NAME}
    PRIVATE
    Qt6::Core
    Qt6::Qml
    Qt6::Quick
)

qt6_add_qml_module(${PLUGIN_NAME}
    URI org.uniquenium.${PLUGIN_NAME}
    OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/temp/bin"
    VERSION ${PLUGIN_VERSION}
    QML_FILES ${qml_files}
    RESOURCE_PREFIX "/uniquenium/${PLUGIN_NAME}"
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
#include "MyBackend.h"
#include <QQmlApplicationEngine>
#include <QDebug>
#include <QCoreApplication>

Plugin::Plugin() {}
Plugin::~Plugin() {}

void Plugin::registerQmlTypes(QQmlApplicationEngine *engine)
{
    Q_UNUSED(engine);
    QString URI = QStringLiteral("org.uniquenium.") + PLUGIN_NAME;
    qmlRegisterType<MyBackend>(URI.toUtf8().constData(), 1, 0, "MyBackend");
}

void Plugin::initialize()
{
    qDebug() << "Plugin initialized";
}
```

#### C++ Backend Class `MyBackend.h`

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

#### C++ Backend Class `MyBackend.cpp`

```cpp
#include "MyBackend.h"

MyBackend::MyBackend(QObject *parent)
    : QObject(parent), m_message("Hello"), m_counter(0)
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
    QString greeting = QString("Hello, %1!").arg(name);
    return greeting;
}

void MyBackend::incrementCounter()
{
    m_counter++;
    emit counterChanged();
}
```

### Step 2: Write the Component QML File

The component must inherit from `UniDeskComBase` and link to the options panel via the `optionsWindow` property.

```qml
import QtQuick
import QtQuick.Controls
import UniDesk
import UniDesk.Controls
import org.uniquenium.myplugin 1.0

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
                text: "My Plugin Component"
                font.bold: true
                font.pixelSize: 20
                color: "#333"
                anchors.horizontalCenter: parent.horizontalCenter
            }

            MyBackend {
                id: backend
            }

            Text {
                text: "Message: " + backend.message
                font.pixelSize: 14
                anchors.horizontalCenter: parent.horizontalCenter
            }

            Button {
                text: "Greet"
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

### Step 3: Write the Component Options Panel QML

The options panel must inherit from `UniDeskWindow` and provides a property editing interface.

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
    title: qsTr("My Plugin Options")
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

### Step 4: Write `plugin-info.json`

```json
{
    "id": "my-plugin",
    "name": "My Plugin",
    "version": "1.0.0",
    "author": "YourName",
    "description": "A sample plugin",
    "components": [
        {
            "name": "my-component",
            "nameTr": "My Component",
            "path": "MyComponent.qml"
        }
    ],
    "dlls": [
        "my-plugin.dll"
    ]
}
```

### Step 5: Build and Install

1. Open the project with Qt Creator and build
2. Copy the build artifacts (DLL, QML files, `plugin-info.json`) to `data/plugins/<your-plugin-directory>/`
3. Restart Uniquenium. The plugin will be loaded automatically.

---

## Extending Component Data

Components can save and load custom properties by implementing the `propertyDataEx()` and `loadPropertyDataEx()` methods:

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

## Debugging and Logging

### Outputting Logs

```qml
console.log("[MyPlugin] Component loaded")
console.warn("[MyPlugin] Warning message")
console.error("[MyPlugin] Error message")
```

### Log Location

- The application's log window

---

## Best Practices

1. Use meaningful names for your C++ backend classes, e.g., `TypingFollowerBackend`
2. Component QML files must inherit from `UniDeskComBase`; if they don't inherit, you need to manually implement the members from `UniDeskComBase`
3. Options panels must inherit from `UniDeskWindow`; if they don't inherit, the system default bordered window will be displayed
4. Always interact with the component manager through the `comManager` property
5. Use the `chosen` property to correctly handle the visual appearance of the selected state
6. Extend component data persistence through `propertyDataEx()` / `loadPropertyDataEx()`
7. The URI namespace of QML files follows the `<a>.<b>.<c>` format, but the imports in QML components must remain consistent