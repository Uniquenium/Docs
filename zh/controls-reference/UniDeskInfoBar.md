---
title: UniDeskInfoBar
editLink: true
---

# UniDeskInfoBar 类型

信息提示条控件，用于在窗口顶部显示临时的通知消息。支持四种类型（成功/信息/警告/错误），可自动消失或手动关闭。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskInfoBar.qml` |
| 继承 | UniDeskObject |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `root` | `var` | — | 根对象引用（用于定位弹窗容器） |
| `layoutY` | `int` | `75` | 弹窗容器的 Y 坐标 |

## 方法

### `function showSuccess(text, duration, moremsg) → Object`
显示成功提示。默认持续 1000ms。

### `function showInfo(text, duration, moremsg) → Object`
显示信息提示。默认持续 1000ms。

### `function showWarning(text, duration, moremsg) → Object`
显示警告提示。默认持续 1000ms。

### `function showError(text, duration, moremsg) → Object`
显示错误提示。默认持续 1000ms。

### `function showCustom(itemcomponent, duration) → Object`
显示自定义组件的提示。

### `function clearAllInfo() → bool`
清除所有正在显示的提示。

## 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `text` | `string` | 提示文字 |
| `duration` | `int` | 显示时长（毫秒）。`0` 表示不自动消失，显示关闭按钮 |
| `moremsg` | `string` | 附加说明文字（灰色小字） |
| `itemcomponent` | `Component` | 自定义提示内容组件 |

## 样式

- 四种类型各有独立的背景色和图标颜色（深浅主题自适应）
- 弹窗容器使用 `Overlay.overlay` 叠加层
- 进入动画：向上滑入 + 缩放 + 渐显
- 支持多条提示堆叠显示

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskInfoBar {
    id: infoBar
    root: parent
    layoutY: 75
}

// 显示提示
infoBar.showSuccess("操作成功！")
infoBar.showError("出错了", 3000, "请检查网络连接")
infoBar.showWarning("注意：此项操作不可撤销", 0) // 不自动消失
```

## 相关文档

- [UniDeskMessageBox](./UniDeskMessageBox.md) — 模态消息对话框
- [UniDeskTooltip](./UniDeskTooltip.md) — 浮动提示