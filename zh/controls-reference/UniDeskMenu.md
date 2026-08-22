---
title: UniDeskMenu
editLink: true
---

# UniDeskMenu 类型

弹出菜单控件，基于 QtQuick `Menu` 实现。提供半透明毛玻璃背景、圆角边框和淡入淡出动画。支持滚动（内容超出窗口时自动显示滚动条）。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskMenu.qml` |
| 继承 | QtQuick Templates Menu |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `comManager` | `var` | 组件管理器引用，菜单关闭时调用 `comManager.menuClosed()` |

## 样式

- 半透明背景（浅色 70% 白色 / 深色 70% 黑色）
- 边框宽度 1px，颜色自动适配深浅主题
- 圆角 3px
- 内容超出窗口时可滚动，带垂直滚动条

## 行为

- `enter` 动画：淡入（100ms）
- `exit` 动画：淡出（100ms）
- `closePolicy`：支持 ESC 键关闭和外部点击关闭
- 菜单关闭时自动调用 `comManager.menuClosed()`（如果设置了 `comManager`）

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskMenu {
    id: contextMenu
    comManager: comManager

    UniDeskMenuItem {
        text: "复制"
        onTriggered: console.log("复制")
    }
    UniDeskMenuItem {
        text: "粘贴"
        onTriggered: console.log("粘贴")
    }
}

// 右键触发
MouseArea {
    anchors.fill: parent
    onClicked: contextMenu.popup(parent)
}
```

## 相关文档

- [UniDeskMenuItem](./UniDeskMenuItem.md) — 菜单项
- [UniDeskMenuSeparator](./UniDeskMenuSeparator.md) — 菜单分隔线