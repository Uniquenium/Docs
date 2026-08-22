---
title: UDCImage
editLink: true
---

# UDCImage 组件

图片显示组件，支持图片/动画（AnimatedImage）渲染、圆角裁剪、以及可选的按钮动作（打开应用、打开网页、执行命令）。常用于桌面装饰、快捷入口等场景。

| 项目 | 说明 |
|------|------|
| 组件类型 | 内置组件（UDC） |
| 源文件 | `UniDesk/Components/UDCImage/UDCImage.qml` |
| 继承 | `UniDeskComBase` → `UniDeskComBox` → `UniDeskObject` |

## 属性

### 图片源
- `property string imagePath`：图片文件路径。为空时显示默认 Logo。支持本地文件路径与 `qrc:/` 资源路径

### 显示
- `property int fillMode`：填充模式（对应 `Image` 的 `fillMode`）。默认：`Image.Stretch`
- `property bool smooth`：是否启用平滑缩放。默认：`true`
- `property bool mipmap`：是否启用 Mipmap。默认：`false`

### 外观
- `property int radius`：圆角半径（像素）。0 表示直角。默认：0

### 按钮功能
- `property bool isButton`：是否启用按钮行为。启用后鼠标悬停/按下会显示视觉反馈。默认：`false`
- `property int buttonActionType`：按钮动作类型。默认：`UniDeskButtonActionType.ButtonActionApp`
  - `ButtonActionApp` (0)：打开应用程序
  - `ButtonActionWeb` (1)：打开网页
  - `ButtonActionCommand` (2)：执行命令
- `property string buttonActionTarget`：动作目标（应用路径 / URL / 命令）。默认：空字符串

## 按钮动作

当 `isButton` 为 `true` 且用户点击组件时，根据 `buttonActionType` 执行对应操作：

| 类型 | 行为 | 实现 |
|------|------|------|
| `ButtonActionApp` | 打开应用程序 | `UniDeskTools.openFileOrDir(target)` |
| `ButtonActionWeb` | 打开网页 | `UniDeskTools.web_browse(target)` |
| `ButtonActionCommand` | 执行系统命令 | `UniDeskTools.systemCommand(target)` |

## 视觉反馈

启用 `isButton` 后：
- 悬停时：图片上覆盖 20% 黑色半透明遮罩
- 按下时：图片上覆盖 30% 黑色半透明遮罩
- 圆角裁剪通过 `OpacityMask` 实现，与 `radius` 属性联动

## 使用示例

```qml
// 将图片设为快捷启动按钮
// 在组件编辑器中创建 UDCImage：
// - imagePath: "file:///C:/Icons/github.png"
// - isButton: true
// - buttonActionType: ButtonActionWeb
// - buttonActionTarget: "https://github.com"

// 桌面装饰图片
// - imagePath: "file:///C:/Wallpapers/decor.png"
// - radius: 16
// - isButton: false
```

## 属性数据导出

```javascript
function propertyDataEx() {
    return {
        imagePath, fillMode, smooth, mipmap, radius,
        isButton, buttonActionType, buttonActionTarget
    }
}
```

## 相关文档

- [UniDeskTools](../controls-reference/cpp-ext/UniDeskTools.md) — `openFileOrDir`、`web_browse`、`systemCommand`
- [UniDeskButton](../controls-reference/UniDeskButton.md) — 普通按钮控件