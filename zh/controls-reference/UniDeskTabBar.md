---
title: UniDeskTabBar
editLink: true
---

# UniDeskTabBar 类型

标签栏控件，基于 QtQuick `TabBar` 实现。透明背景，主要配合 `UniDeskTabButton` 使用。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskTabBar.qml` |
| 继承 | QtQuick TabBar |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义样式

- 透明背景
- 边距 2px

## 示例

```qml
import UniDesk.Controls 1.0

TabView {
    TabBar {
        Repeater {
            model: 3
            delegate: UniDeskTabButton {
                text: "标签 " + (index + 1)
            }
        }
    }
    contentItem: StackLayout {
        Repeater {
            model: 3
            delegate: Rectangle {
                color: index % 2 ? "#eee" : "#ddd"
            }
        }
    }
}
```

## 相关文档

- [UniDeskTabButton](./UniDeskTabButton.md) — 标签按钮