---
title: UDCFrame
editLink: true
---

# UDCFrame 组件

框架/容器组件，提供带边框和背景色的矩形区域，用于桌面布局的视觉划分。UDCFrame 本身不包含子组件内容，主要用于装饰性布局分隔。

| 项目 | 说明 |
|------|------|
| 组件类型 | 内置组件（UDC） |
| 源文件 | `UniDesk/Components/UDCFrame/UDCFrame.qml` |
| 继承 | `UniDeskComBase` → `UniDeskComBox` → `UniDeskObject` |

## 属性

### 边框
- `property int borderWidth`：边框宽度（像素）。默认：1
- `property color borderColor`：边框颜色。默认跟随主题：浅色黑色，深色白色
- `property int borderRadius`：边框圆角半径（像素）。默认：3

### 背景
- `property color backgroundColor`：背景填充颜色。默认跟随主题：浅色白色，深色黑色

## 使用示例

```qml
// 创建一个圆角卡片式背景
// 在组件编辑器中创建 UDCFrame：
// - width: 400, height: 300
// - borderRadius: 12
// - borderWidth: 1
// - backgroundColor: "#FFFFFF"
// - borderColor: "#E0E0E0"

// 透明分隔框
// - backgroundColor: "transparent"
// - borderRadius: 8
// - borderWidth: 1
// - borderColor: "#333333"
```

## 属性数据导出

```javascript
function propertyDataEx() {
    return {
        borderWidth,
        borderColorR, borderColorG, borderColorB, borderColorA,
        borderRadius,
        bgColorR, bgColorG, bgColorB, bgColorA
    }
}
```

## 备注

- `UDCFrame` 是纯装饰性组件，不可嵌套其他组件。如需容器功能，请使用 `UniDeskComBox` 作为父组件。
- 背景色和边框色均支持 `%{}` 表达式动态引用。

## 相关文档

- [UniDeskComBox](../controls-reference/UniDeskComBox.md) — 通用组件容器
- [UDCText](./UDCText.md) — 搭配框架使用的文本组件
- [UDCImage](./UDCImage.md) — 搭配框架使用的图片组件