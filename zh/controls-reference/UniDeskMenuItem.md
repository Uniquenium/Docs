---
title: UniDeskMenuItem
editLink: true
---

# UniDeskMenuItem 类型

菜单项控件，基于 QtQuick `MenuItem` 实现。支持图标、子菜单箭头、选中标记和高亮状态。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskMenuItem.qml` |
| 继承 | QtQuick Templates MenuItem |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `disabled` | `bool` | `false` | 是否禁用 |
| `iconDelegate` | `Component` | — | 图标委托（默认为内部图标组件） |
| `iconSpacing` | `int` | `5` | 图标与文字间距 |
| `iconSource` | `string` | — | 图标源路径 |
| `iconSize` | `int` | `16` | 图标尺寸 |
| `textColor` | `color` | 自适应主题 | 文字颜色 |

## 样式

- 默认高度根据内容自适应
- 悬停时（`highlighted`）显示主题色背景
- 字体使用 `UniDeskTextStyle.little`
- 支持选中标记（`checkable`）和子菜单箭头

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskMenu {
    UniDeskMenuItem {
        text: "打开"
        iconSource: "qrc:/media/img/folder.svg"
        onTriggered: console.log("打开")
    }
    UniDeskMenuItem {
        text: "另存为"
        iconSource: "qrc:/media/img/save.svg"
    }
    UniDeskMenuSeparator {}
    UniDeskMenuItem {
        text: "退出"
        onTriggered: Qt.quit()
    }
}
```

## 相关文档

- [UniDeskMenu](./UniDeskMenu.md) — 菜单
- [UniDeskMenuSeparator](./UniDeskMenuSeparator.md) — 菜单分隔线