---
title: UniDeskComboBox
editLink: true
---

# UniDeskComboBox 类型

下拉选择框控件，基于 `UniDeskButton` 实现。集成了 `UniDeskMenu` 作为弹出列表，支持可编辑模式、字体委托渲染和组件委托渲染。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskComboBox.qml` |
| 继承 | UniDeskButton |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enableFontDelegate` | `bool` | `false` | 是否启用字体委托模式（每项文字作为字体名渲染） |
| `enableComDelegate` | `bool` | `false` | 是否启用组件委托模式（用于编辑器高亮） |
| `comManager` | `var` | — | 组件管理器引用 |
| `currentIndex` | `int` | `0` | 当前选中索引 |
| `model` | `var` | `[]` | 选项列表 |
| `editable` | `bool` | `false` | 是否可编辑 |
| `displayText` | `string` | `model[currentIndex]` | 显示文字（非编辑模式） |
| `editText` | `string` | `displayText` | 编辑文字（编辑模式） |
| `currentText` | `string` | — | 当前文字（只读，根据模式返回 displayText 或 editText） |
| `inputMethodHints` | `int` | `Qt.ImhNoPredictiveText` | 输入法提示 |
| `validator` | `var` | `null` | 输入验证器 |
| `selectTextByMouse` | `bool` | `false` | 鼠标是否可选中文字 |

## 信号

### `signal activated()`
当用户触发选择（菜单点击或编辑完成匹配）时发出。

## 行为

- 点击按钮时自动弹出 `UniDeskMenu` 菜单
- 菜单会根据剩余空间自动向上或向下弹出
- `enableFontDelegate` 模式下，菜单项以字体名渲染（用于字体选择器）
- `enableComDelegate` 模式下，菜单项高亮时会联动组件 `indicated` 状态
- 可编辑模式下，用户输入文字后按回车自动匹配 `model` 中的选项
- 继承 `UniDeskButton` 的所有属性（颜色、圆角、图标等）

## 示例

```qml
import UniDesk.Controls 1.0

// 基础用法
UniDeskComboBox {
    model: ["选项 A", "选项 B", "选项 C"]
    currentIndex: 0
    onActivated: console.log("selected:", currentText)
}

// 可编辑模式
UniDeskComboBox {
    model: ["北京", "上海", "广州"]
    editable: true
    onActivated: console.log("confirmed:", currentText)
}

// 字体委托模式
UniDeskComboBox {
    model: ["Microsoft YaHei", "SimSun", "KaiTi"]
    enableFontDelegate: true
}
```

## 相关文档

- [UniDeskButton](./UniDeskButton.md) — 基类按钮
- [UniDeskMenu](./UniDeskMenu.md) — 弹出菜单
- [UniDeskMenuItem](./UniDeskMenuItem.md) — 菜单项
- [UniDeskFontBox](./UniDeskFontBox.md) — 使用字体委托的字体选择器