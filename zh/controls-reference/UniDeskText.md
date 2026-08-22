---
title: UniDeskText
editLink: true
---

# UniDeskText 类型

文本显示控件，基于 QtQuick `Text` 实现。封装了主题自适应的文字颜色和字体，简化了文本显示的配置流程。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskText.qml` |
| 继承 | QtQuick Text |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 属性

### `property color textColor`
文字颜色。默认根据主题自动切换：浅色模式黑色，深色模式白色。禁用时自动变暗。

### `property string fontFamily`
字体家族名称。设置后使用自定义字体，不设置则使用全局 `UniDeskTextStyle.little`。

### `property double fontSize`
字号（像素）。默认使用 `UniDeskTextStyle.little.pixelSize`（13px）。

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskText {
    text: "你好，Uniquenium"
    textColor: "#FF5733"
    fontFamily: "微软雅黑"
    fontSize: 20
}
```

## 备注

- `textColor` 在 `enabled: false` 时会自动变暗。
- `fontFamily` 和 `fontSize` 都有合理默认值，通常无需设置。
- 垂直对齐默认居中（`Qt.AlignVCenter`）。

## 相关文档

- [UniDeskTextStyle](./cpp-ext/UniDeskTextStyle.md) — 全局字体样式
- [UDCText](../component-encyclopedia/UDCText.md) — 支持 `%{}` 表达式的动态文本组件