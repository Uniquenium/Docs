---
title: UniDeskIcon
editLink: true
---

# UniDeskIcon 类型

图标显示控件，基于 `Image` 实现。通过 `ColorOverlay` 实现图标着色，可以方便地使用 SVG 图标并动态改变颜色。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskIcon.qml` |
| 继承 | QtQuick Image |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 属性

- `property string iconSource`：图标来源路径（支持本地文件、qrc 资源）
- `property color iconColor`：图标着色。通过 `ColorOverlay` 叠加实现
- `property double iconSize`：图标尺寸（宽高相等）。默认：15

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskIcon {
    iconSource: "qrc:/media/img/settings.svg"
    iconColor: UniDeskSettings.primaryColor
    iconSize: 24
}
```

## 备注

- 图标默认居中对齐。
- `iconColor` 为 `transparent` 时显示原图颜色。
- 自动设置 `width` 和 `height` 为 `iconSize`。

## 相关文档

- [UniDeskButton](./UniDeskButton.md) — 使用 UniDeskIcon 作为图标