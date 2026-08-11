---
title: UniDeskHotkeyPicker
editLink: true
---

# UniDeskHotkeyPicker 类型

快捷键选择器控件，允许用户按下组合键来绑定全局热键。常用于设置面板中的快捷键配置。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskHotkeyPicker.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: info 文档待完善
本控件的详细属性、方法和示例正在编写中。你可以先查看源代码 [UniDeskHotkeyPicker.qml](https://github.com/Uniquenium/Uniquenium/blob/main/UniDesk/Controls/UniDeskHotkeyPicker.qml)，或帮助我们 [完善本文档](https://github.com/Uniquenium/Docs/edit/main/zh/controls-reference/UniDeskHotkeyPicker.md)。
:::

## 基本用法

```qml
import UniDesk.Controls 1.0

UniDeskHotkeyPicker {
    // 用户点击后按下组合键即可绑定
    onHotkeyChanged: {
        console.log("新快捷键:", hotkey)
    }
}
```

## 相关文档

- [快捷键设置](/components-wiki/overview.md#快捷键设置) - 使用指南
- [术语表](/glossary.md)
