---
title: UniDeskShadow
editLink: true
---

# UniDeskShadow 类型

高性能阴影控件，通过多层嵌套的 `Rectangle` 模拟阴影效果，比 `DropShadow` 性能高出数倍。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskShadow.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `color` | 深色 `#000000` / 浅色 `#999999` | 阴影颜色 |
| `elevation` | `int` | `5` | 阴影层级（决定厚度和层数） |
| `radius` | `int` | `4` | 圆角半径 |

## 原理

使用 `Repeater` 创建 `elevation` 个 `Rectangle`，每层偏移 1px 并降低透明度：

```
opacity: 0.01 * (elevation - index + 1)
anchors.margins: -index
border.width: index
radius: radius + index
```

## 示例

```qml
import UniDesk.Controls 1.0

Rectangle {
    width: 200
    height: 100
    color: "#fff"
    radius: 8

    UniDeskShadow {
        anchors.fill: parent
        elevation: 8
        radius: 8
    }
}
```

## 相关文档

- [UniDeskFrame](./UniDeskFrame.md) — 框架容器
- [UniDeskTextStyle](../cpp-ext/UniDeskTextStyle.md) — 字体样式