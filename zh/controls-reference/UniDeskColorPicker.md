---
title: UniDeskColorPicker
editLink: true
---

# UniDeskColorPicker 类型

颜色选取器控件，支持 RGBA、HSLA、HSVA、HEX 四种颜色模式的编辑和预览。集成了 `ColorDialog` 用于可视化选择颜色。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskColorPicker.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `selectedColor` | `color` | 当前选择的颜色（可双向绑定） |
| `comManager` | `var` | 组件管理器引用（传递给内部 `UniDeskComboBox`） |
| `colorTypeBox` | `UniDeskComboBox` | 颜色模式下拉菜单的别名 |

## 颜色模式

| 模式 | 可编辑字段 |
|------|-----------|
| `RGBA` | R、G、B、A 四个数值（0-255，A 为 0-100） |
| `HSLA` | H（0-360）、S（0-100）、L（0-100）、A（0-100） |
| `HSVA` | H（0-360）、S（0-100）、V（0-100）、A（0-100） |
| `HEX` | 十六进制字符串（如 `#ff0000`） |

## 行为

- 实时预览颜色变化（左侧色块显示当前颜色）
- 点击"选择颜色"按钮打开系统 `ColorDialog`
- 编辑完成后自动更新 `selectedColor`
- 最小高度：40px

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskColorPicker {
    selectedColor: myColor
    comManager: comManager
    anchors.left: parent.left
    anchors.top: parent.top
}
```

## 相关文档

- [UniDeskComboBox](./UniDeskComboBox.md) — 下拉选择框
- [UniDeskTextField](./UniDeskTextField.md) — 文本输入框