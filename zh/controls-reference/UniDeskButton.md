---
title: UniDeskButton
editLink: true
---

# UniDeskButton 类型

多功能按钮控件，支持图标、文字、图标+文字、文字下方图标四种显示模式，具有完整的悬停/按下/禁用状态颜色管理，并内置 Tooltip 提示。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskButton.qml` |
| 继承 | QtQuick Button |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 属性

### 内容
- `property string contentText`：按钮文字内容
- `property string iconSource`：图标来源路径（本地文件或 qrc 资源）
- `property int display`：显示模式（对应 `Button` 的 display 枚举）
  - `Button.IconOnly` (0)：仅图标（默认）
  - `Button.TextOnly` (1)：仅文字
  - `Button.TextBesideIcon` (2)：文字在图标旁
  - `Button.TextUnderIcon` (3)：文字在图标下

### 外观
- `property double radius`：圆角半径。默认：3
- `property double iconSize`：图标尺寸。默认：15
- `property double borderWidth`：边框宽度。默认：0
- `property color borderColor`：边框颜色。默认跟随主题
- `property double horizontalPadding`：水平内边距。默认：10
- `property double verticalPadding`：垂直内边距。默认：10
- `property font font`：字体。默认：`UniDeskTextStyle.tiny`

### 颜色状态（背景）
- `property color bgNormalColor`：正常状态背景色。默认：透明
- `property color bgHoverColor`：悬停状态背景色。默认根据主题自动计算
- `property color bgPressColor`：按下状态背景色。默认根据主题自动计算
- `property color bgDisableColor`：禁用状态背景色。默认：透明
- `property color bgColor`（只读）：当前实际背景色，由 `UniDeskTools.switchColor` 自动切换

### 颜色状态（图标）
- `property color iconNormalColor`：正常图标颜色。默认：黑色
- `property color iconHoverColor`：悬停图标颜色
- `property color iconPressColor`：按下图标颜色
- `property color iconDisableColor`：禁用图标颜色。默认：灰色
- `property color iconColor`（只读）：当前实际图标色，由 `switchColor` 自动切换

### 颜色状态（文字）
- `property color textNormalColor`：正常文字颜色。默认跟随主题
- `property color textHoverColor`：悬停文字颜色
- `property color textPressColor`：按下文字颜色
- `property color textDisableColor`：禁用文字颜色。默认：灰色
- `property color textColor`（只读）：当前实际文字色，由 `switchColor` 自动切换

## 示例

```qml
import UniDesk.Controls 1.0

// 图标按钮
UniDeskButton {
    display: Button.IconOnly
    iconSource: "qrc:/media/img/close.svg"
    onClicked: console.log("clicked")
}

// 文字按钮
UniDeskButton {
    display: Button.TextOnly
    contentText: "确定"
    bgNormalColor: UniDeskSettings.primaryColor
    textNormalColor: "white"
}

// 图标+文字
UniDeskButton {
    display: Button.TextBesideIcon
    iconSource: "qrc:/media/img/settings.svg"
    contentText: "设置"
}
```

## Tooltip

当按钮为 `IconOnly` 模式且 `contentText` 非空时，悬停 2 秒后自动显示 Tooltip 提示文字。

## 无障碍

自动设置 `Accessible.role`、`Accessible.name`、`Accessible.description` 和 `Accessible.onPressAction`。

## 相关文档

- [UniDeskIcon](./UniDeskIcon.md) — 按钮使用的图标控件
- [UniDeskText](./UniDeskText.md) — 按钮使用的文字控件
- [UniDeskTextButton](./UniDeskTextButton.md) — 简化版文字按钮
- [UniDeskComboBox](./UniDeskComboBox.md) — 继承自 UniDeskButton 的下拉框