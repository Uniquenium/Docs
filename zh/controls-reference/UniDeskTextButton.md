---
title: UniDeskTextButton
editLink: true
---

# UniDeskTextButton 类型

简化版文字按钮，背景透明，文字带悬停/按下状态高亮。常用于工具栏按钮、链接按钮等轻量场景。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskTextButton.qml` |
| 继承 | QtQuick Button |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 属性

- `property bool disabled`：是否禁用。默认：`false`
- `property string contentDescription`：无障碍描述文字
- `property color normalColor`：正常颜色。默认取 `UniDeskSettings.primaryColor`
- `property color hoverColor`：悬停颜色。默认根据主题自动变亮/变暗
- `property color pressedColor`：按下颜色。默认根据主题自动变亮/变暗更多
- `property color disableColor`：禁用颜色。默认 `normalColor.darker(3.3)`
- `property bool textBold`：文字是否加粗。默认：`true`
- `property url webLink`：点击时打开的网页链接。设置后点击自动用系统浏览器打开

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskTextButton {
    text: "GitHub"
    webLink: "https://github.com"
}

UniDeskTextButton {
    text: "保存"
    onClicked: saveData()
}
```

## 备注

- 按钮背景始终透明，仅文字有颜色变化。
- 设置 `webLink` 后，点击会自动调用 `UniDeskTools.web_browse()` 打开链接。
- 文字颜色通过 `UniDeskTools.switchColor()` 自动根据状态切换。

## 相关文档

- [UniDeskButton](./UniDeskButton.md) — 功能更完整的按钮控件
- [UniDeskTools](./cpp-ext/UniDeskTools.md) — `web_browse()` 方法