---
title: 模板系统
layout: doc
editLink: true
---

# 模板系统

Uniquenium 的模板系统允许你将当前的组件布局保存为模板，方便快速复用或分享给他人。

## 什么是模板？

**模板（Template）** 是一组组件数据的快照，保存了组件的位置、尺寸、属性值等信息。

模板包含：
- 组件的基本数据（类型、位置、尺寸、层级、透明度等）
- 组件的扩展属性（通过 `propertyDataEx()` 保存的自定义属性）
- 引用的媒体文件（如图片）

模板**不包含**：
- 预设（Preset）逻辑——预设窗口需要用户自行创建
- 组件组的元数据（如组名称、样式等）
- 外部资源文件（模板会自动复制媒体文件到模板目录中）

::: warning 拼写说明
源码中使用的拼写是 "Templete"（而非 "Template"），对应目录为 `templetes/`，类名为 `UniDeskTempleteMgr`。
:::

---

## 模板目录结构

模板存储在 `data/templetes/` 目录下，每个模板是一个子目录：

```
data/templetes/
├── 111/
│   └── data.json
├── 222/
│   ├── data.json
│   ├── media/
│   │   └── 111.png
│   └── PresetWindow.qml    # 可选：预设窗口
└── MyTemplate/
    └── data.json
```

---

## 模板文件格式

### `data.json` 结构

`data.json` 是模板的核心数据文件，包含以下字段：

```json
{
    "name": "模板名称",
    "components": [
        {
            "type": "UDCText",
            "identification": "{3ac9dab4-54bb-4e45-a07b-61a8c7a3b35e}",
            "name": "文字 1",
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
            "fontFamily": "微软雅黑",
            "fontSize": 30,
            "textContent": "Hello World",
            "horizontalAlignment": 4,
            "verticalAlignment": 128
        },
        {
            "type": "UDCImage",
            "identification": "{6e23755f-ebe1-4ec2-ad61-fd73e964c6e0}",
            "name": "图片/按钮 1",
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

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 模板名称 |
| `components` | array | 组件数据数组，每个组件包含类型、位置、属性等信息 |
| `presetWindow` | string | 可选，预设窗口 QML 文件的相对路径 |

### 组件通用属性

每个组件对象包含以下基础属性：

| 属性 | 说明 |
|------|------|
| `type` | 组件类型（如 `UDCText`、`UDCImage`、`Uniquenium.PluginExample`） |
| `identification` | 组件唯一标识符（UUID 格式） |
| `name` | 组件显示名称 |
| `parent` | 父组件标识（`Desktop`、`Wallpaper`、`TopMost` 或其他组件的 `identification`） |
| `pageid` | 所属页面 ID |
| `x`, `y` | 组件位置坐标 |
| `width`, `height` | 组件尺寸 |
| `z` | Z 轴层级 |
| `rotation` | 旋转角度（0-359） |
| `opacity` | 透明度（0-1） |
| 其他 | 组件特有的扩展属性（通过 `propertyDataEx()` 保存） |

### 媒体文件

当组件引用外部媒体文件（如图片）时，模板系统会自动将文件复制到模板目录的 `media/` 子目录，并将路径改为相对路径（如 `media/111_3.png`）。

---

## 导出模板

### 程序导出行为

程序只会导出组件的**数据**部分：

1. 选中一个或多个组件
2. 触发保存模板操作
3. 程序将组件的 JSON 数组写入 `data.json`
4. 自动复制组件引用的媒体文件到模板的 `media/` 目录

::: warning 注意
程序不会导出任何预设（Preset）相关的内容。预设窗口 `PresetWindow.qml` 需要用户自行创建。
:::

### 导出的 `data.json` 示例

```json
{
    "name": "我的模板",
    "components": [
        {
            "type": "UDCText",
            "identification": "{...}",
            "name": "标题文字",
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

## 导入模板

### 加载流程

1. 选择模板目录
2. 如果模板包含 `presetWindow` 字段，会先加载预设窗口收集用户输入
3. 从 `data.json` 读取组件数据
4. 将 `media/` 目录中的媒体文件复制到应用的 `data/media/` 目录（自动处理重命名冲突）
5. 为每个组件重新分配 UUID（避免与现有组件冲突）
6. 应用预设值替换（将 `%{key}` 替换为用户输入的值）
7. 加载组件到画布

---

## 预设系统

### 什么是预设？

预设是一种模板参数化机制，允许模板中包含可替换的变量。当用户加载模板时，会弹出预设窗口让用户填写参数值，这些值会替换模板中对应的变量。

### 在模板中使用预设

在组件的字符串属性中使用 `%{变量名}` 语法来标记预设变量：

```json
{
    "type": "UDCText",
    "textContent": "%{greeting}",
    "fontSize": 24
}
```

当用户提供 `{"greeting": "你好世界"}` 作为预设时，`textContent` 的值将被替换为 `"你好世界"`。

### 创建预设窗口

预设窗口是一个 QML 文件，需要用户**自行创建**。它必须是一个 `UniDeskDialog`，负责收集用户输入并调用 `UniDeskTempleteMgr.loadTemplete()`。

#### `PresetWindow.qml` 示例

```qml
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import UniDesk
import UniDesk.Controls
import UniDesk.Singletons

UniDeskDialog {
    id: presetWindow
    title: qsTr("模板预设")
    autoVisible: false
    autoDestroy: false
    width: 400
    height: 180

    property string templeteDir: ""
    property var comManager: null
    property string variableName: "value"

    UniDeskText {
        id: label
        text: qsTr("请输入") + " " + presetWindow.variableName + ":"
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
            contentText: qsTr("确定")
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
            contentText: qsTr("取消")
            borderWidth: 1
            radius: 5
            onClicked: presetWindow.close()
        }
    }
}
```

### 在 `data.json` 中关联预设窗口

在 `data.json` 中添加 `presetWindow` 字段即可关联预设窗口：

```json
{
    "name": "带预设的模板",
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
如果模板不需要预设功能，可以不创建 `PresetWindow.qml`，也不需要在 `data.json` 中添加 `presetWindow` 字段。
:::

---

## 完整模板示例

### 无预设的简单模板

目录结构：
```
MySimpleTemplate/
└── data.json
```

`data.json`：
```json
{
    "name": "简单模板",
    "components": [
        {
            "type": "UDCText",
            "identification": "{27a30ce1-46ef-4d2e-8e2f-abb4511763b7}",
            "name": "欢迎文字",
            "parent": "Desktop",
            "pageid": "{...}",
            "x": 100,
            "y": 100,
            "width": 300,
            "height": 50,
            "z": 0,
            "rotation": 0,
            "opacity": 1,
            "textContent": "欢迎使用 Uniquenium",
            "fontSize": 24,
            "bold": true
        }
    ]
}
```

### 带预设的模板

目录结构：
```
MyPresetTemplate/
├── data.json
├── media/
│   └── background.png
└── PresetWindow.qml
```

`data.json`：
```json
{
    "name": "带预设的模板",
    "components": [
        {
            "type": "UDCText",
            "identification": "{...}",
            "name": "标题",
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
            "name": "背景图",
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

## 故障排查

### Q: 导入模板后组件无法识别

**A:** 说明模板使用了插件提供的组件类型，而你尚未安装对应插件。检查组件的 `type` 字段（如 `Uniquenium.PluginExample`），安装提供该组件的插件后重试。

### Q: 导入后图片显示为空白

**A:** 可能是媒体文件路径问题：
- 确认模板的 `media/` 目录包含所需图片
- 确认 `data.json` 中 `imagePath` 使用相对路径（如 `media/xxx.png`）

### Q: 预设窗口没有弹出

**A:** 检查：
- `data.json` 中是否包含 `presetWindow` 字段
- `presetWindow` 指向的 QML 文件是否存在
- QML 文件中是否正确调用了 `UniDeskTempleteMgr.loadTemplete()`