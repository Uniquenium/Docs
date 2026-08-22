---
title: UniDeskPosSelector
editLink: true
---

# UniDeskPosSelector 类型

位置选择器控件，在可视化编辑器中用于精确设置组件的 X/Y 坐标，并支持以其他组件为参照的对齐操作。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskPosSelector.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: warning 编辑器专用
本控件主要供 Uniquenium 可视化编辑器内部使用。
:::

## 自定义属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `editingComponent` | `Item` | 当前正在编辑的组件 |
| `horizontalAlignComponent` | `var` | 横向对齐的参照组件 |
| `verticalAlignComponent` | `var` | 纵向对齐的参照组件 |
| `comManager` | `var` | 组件管理器引用 |

## 子控件

| 控件 | 说明 |
|------|------|
| `horizontalCoordTextField` (`UniDeskSpinBox`) | X 坐标输入 |
| `verticalCoordTextField` (`UniDeskSpinBox`) | Y 坐标输入 |
| `horizontalComBox` (`UniDeskComBox`) | 横向对齐参照组件选择 |
| `verticalComBox` (`UniDeskComBox`) | 纵向对齐参照组件选择 |
| `horiAlignLeftButton` | 左对齐按钮 |
| `horiAlignCenterButton` | 横向居中对齐按钮 |
| `horiAlignRightButton` | 右对齐按钮 |
| `vertAlignTopButton` | 上对齐按钮 |
| `vertAlignCenterButton` | 纵向居中对齐按钮 |
| `vertAlignBottomButton` | 下对齐按钮 |

## 行为

- 坐标范围根据桌面尺寸动态计算
- 支持相对于其他组件对齐或相对于屏幕对齐
- 所有修改自动调用 `editingComponent.saveComToFile()`
- 监听组件的 `xChanged`、`yChanged`、`endDrag` 信号自动刷新

## 方法

### `function refreshPosition()`
刷新坐标显示。

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskPosSelector {
    comManager: comManager
    editingComponent: someComponent
}
```

## 相关文档

- [UniDeskSizeSelector](./UniDeskSizeSelector.md) — 尺寸选择器
- [UniDeskComBox](./UniDeskComBox.md) — 组件选择框