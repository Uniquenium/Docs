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

### Component Type ID

The component type ID is composed of `author`, `id`, and component `name` from `plugin-info.json`:

```
{author}.{id}.{component_name}
```

For example: `Uniquenium-Official.uniquenium-official-plugin.typing-follower`. The main program uses this ID to identify and load components.

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

### Runtime Directory Structure

Each plugin is installed as a subdirectory under `data/plugins/`:

```
data/plugins/
├── uniquenium-official-plugin/    # Official plugin
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
└── uq-plugin-example/             # Example plugin (folder name can differ from id)
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

### Source Project Structure

```
uq-plugin-example/
├── CMakeLists.txt                  # Build configuration
├── Plugin.h / Plugin.cpp            # Plugin entry point, registers QML types
├── BackendAll.h / BackendAll.cpp    # Singleton translation manager
├── UniDeskPluginInterface.h         # Interface header copied from main program
├── singleton.h / stdafx.h           # Helper macro definitions
├── ExamplePlugin/                   # Component module (can have multiple)
│   ├── ExamplePlugin.qml           # Component QML
│   ├── ExamplePluginOptions.qml     # Component options panel
│   ├── ExamplePluginBackend.h       # Backend header
│   ├── ExamplePluginBackend.cpp     # Backend implementation
│   └── qmldir                      # QML module definition
├── Settings.qml                    # Plugin settings page
├── SignalHandler.qml                # Signal handler
├── plugin-info.json                # Plugin metadata
├── defaultSettings.json             # Plugin default settings
├── translations/                   # Translation files
│   ├── BackendAll_zh_CN.ts
│   └── BackendAll_en_US.ts
├── media/                          # Resource files (images, etc.)
├── deploy.bat                      # Packaging script
└── README.md
```

---

## Plugin Metadata (`plugin-info.json`)

`plugin-info.json` is the core configuration file that tells Uniquenium the basic information about the plugin.

### Field Descriptions

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `id` | Yes | string | Unique plugin ID, used for settings isolation and component type ID |
| `name` | Yes | string | Plugin display name |
| `version` | Yes | string | Semantic version number |
| `author` | Yes | string | Author name or team, participates in component type ID composition |
| `description` | Yes | string | Plugin description |
| `components` | Yes | array | List of components provided by the plugin |
| `dlls` | Yes | array | List of DLL files the plugin depends on |
| `settings` | No | string | Path to the settings QML file; when specified the main program shows a settings button |
| `signals` | No | string | Path to the signal handler QML file |

### `components[]` Fields

Each component object contains:

| Field | Description |
|-------|-------------|
| `name` | Component type identifier (e.g., `"example-plugin"`), participates in component type ID composition |
| `nameTr` | Component display name (e.g., `"Example Plugin"`) |
| `path` | Relative path to the QML component file (e.g., `"ExamplePlugin/ExamplePlugin.qml"`) |

### Full Example

```json
{
    "id": "uqPluginExample",
    "name": "Uniquenium Plugin Example",
    "version": "1.0.0",
    "author": "Uniquenium",
    "description": "UQ Qt plugin example",
    "settings": "Settings.qml",
    "signals": "SignalHandler.qml",
    "components": [
        {
            "name": "example-plugin",
            "nameTr": "Example Plugin",
            "path": "ExamplePlugin/ExamplePlugin.qml"
        }
    ],
    "dlls": [
        "uqPluginExample.dll"
    ]
}
```

---

## Creating a Plugin from the Template Repository

The fastest way is to use the official `uq-plugin-example` template repository:

```bash
# Clone the template repository
git clone https://github.com/Uniquenium/uq-plugin-example.git my-plugin
cd my-plugin

# Modify PLUGIN_NAME in CMakeLists.txt
# Modify id, name, author, etc. in plugin-info.json
```

### Files to Modify

| File | What to Modify |
|------|----------------|
| `CMakeLists.txt` | `PLUGIN_NAME`, `PLUGIN_VERSION`, `find_package` dependencies |
| `plugin-info.json` | `id`, `name`, `author`, `description`, `components` |
| `Plugin.cpp` | Types registered in `registerQmlTypes()` |
| `ExamplePlugin/` | Rename to your component name, update QML and backend class names |
| `Settings.qml` | `pluginId` property, settings content |
| `SignalHandler.qml` | `pluginId` reference |
| `deploy.bat` | No changes needed, automatically reads `plugin-info.json` |
| `translations/*.ts` | Update translation content |
| `defaultSettings.json` | Modify default settings |

---

## Creating a Plugin from Scratch

### Step 1: Create a C++ Plugin Project

Copy `UniDeskPluginInterface.h` from the main program into the project.

#### `CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 3.16)

set(PLUGIN_NAME myPlugin)
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

# Translation files
set(TS_FILES
    ${CMAKE_CURRENT_SOURCE_DIR}/translations/BackendAll_zh_CN.ts
    ${CMAKE_CURRENT_SOURCE_DIR}/translations/BackendAll_en_US.ts
)

# Scan C++ source files
file(GLOB CPP_FILES *.cpp */*.cpp)
foreach (filepath ${CPP_FILES})
    string(REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" filename ${filepath})
    list(APPEND sources_files ${filename})
    list(APPEND include_dirs ${filepath})
endforeach ()

# Scan header files
file(GLOB H_FILES *.h */*.h)
foreach (filepath ${H_FILES})
    string(REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" filename ${filepath})
    list(APPEND include_dirs ${filepath})
    list(APPEND sources_files ${filename})
endforeach ()

# Scan QML files (excluding build/dist/translations directories)
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

# Scan resource files (images, etc., excluding build/dist directories)
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

# Translation compilation
qt_add_translations(${PLUGIN_NAME}
    TS_FILES ${TS_FILES}
    SOURCES ${sources_files} ${qml_files}
    RESOURCE_PREFIX "/uq/myPlugin/i18n"
)

# Automatically run lupdate to update translations
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

# QML module registration
qt6_add_qml_module(${PLUGIN_NAME}
    URI org.uq.${PLUGIN_NAME}
    OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/temp/bin"
    VERSION ${PLUGIN_VERSION}
    QML_FILES ${qml_files}
    RESOURCE_PREFIX "/uq/myPlugin"
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

::: warning CMakeLists.txt Key Points
- `RESOURCE_PREFIX` must be consistent with the path in `BackendAll::retranslate()`
- QML file scanning must exclude `build/`, `dist/`, and `translations/` directories
- The `PLUGIN_NAME` macro is passed to C++ code via `add_compile_definitions`
- URI format is `org.uq.{PLUGIN_NAME}`, and imports in QML must match
- `PLUGIN_NAME` must use camelCase (no hyphens), as it is used in the QML module URI
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
`PLUGIN_NAME` is a macro defined by `add_compile_definitions` in `CMakeLists.txt` with the value from `set(PLUGIN_NAME ...)`. Use this macro to construct the URI in `Plugin.cpp`.
:::

---

## Creating a Component

Each component is a subdirectory under the plugin, containing QML files, a backend class, and a `qmldir` definition.

### Step 1: Create the Component Directory

```
MyPlugin/
└── MyComponent/
    ├── MyComponent.qml          # Main component QML
    ├── MyComponentOptions.qml   # Component options panel
    ├── MyBackend.h               # C++ backend header
    ├── MyBackend.cpp             # C++ backend implementation
    └── qmldir                   # QML module definition
```

### Step 2: Write `qmldir`

```
module org.uq.myPlugin.MyComponent
MyComponent 1.0 MyComponent.qml
MyComponentOptions 1.0 MyComponentOptions.qml
```

::: tip
The module name in `qmldir` follows the format `org.uq.{plugin_name}.{component_directory}`. This file is deleted during packaging (the main program loads QML files directly by path), but it is used for code completion in Qt Creator during development.
:::

### Step 3: Write the C++ Backend

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

### Step 4: Write the Component QML

The component must inherit from `UniDeskComBase` and link to the options panel via the `optionsWindow` property.

```qml
import QtQuick
import QtQuick.Controls
import UniDesk
import UniDesk.Controls
import org.uq.myPlugin 1.0

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
- Must inherit `UniDeskComBase`, otherwise it cannot be correctly recognized and managed by the main program
- The `chosen` property handles the visual appearance of the selected state; keep the写法 from the example
- `optionsWindow` must point to your options panel component
- The import URI must match the one in `qt6_add_qml_module` in `CMakeLists.txt`
:::

### Step 5: Write the Component Options Panel

The options panel must inherit from `UniDeskWindow`.

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

## Plugin Settings

### Overview

Plugins can have independent settings pages, using the main program's `UniDeskSettings` singleton for storage. Plugin settings are isolated from main program settings via the `pluginId` parameter and stored in separate JSON files.

### Settings Storage Path

Plugin settings are stored at `data/plugins/{pluginId}/settings.json`, automatically managed by the main program. No manual read/write is required.

### Create the Settings Page `Settings.qml`

Create `Settings.qml` in the plugin root directory:

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
import org.uq.myPlugin 1.0

UniDeskWindow {
    id: window
    width: 1000
    height: 700
    title: qsTr("Example Plugin Settings")
    autoVisible: false
    showMinimize: false
    showMaximize: false
    autoDestroy: false

    readonly property string pluginId: "myPlugin"

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

::: tip Using UniDeskSettings
- `UniDeskSettings.get(key, pluginId)` - Read a plugin setting
- `UniDeskSettings.set(key, value, pluginId)` - Write a plugin setting
- The `pluginId` parameter takes the `id` field value from `plugin-info.json`
- Omitting `pluginId` operates on main program settings
:::

### Set Default Values `defaultSettings.json`

Create `defaultSettings.json` in the plugin root directory to define default settings:

```json
{
    "language": "zh_CN"
}
```

When loading a plugin, the main program automatically reads this file and registers the default values to `UniDeskSettings`.

### Enable the Settings Button

Add a `settings` field in `plugin-info.json` pointing to the settings page:

```json
{
    "settings": "Settings.qml"
}
```

When the main program detects the `settings` field, it displays a settings button in the plugin details.

---

## Loading Resource Files

### Using the `pluginDir` Property

`UniDeskComBase` provides the `pluginDir` property, which points to the absolute path of the plugin where the component resides. It is automatically obtained in `Component.onCompleted` and can be used directly to load resource files.

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

::: warning Resource Paths
- Use the `pluginDir` property to load resources with the format `"file:" + pluginDir + "/relative_path"`
- Do not use `qrc:/` paths, as plugin resource paths are unstable after compilation
- `pluginDir` is obtained via `UniDeskPluginMgr.getPluginDir()` in `Component.onCompleted`
- If `pluginDir` is empty (theoretically impossible), `|| ""` ensures the expression is valid
:::

### Add Resource Files to the Build

In `CMakeLists.txt`, resource files in the `media/` directory are automatically scanned:

```cmake
set(RES_PATHS "")
list(APPEND RES_PATHS media)
# ... scans *.png *.jpg *.svg, etc. under media
```

### Packaging Resource Files

When running `deploy.bat`, resource files from the build artifacts are automatically copied to the `dist/{pluginId}/media/` directory.

---

## Setting the Language (Translation Support)

### Overview

Plugins manage translations through the `BackendAll` singleton, using Qt's `QTranslator` and `qtAdd_translations` to implement multi-language support.

### Architecture Diagram

```
Main Program                     Plugin
┌─────────────────┐            ┌──────────────────────┐
│ UniDeskSettings │──get/set──▶│ Settings.qml         │
│  (language key) │            │   Modify language     │
└─────────────────┘            └──────────┬───────────┘
                                           │ onLanguageChanged
                                           ▼
┌─────────────────┐            ┌──────────────────────┐
│ UniDeskPluginMgr│──signal───▶│ SignalHandler.qml    │
│ (languageChanged)│           │   Receive signal      │
└─────────────────┘            └──────────┬───────────┘
                                           │ BackendAll.retranslate()
                                           ▼
                              ┌──────────────────────┐
                              │ BackendAll singleton  │
                              │   Load translation    │
                              │   Refresh QML engine  │
                              └──────────┬───────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │ qsTr() auto-translate│
                              │   All text updated   │
                              └──────────────────────┘
```

### Step 1: Create Translation Source Files

Create `.ts` files in the `translations/` directory:

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
The `source` field of `.ts` files is automatically updated by `lupdate` during build. The `translation` field needs to be filled in manually or edited with Qt Linguist.
:::

### Step 2: Create the BackendAll Singleton

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
        m_translator->load(":/uq/myPlugin/i18n/BackendAll_" + language);
        engine->retranslate();
    }
}
```

::: warning Path Consistency
The resource path prefix in `BackendAll::retranslate()` must match the `RESOURCE_PREFIX` in `qt_add_translations` in `CMakeLists.txt`.
:::

### Step 3: Create the Signal Handler `SignalHandler.qml`

Create `SignalHandler.qml` in the plugin root directory to receive language change signals from the main program:

```qml
import QtQuick
import UniDesk
import UniDesk.Controls
import UniDesk.Singletons
import org.uq.myPlugin 1.0

UniDeskPluginSignals {
    id: signalHandlerSignals

    Component.onCompleted: {
        var lang = UniDeskSettings.get("language", "myPlugin") || "zh_CN"
        BackendAll.retranslate(signalHandlerSignals, lang)
    }

    onLanguageChanged: {
        var lang = UniDeskSettings.get("language", "myPlugin") || "zh_CN"
        BackendAll.retranslate(signalHandlerSignals, lang)
    }
}
```

### Step 4: Register the Signal Handler in `plugin-info.json`

```json
{
    "signals": "SignalHandler.qml"
}
```

### Step 5: Use Translations in QML

Use `qsTr()` to wrap all user-visible text in all QML files:

```qml
Text {
    text: qsTr("Hello World")
}

Button {
    text: qsTr("Click Me")
}
```

`qsTr()` automatically looks up translations based on the current language and displays the corresponding text.

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

## Packaging and Installation

### Using `deploy.bat`

```batch
deploy.bat                              :: Normal packaging (auto-finds temp/bin under build/)
deploy.bat --clean                      :: Clean the dist directory before packaging
deploy.bat --build-dir <path>           :: Specify the build output directory
deploy.bat --build-dir=<path>           :: Use equals sign to specify the build output directory
deploy.bat -b <path>                    :: Short form for specifying the build output directory
deploy.bat "<path>"                     :: Pass the path directly as the first argument
```

**Examples of specifying the build output directory:**
```batch
deploy.bat --build-dir "build\Qt_MSVC2022_64bit-Release\temp\bin"
deploy.bat -b "build\Qt_MSVC2022_64bit-Release\temp\bin"
deploy.bat "build\Qt_MSVC2022_64bit-Release\temp\bin"
```

The packaging script will:
1. First look for `temp/bin/` directory under `build/` as the build output
2. Read DLL name from the `dlls` field in `plugin-info.json`
3. Read plugin ID from the `id` field in `plugin-info.json`
4. Copy DLL and QML files to `dist/{pluginId}/`
5. Copy `plugin-info.json`, `defaultSettings.json`, `SignalHandler.qml`, etc. from the source directory
6. Exclude `qmldir`, `.qmltypes`, `.qrc`, and build artifact files

### Manual Installation

1. Run `deploy.bat` to generate the `dist/{pluginId}/` directory
2. Copy that directory to one of the following locations:
   - `<Uniquenium installation directory>/data/plugins/{pluginId}/`
   - `%APPDATA%/Uniquenium/Plugins/{pluginId}/`
3. Restart Uniquenium

---

## Notes

### Development Standards

1. **Inherit UniDeskComBase**: Component QML must inherit `UniDeskComBase`, otherwise it cannot be managed by the main program
2. **Inherit UniDeskWindow**: Options panels must inherit `UniDeskWindow`; otherwise the system default bordered window will be displayed
3. **URI Consistency**: The URI in `CMakeLists.txt`, the import in QML, and the module name in `qmldir` must be consistent
4. **qsTr() Wrapping**: All user-visible text must be wrapped with `qsTr()` to support translation
5. **chosen Property**: Must use `chosen: comManager.selectMode === UniDeskComponentSelectMode.NoSelect ? (optionsWindow.visible) : selected`
6. **pluginDir**: Use the `pluginDir` property to load external resources, do not hardcode paths

### Frequently Asked Questions

#### Q: Component fails to load, console shows "Plugin does not implement PluginInterface"

Ensure the `Plugin` class correctly inherits from `UniDeskPluginInterface` and declares `Q_PLUGIN_METADATA` and `Q_INTERFACES`.

#### Q: DLL fails to load

Check that the file name specified in the `dlls` field of `plugin-info.json` matches the actual DLL file name.

#### Q: Settings button not showing

Ensure `plugin-info.json` contains a `settings` field and the `Settings.qml` file exists in the plugin directory.

#### Q: Resource images cannot be loaded

Ensure you use the `"file:" + pluginDir + "/media/xxx.png"` format to load resources, do not use `qrc:` paths.

#### Q: Translation not working

Check:
- The path prefix in `BackendAll::retranslate()` matches the `RESOURCE_PREFIX` in `CMakeLists.txt`
- `SignalHandler.qml` is correctly registered in `plugin-info.json`
- Text wrapped with `qsTr()` has a corresponding translation in the `.ts` file

#### Q: `PLUGIN_NAME` is undefined

The `PLUGIN_NAME` macro is defined by `add_compile_definitions` in `CMakeLists.txt`. If the IDE shows it as undefined during editing, this is normal — the macro is injected by CMake at build time.

#### Q: How to manage multiple components

Create an independent subdirectory and `qmldir` for each component. Register all backend types in `Plugin.cpp` and add all component entries to the `components` array in `plugin-info.json`.

#### Q: How to debug a plugin

Open the plugin project in Qt Creator and compile. Copy the build artifacts to the main program's `data/plugins/` directory, then start the main program to view the plugin loading log. The main program's log window shows the plugin loading status.

#### Q: How should I name the directory, plugin ID, and PLUGIN_NAME

The three have different naming rules and purposes:

| Name | Purpose | Naming Rules | Example |
|------|---------|-------------|---------|
| **Directory name** | Source project folder name, installation directory name | Hyphens allowed, no special restrictions | `uq-plugin-example` |
| **`id`** (plugin-info.json) | Settings isolation, component type ID composition | CamelCase recommended, no hyphens | `uqPluginExample` |
| **`PLUGIN_NAME`** (CMakeLists.txt) | QML module URI (`org.uq.{name}`) | CamelCase, **no hyphens allowed** | `uqPluginExample` |

::: warning
`PLUGIN_NAME` and the `id` in `plugin-info.json` cannot use hyphens (`-`) because they are used in QML module URIs (e.g., `import org.uq.uqPluginExample 1.0`), and QML import syntax does not support hyphens.
:::

---

## Best Practices

1. Use meaningful names for C++ backend classes, e.g., `ExamplePluginBackend`
2. Use an independent subdirectory for each component for easier management and maintenance
3. Define reasonable default values using `defaultSettings.json`
4. Keep the information in `plugin-info.json` accurate and complete
5. Use the `pluginDir` property to load external resource files
6. Extend component data persistence through `propertyDataEx()` / `loadPropertyDataEx()`
7. Always use the `pluginId` parameter to isolate plugin settings from main program settings
8. Keep the `source` field in translation files as the English original, and the `translation` field as the target language

---

## Related References

- [UniDeskComBase Control](/controls-reference/UniDeskComBase.md): Component base class API documentation
- [UniDeskSettings Singleton](/controls-reference/singletons/UniDeskSettings.md): Settings storage API
- [Template System](/custom-developing/template.md): Template development guide
- [Custom Cursor](/custom-developing/cursor-style.md): Using custom cursors in plugins