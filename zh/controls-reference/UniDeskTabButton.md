---
title: UniDeskTabButton
editLink: true
---

# UniDeskTabButton 类型

标签按钮控件，基于 QtQuick `TabButton` 实现。自定义了选中状态（主题色背景）、悬停/按下状态和禁用状态的颜色管理。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskTabButton.qml` |
| 继承 | QtQuick TabButton |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

- `property bool disabled`：是否禁用
- `property color bgNormalColor`：正常背景色。默认：透明
- `property color bgHoverColor`：悬停背景色
- `property color bgPressColor`：按下背景色
- `property color bgDisableColor`：禁用背景色

## 自定义样式

- 圆角 3px 矩形背景
- 选中时显示主题色背景
- 文字使用 `UniDeskTextStyle.little` 字体
- 边框根据主题自适应

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskTabButton {
    text: "常规"
    checked: true
}
```

## 相关文档

- [UniDeskTabBar](./UniDeskTabBar.md) — 标签栏
- [UniDeskButton](./UniDeskButton.md) — 通用按钮