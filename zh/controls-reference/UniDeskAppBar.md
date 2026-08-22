---
title: UniDeskAppBar
editLink: true
---

# UniDeskAppBar 类型

应用顶栏控件，提供类似 Windows 11 应用标题栏的样式。包含窗口标题、最小化/最大化（还原）/关闭按钮，以及可选的置顶按钮。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskAppBar.qml` |
| 继承 | QtQuick Rectangle |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `""` | 窗口标题 |
| `minimizeText` | `string` | `"最小化"` | 最小化按钮提示文字 |
| `restoreText` | `string` | `"还原"` | 还原按钮提示文字 |
| `maximizeText` | `string` | `"最大化"` | 最大化按钮提示文字 |
| `closeText` | `string` | `"关闭"` | 关闭按钮提示文字 |
| `showDark` | `bool` | `false` | 是否使用深色样式 |
| `showClose` | `bool` | `true` | 显示关闭按钮 |
| `showMinimize` | `bool` | `true` | 显示最小化按钮 |
| `showMaximize` | `bool` | `true` | 显示最大化按钮 |
| `showStayTop` | `bool` | `true` | 显示置顶按钮 |
| `titleVisible` | `bool` | `true` | 标题是否可见 |
| `icon` | `url` | — | 窗口图标 |
| `iconSize` | `int` | `20` | 图标尺寸 |
| `isMac` | `bool` | 自动检测 | 是否为 macOS 平台（只读，由 `UniDeskUtils.isMacos()` 自动判断） |

### 可覆盖的点击处理器

| 属性 | 类型 | 说明 |
|------|------|------|
| `maxClickListener` | `var`（函数） | 最大化按钮点击处理。默认：切换窗口最大化/还原状态 |
| `minClickListener` | `var`（函数） | 最小化按钮点击处理。默认：最小化窗口 |
| `closeClickListener` | `var`（函数） | 关闭按钮点击处理。默认：关闭窗口 |

## 子项别名

| 属性 | 说明 |
|------|------|
| `buttonMinimize` | 最小化按钮（`UniDeskButton`） |
| `buttonMaximize` | 最大化/还原按钮（`UniDeskButton`） |
| `buttonClose` | 关闭按钮（`UniDeskButton`） |
| `layoutStandardbuttons` | 按钮布局容器 |

## 行为

- 自动适配窗口状态：最大化时按钮变为还原图标和文字
- 点击按钮自动触发对应窗口操作（最小化、最大化/还原、关闭）
- 按钮颜色自动适配深浅主题
- 高度：可见时 30px，隐藏时 0px

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskWindow {
    width: 600
    height: 400

    UniDeskAppBar {
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        title: "我的应用"
        showStayTop: false
    }
}
```

## 相关文档

- [UniDeskWindow](./UniDeskWindow.md) — 窗口控件
- [UniDeskButton](./UniDeskButton.md) — 按钮控件