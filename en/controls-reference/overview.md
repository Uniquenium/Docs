---
title: UniDesk Control Library Overview
layout: doc
editLink: true
---

# UniDesk Control Library Overview

UniDesk is a built-in QML control library of Uniquenium, inspired by LingmoUI, providing a set of modern Fluent-style UI controls. Using UniDesk, you can quickly build beautifully designed, uniformly styled desktop application interfaces.

::: tip Read the Glossary First
Before starting, it is recommended to read the [Glossary](/en/glossary.md) to understand the difference between **Control** and **Component**. This page introduces "controls" — the most basic elements that make up the interface.
:::

## System Requirements

Before developing with UniDesk, ensure your environment meets the following requirements:

| Dependency | Minimum Version | Description |
|------------|----------------|-------------|
| **CMake** | 3.25+ | Build system |
| **Qt** | 6.5.0+ | QML engine and Qt Quick (including Core, Widgets, Quick, QuickControls2, etc.) |
| **ECM** | Latest | Extra CMake Modules |
| **C++ Compiler** | C++17 | MSVC 2022 / GCC 13+ / Clang 16+ |

::: tip Learning Suggestion
Before starting, it is recommended to read the [Qt official QML documentation](https://doc.qt.io/qt-6.8/qmlapplications.html) to understand basic QML syntax and concepts.
:::

---

## Development Environment Setup

### Step 1: Get the Source Code

```bash
git clone https://github.com/Uniquenium/Uniquenium.git
cd Uniquenium
git submodule update --init --recursive
```

### Step 2: Configure & Compile

```bash
# Configure (replace with your Qt6 path)
cmake -B build -DCMAKE_PREFIX_PATH="<Your Qt6 installation path>"

# Compile
cmake --build build --config Release
```

### Step 3: Launch the Program

```bash
# Windows:
.\build\Release\Uniquenium0.exe --debug

# Linux:
./build/Uniquenium0 --debug
```

---

## Control Library: UniDesk

### Module Import

Use the following statements at the beginning of QML files to import UniDesk controls:

```qml
// Base module (global singletons: UniDeskGlobals, UniDeskTools, UniDeskSettings...)
import UniDesk 1.0

// UI control module (all visual controls including buttons, text, windows)
import UniDesk.Controls 1.0
```

### Control Classification

Content in UniDesk is divided into two categories:

| Category | Description | Naming Pattern | Examples |
|----------|-------------|----------------|----------|
| **Singleton** | Globally unique instances, accessed directly by name for global state and tools | Any global state/tool | UniDeskGlobals, UniDeskTools, UniDeskSettings |
| **Control** | Instantiable, nestable visual UI elements, the foundation of building components | `UniDesk` + control name | UniDeskButton, UniDeskWindow, UniDeskText |

::: warning Base Classes Removed
Early versions had "base class" concepts like `UniDeskBase` and `UniDeskWindowBase`. The current version has **removed the base class abstraction layer**. All controls now directly inherit from Qt native types (such as `Item`, `Rectangle`, `Window`), without the need for indirect inheritance through base classes. If you see `bases`-related references in old documentation or code, use this page as the standard.
:::

---

## Using Singletons

Singletons are globally unique objects that **do not need to be instantiated** — they can be accessed directly by name in any QML file.

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

Item {
    Component.onCompleted: {
        // Access properties directly
        console.log("Current theme:", UniDeskGlobals.isLight ? "Light" : "Dark")
        console.log("Theme color:", UniDeskSettings.primaryColor)

        // Call methods directly
        UniDeskTools.web_browse("https://github.com/Uniquenium")
        var uuid = UniDeskTools.createUuid()
    }
}
```

General format:
```qml
<singletonName>.<propertyName>
<singletonName>.<functionName>(parameters)
```

---

## Using Controls

Visual controls are used through QML declarative syntax, supporting properties, signals, and nested children. Controls can be used individually or combined to form more complex "components."

```qml
import UniDesk.Controls 1.0

// Parent control
UniDeskWindow {
    id: myWindow
    visible: true
    width: 600
    height: 400
    title: "My Window"

    // Properties
    tintOpacity: 0.85
    showStayTop: true

    // Event (signal) handling
    onActiveChanged: {
        console.log("Window active status:", active)
    }

    // Child controls (nested)
    UniDeskButton {
        id: myBtn
        anchors.centerIn: parent
        contentText: "Click Me"
        iconSource: "qrc:/icon/heart.svg"
        display: Button.TextUnderIcon
        radius: 8

        onClicked: {
            myWindow.showSuccess("Button clicked!", 3000)
        }

        // Nested grandchild control
        UniDeskTooltip {
            text: "This is a button tooltip"
        }
    }
}
```

General pattern:
```qml
<controlName> {
    <propertyName>: <propertyValue>
    <signalName>: { /* handle logic */ }
    <childControlName> { /* ... */ }
}
```

---

## Built-in Singletons Overview

| Singleton | Purpose | Common Content |
|-----------|---------|---------------|
| [UniDeskGlobals](/en/controls-reference/singletons/UniDeskGlobals.md) | Global state | `isLight` theme mode, event notifications |
| [UniDeskTools](/en/controls-reference/singletons/UniDeskTools.md) | Tool functions | Color switching, wallpaper operations, font management, UUID generation |
| [UniDeskSettings](/en/controls-reference/singletons/UniDeskSettings.md) | Settings access | `primaryColor` theme color, various configuration read/write |
| [UniDeskTextStyle](/en/controls-reference/singletons/UniDeskTextStyle.md) | Preset fonts | `tiny` / `little` / `middle` / `big` four font sizes |
| [UniDeskSettingsWindow](/en/controls-reference/singletons/UniDeskSettingsWindow.md) | Settings window | Program settings UI entry |
| [UniDeskComManager](/en/controls-reference/singletons/UniDeskComManager.md) | Component management | Component registration, creation, destruction |

---

## Theme Adaptation Best Practices

All UniDesk controls have built-in dark/light dual themes, but **custom controls require manual adaptation**:

```qml
import UniDesk 1.0

Rectangle {
    id: myCard
    width: 200
    height: 120
    radius: 8

    // Wrong: hardcoded color
    // color: "white"
    // border.color: "black"

    // Correct: use UniDeskGlobals for dynamic judgment
    color: UniDeskGlobals.isLight
        ? Qt.rgba(255/255, 255/255, 255/255, 1)
        : Qt.rgba(32/255, 32/255, 32/255, 1)

    border.color: UniDeskGlobals.isLight
        ? Qt.rgba(0, 0, 0, 0.1)
        : Qt.rgba(1, 1, 1, 0.1)

    // Accent color always uses theme color
    Rectangle {
        width: 4
        height: parent.height
        color: UniDeskSettings.primaryColor
    }
}
```

For more precise color control, use `UniDeskTools.switchColor()`:

```qml
import UniDesk 1.0

property color textNormalColor: UniDeskGlobals.isLight ? "black" : "white"
property color textHoverColor:  UniDeskGlobals.isLight ? textNormalColor.darker(1.2) : textNormalColor.lighter(1.2)
property color textPressColor:  UniDeskGlobals.isLight ? textNormalColor.darker(1.5) : textNormalColor.lighter(1.5)
property color textDisableColor: "#888888"

property color finalColor: UniDeskTools.switchColor(
    textNormalColor, textHoverColor, textPressColor, textDisableColor,
    hovered, pressed, disabled
)
```

---

## Control Documentation Index

View detailed API documentation for each control by functional category:

### Singletons
- [UniDeskGlobals](/en/controls-reference/singletons/UniDeskGlobals.md)
- [UniDeskTools](/en/controls-reference/singletons/UniDeskTools.md)
- [UniDeskSettings](/en/controls-reference/singletons/UniDeskSettings.md)
- [UniDeskTextStyle](/en/controls-reference/singletons/UniDeskTextStyle.md)
- [UniDeskComManager](/en/controls-reference/singletons/UniDeskComManager.md)
- [UniDeskSettingsWindow](/en/controls-reference/singletons/UniDeskSettingsWindow.md)

### Windows & Containers
- [UniDeskWindow](/en/controls-reference/UniDeskWindow.md) - Frameless acrylic window
- [UniDeskDialog](/en/controls-reference/UniDeskDialog.md) - Dialog
- [UniDeskFrame](/en/controls-reference/UniDeskFrame.md) - Group container / card
- [UniDeskAcrylic](/en/controls-reference/UniDeskAcrylic.md) - Acrylic blur effect
- [UniDeskAppBar](/en/controls-reference/UniDeskAppBar.md) - Application top bar
- [UniDeskShadow](/en/controls-reference/UniDeskShadow.md) - Shadow effect

### Button Controls
- [UniDeskButton](/en/controls-reference/UniDeskButton.md) - Standard button (icon + text)
- [UniDeskTextButton](/en/controls-reference/UniDeskTextButton.md) - Text-only button
- [UniDeskIcon](/en/controls-reference/UniDeskIcon.md) - Icon-only display

### Input Controls
- [UniDeskTextField](/en/controls-reference/UniDeskTextField.md) - Single-line text input
- [UniDeskTextArea](/en/controls-reference/UniDeskTextArea.md) - Multi-line text area
- [UniDeskSpinBox](/en/controls-reference/UniDeskSpinBox.md) - Numeric spin box
- [UniDeskComboBox](/en/controls-reference/UniDeskComboBox.md) - Dropdown selection
- [UniDeskFontBox](/en/controls-reference/UniDeskFontBox.md) - Font selector
- [UniDeskPathSelector](/en/controls-reference/UniDeskPathSelector.md) - File/directory path selector
- [UniDeskColorPicker](/en/controls-reference/UniDeskColorPicker.md) - Color picker
- [UniDeskSlider](/en/controls-reference/UniDeskSlider.md) - Slider
- [UniDeskHotkeyPicker](/en/controls-reference/UniDeskHotkeyPicker.md) - Shortcut picker

### Selection Controls
- [UniDeskCheckBox](/en/controls-reference/UniDeskCheckBox.md) - Checkbox
- [UniDeskRadioButton](/en/controls-reference/UniDeskRadioButton.md) - Radio button

### Text & Display
- [UniDeskText](/en/controls-reference/UniDeskText.md) - Text label
- [UniDeskImage](/en/controls-reference/UniDeskImage.md) - Image display
- [UniDeskChart](/en/controls-reference/UniDeskChart.md) - Data chart
- [UniDeskTooltip](/en/controls-reference/UniDeskTooltip.md) - Floating tooltip
- [UniDeskInfoBar](/en/controls-reference/UniDeskInfoBar.md) - Info bar
- [UniDeskMessageBox](/en/controls-reference/UniDeskMessageBox.md) - Message dialog

### Navigation & Tabs
- [UniDeskTabBar](/en/controls-reference/UniDeskTabBar.md) - Tab bar
- [UniDeskTabButton](/en/controls-reference/UniDeskTabButton.md) - Tab button

### Menu System
- [UniDeskMenu](/en/controls-reference/UniDeskMenu.md) - Pop-up menu
- [UniDeskMenuItem](/en/controls-reference/UniDeskMenuItem.md) - Menu item
- [UniDeskMenuSeparator](/en/controls-reference/UniDeskMenuSeparator.md) - Menu separator

### Position & Size Selection
- [UniDeskPosSelector](/en/controls-reference/UniDeskPosSelector.md) - Position selector
- [UniDeskSizeSelector](/en/controls-reference/UniDeskSizeSelector.md) - Size selector

### Component Editor Specific
- [UniDeskComBase](/en/controls-reference/UniDeskComBase.md) - Component base (for Uniquenium visual editor)
- [UniDeskComBox](/en/controls-reference/UniDeskComBox.md) - Component container box
- [UniDeskComBasicOptions](/en/controls-reference/UniDeskComBasicOptions.md) - Component basic options panel
- [UniDeskComRectEditor](/en/controls-reference/UniDeskComRectEditor.md) - Component rectangle editor
- [UniDeskComManager](/en/controls-reference/singletons/UniDeskComManager.md) - Component manager

### Base Object
- [UniDeskObject](/en/controls-reference/UniDeskObject.md) - Object base class

---

## Next Steps

- Want to understand term distinctions? Read the [Glossary](/en/glossary.md)
- Want to develop plugin extensions? Read the [Plugin Development Guide](/en/custom-developing/plugin.md)
- Want to share page layouts? Read the [Template System](/en/custom-developing/template.md)
- Encountered issues during use? Check the [FAQ](/en/faq.md)