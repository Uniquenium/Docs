---
title: UniDeskMenuSeparator
editLink: true
---

# UniDeskMenuSeparator 类型

菜单分隔线控件，基于 QtQuick `Rectangle` 实现。在菜单项之间提供细线分隔。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskMenuSeparator.qml` |
| 继承 | QtQuick Rectangle |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 样式

- 宽度：撑满父容器
- 高度：1.5px
- 颜色自动适配深浅主题（浅色黑色 / 深色白色）

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskMenu {
    UniDeskMenuItem { text: "剪切" }
    UniDeskMenuItem { text: "复制" }
    UniDeskMenuSeparator {}
    UniDeskMenuItem { text: "粘贴" }
}
```

## 相关文档

- [UniDeskMenu](./UniDeskMenu.md) — 菜单
- [UniDeskMenuItem](./UniDeskMenuItem.md) — 菜单项