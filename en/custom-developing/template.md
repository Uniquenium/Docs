---
title: Template System
layout: doc
editLink: true
---

# Template System

Uniquenium's template system allows you to save the current component layout as a template for quick reuse or sharing with others.

## What is a Template?

A **Template** is a snapshot of a set of component data, storing information such as component positions, sizes, and property values.

A template includes:
- Basic component data (type, position, size, layer, opacity, etc.)
- Extended properties of components (custom properties saved via `propertyDataEx()`)
- Referenced media files (such as images)

A template **does not include**:
- Preset logic — the preset window needs to be created by the user themselves
- Component group metadata (such as group name, style, etc.)
- External resource files (the template will automatically copy media files into the template directory)

::: warning Spelling Note
The source code uses the spelling "Templete" (not "Template"). The corresponding directory is `templetes/` and the class is named `UniDeskTempleteMgr`.
:::

---

## Template Directory Structure

Templates are stored in the `data/templetes/` directory. Each template is a subdirectory:

```
data/templetes/
├── 111/
│   └── data.json
├── 222/
│   ├── data.json
│   ├── media/
│   │   └── 111.png
│   └── PresetWindow.qml    # Optional: preset window
└── MyTemplate/
    └── data.json
```

---

## Template File Format

### `data.json` Structure

`data.json` is the core data file of a template, containing the following fields:

```json
{
    "name": "Template Name",
    "components": [
        {
            "type": "UDCText",
            "identification": "{3ac9dab4-54bb-4e45-a07b-61a8c7a3b35e}",
            "name": "Text 1",
            "parent": "Desktop",
            "pageid": "{948bc674-23c0-426d-9a76-0286d6d178c4}",
            "x": 895,
            "y": 674,
            "width": 100,
            "height": 50,
            "z": 1,
            "rotation": 0,
            "opacity": 1,
            "bold": false,
            "fontFamily": "Microsoft YaHei",
            "fontSize": 30,
            "textContent": "Hello World",
            "horizontalAlignment": 4,
            "verticalAlignment": 128
        },
        {
            "type": "UDCImage",
            "identification": "{6e23755f-ebe1-4ec2-ad61-fd73e964c6e0}",
            "name": "Image/Button 1",
            "parent": "Desktop",
            "pageid": "{948bc674-23c0-426d-9a76-0286d6d178c4}",
            "x": 890,
            "y": 567,
            "width": 282,
            "height": 212,
            "z": 0,
            "rotation": 0,
            "opacity": 1,
            "imagePath": "media/111_3.png",
            "isButton": false,
            "buttonActionType": 0,
            "buttonActionTarget": "",
            "radius": 0,
            "fillMode": 0,
            "smooth": true,
            "mipmap": false
        }
    ],
    "presetWindow": "PresetWindow.qml"
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Template name |
| `components` | array | Array of component data. Each component contains type, position, properties, and other information |
| `presetWindow` | string | Optional, relative path to the preset window QML file |

### Common Component Properties

Each component object contains the following base properties:

| Property | Description |
|----------|-------------|
| `type` | Component type (e.g., `UDCText`, `UDCImage`, `Uniquenium.PluginExample`) |
| `identification` | Unique component identifier (UUID format) |
| `name` | Component display name |
| `parent` | Parent component identifier (`Desktop`, `Wallpaper`, `TopMost`, or the `identification` of another component) |
| `pageid` | ID of the page it belongs to |
| `x`, `y` | Component position coordinates |
| `width`, `height` | Component dimensions |
| `z` | Z-order layer |
| `rotation` | Rotation angle (0-359) |
| `opacity` | Opacity (0-1) |
| Others | Component-specific extended properties (saved via `propertyDataEx()`) |

### Media Files

When a component references an external media file (such as an image), the template system automatically copies the file to the `media/` subdirectory of the template directory and changes the path to a relative path (e.g., `media/111_3.png`).

---

## Exporting a Template

### Program Export Behavior

The program only exports the **data** portion of components:

1. Select one or more components
2. Trigger the save template action
3. The program writes the JSON array of components to `data.json`
4. Automatically copies media files referenced by the components to the template's `media/` directory

::: warning Note
The program does not export any Preset-related content. The preset window `PresetWindow.qml` needs to be created by the user themselves.
:::

### Exported `data.json` Example

```json
{
    "name": "My Template",
    "components": [
        {
            "type": "UDCText",
            "identification": "{...}",
            "name": "Title Text",
            "parent": "Desktop",
            "pageid": "{...}",
            "x": 100,
            "y": 50,
            "width": 200,
            "height": 40,
            "z": 0,
            "rotation": 0,
            "opacity": 1,
            "textContent": "Hello",
            "fontSize": 24
        }
    ]
}
```

---

## Importing a Template

### Loading Flow

1. Select the template directory
2. If the template contains a `presetWindow` field, the preset window is loaded first to collect user input
3. Read component data from `data.json`
4. Copy media files from the `media/` directory to the application's `data/media/` directory (automatically handles rename conflicts)
5. Reassign UUIDs for each component (to avoid conflicts with existing components)
6. Apply preset value substitution (replace `%{key}` with user input values)
7. Load the components onto the canvas

---

## Preset System

### What is a Preset?

A preset is a template parameterization mechanism that allows templates to contain substitutable variables. When a user loads a template, a preset window pops up for the user to fill in parameter values, which replace the corresponding variables in the template.

### Using Presets in a Template

Use the `%{variable name}` syntax in a component's string properties to mark preset variables:

```json
{
    "type": "UDCText",
    "textContent": "%{greeting}",
    "fontSize": 24
}
```

When the user provides `{"greeting": "Hello World"}` as a preset, the value of `textContent` will be replaced with `"Hello World"`.

### Creating a Preset Window

The preset window is a QML file that the user needs to **create themselves**. It must be a `UniDeskDialog` responsible for collecting user input and calling `UniDeskTempleteMgr.loadTemplete()`.

#### `PresetWindow.qml` Example

```qml
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import UniDesk
import UniDesk.Controls
import UniDesk.Singletons

UniDeskDialog {
    id: presetWindow
    title: qsTr("Template Preset")
    autoVisible: false
    autoDestroy: false
    width: 400
    height: 180

    property string templeteDir: ""
    property var comManager: null
    property string variableName: "value"

    UniDeskText {
        id: label
        text: qsTr("Please enter") + " " + presetWindow.variableName + ":"
        font: UniDeskTextStyle.little
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.topMargin: 20
        anchors.leftMargin: 20
    }

    UniDeskTextField {
        id: valueInput
        anchors.top: label.bottom
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.topMargin: 8
        anchors.leftMargin: 20
        anchors.rightMargin: 20
        placeholderText: presetWindow.variableName
        focus: true
        Keys.onReturnPressed: confirmBtn.clicked()
        Keys.onEscapePressed: presetWindow.close()
    }

    RowLayout {
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 15
        anchors.horizontalCenter: parent.horizontalCenter
        spacing: 10

        UniDeskButton {
            id: confirmBtn
            display: Button.TextOnly
            contentText: qsTr("OK")
            borderWidth: 1
            radius: 5
            onClicked: {
                var v = valueInput.text;
                var presets = ({});
                presets[presetWindow.variableName] = v;
                UniDeskTempleteMgr.loadTemplete(presetWindow.templeteDir, presets);
                presetWindow.close();
            }
        }

        UniDeskButton {
            display: Button.TextOnly
            contentText: qsTr("Cancel")
            borderWidth: 1
            radius: 5
            onClicked: presetWindow.close()
        }
    }
}
```

### Linking a Preset Window in `data.json`

Add the `presetWindow` field in `data.json` to link the preset window:

```json
{
    "name": "Template with Preset",
    "components": [
        {
            "type": "UDCText",
            "textContent": "%{value}",
            "fontSize": 30
        }
    ],
    "presetWindow": "PresetWindow.qml"
}
```

::: tip
If the template does not require preset functionality, you do not need to create `PresetWindow.qml` or add the `presetWindow` field in `data.json`.
:::

---

## Complete Template Examples

### Simple Template without Preset

Directory structure:
```
MySimpleTemplate/
└── data.json
```

`data.json`:
```json
{
    "name": "Simple Template",
    "components": [
        {
            "type": "UDCText",
            "identification": "{27a30ce1-46ef-4d2e-8e2f-abb4511763b7}",
            "name": "Welcome Text",
            "parent": "Desktop",
            "pageid": "{...}",
            "x": 100,
            "y": 100,
            "width": 300,
            "height": 50,
            "z": 0,
            "rotation": 0,
            "opacity": 1,
            "textContent": "Welcome to Uniquenium",
            "fontSize": 24,
            "bold": true
        }
    ]
}
```

### Template with Preset

Directory structure:
```
MyPresetTemplate/
├── data.json
├── media/
│   └── background.png
└── PresetWindow.qml
```

`data.json`:
```json
{
    "name": "Template with Preset",
    "components": [
        {
            "type": "UDCText",
            "identification": "{...}",
            "name": "Title",
            "parent": "Desktop",
            "pageid": "{...}",
            "x": 100,
            "y": 50,
            "width": 400,
            "height": 60,
            "z": 0,
            "rotation": 0,
            "opacity": 1,
            "textContent": "%{title}",
            "fontSize": 30,
            "bold": true
        },
        {
            "type": "UDCImage",
            "identification": "{...}",
            "name": "Background Image",
            "parent": "Desktop",
            "pageid": "{...}",
            "x": 50,
            "y": 120,
            "width": 800,
            "height": 400,
            "z": -1,
            "rotation": 0,
            "opacity": 1,
            "imagePath": "media/background.png",
            "fillMode": 0
        }
    ],
    "presetWindow": "PresetWindow.qml"
}
```

---

## Troubleshooting

### Q: Components not recognized after importing a template

**A:** This means the template uses a component type provided by a plugin that you have not installed. Check the `type` field of the component (e.g., `Uniquenium.PluginExample`), install the plugin that provides this component, and try again.

### Q: Images appear blank after importing

**A:** It may be a media file path issue:
- Confirm the template's `media/` directory contains the required images
- Confirm the `imagePath` in `data.json` uses a relative path (e.g., `media/xxx.png`)

### Q: Preset window does not pop up

**A:** Check:
- Whether `data.json` contains the `presetWindow` field
- Whether the QML file pointed to by `presetWindow` exists
- Whether `UniDeskTempleteMgr.loadTemplete()` is correctly called in the QML file