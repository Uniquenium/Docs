---
title: UniDeskSlider
editLink: true
---

# UniDeskSlider 类型

滑动条控件，基于 QtQuick `T.Slider` 模板实现。自定义了手柄、滑块轨道和填充区域的样式，并支持悬停/按下时显示 Tooltip。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskSlider.qml` |
| 继承 | QtQuick Templates Slider (`T.Slider`) |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tooltipEnabled` | `bool` | `true` | 是否启用 Tooltip 提示 |
| `text` | `string` | `String(value)` | Tooltip 显示文字 |

## 自定义外观

- 手柄：20x20 圆形，带阴影，内含主题色内圆
- 内圆动画：悬停放大 1.2 倍，按下缩小 0.9 倍
- 轨道：灰色背景轨道 + 主题色填充区域
- 支持水平和垂直方向
- 默认 `to: 100`、`stepSize: 1`

## 行为

- 悬停或按下时显示 `UniDeskTooltip`
- 继承所有 `T.Slider` 属性：`from`、`to`、`value`、`position`、`horizontal` 等

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskSlider {
    width: 200
    from: 0
    to: 100
    value: 50
    tooltipEnabled: true
    onMoved: console.log("值:", value)
}
```

## 相关文档

- [UniDeskSpinBox](./UniDeskSpinBox.md) — 数字输入框
- [UniDeskTooltip](./UniDeskTooltip.md) — Tooltip 控件