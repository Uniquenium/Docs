---
title: UniDeskTooltip
editLink: true
---

# UniDeskTooltip 类型

浮动提示控件，基于 QtQuick `ToolTip` 实现。当鼠标悬停在关联控件上时显示提示信息。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskTooltip.qml` |
| 继承 | QtQuick Templates ToolTip |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | — | 提示文字（继承自 ToolTip） |
| `font` | `font` | `UniDeskTextStyle.tiny` | 字体 |

## 样式

- 位于关联控件上方 3px 处居中显示
- 背景：不透明（浅色白色 / 深色黑色）
- 边框：0.5px，颜色自动适配深浅主题
- 内边距：6px
- 字体：`UniDeskTextStyle.tiny`

## 行为

- 支持 ESC 键和外部点击（按住/释放）关闭
- 文字自动换行（`Text.Wrap`）

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskButton {
    text: "保存"
    UniDeskTooltip {
        text: "保存当前内容到文件"
    }
}
```

## 相关文档

- [UniDeskInfoBar](./UniDeskInfoBar.md) — 信息提示条
- [UniDeskTextStyle](./cpp-ext/UniDeskTextStyle.md) — 字体样式