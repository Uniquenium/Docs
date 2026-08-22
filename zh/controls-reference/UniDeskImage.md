---
title: UniDeskImage
editLink: true
---

# UniDeskImage 类型

图片显示控件，基于 QtQuick `AnimatedImage` 实现。支持本地图片、网络图片和 QRC 资源图片的加载，并内置图片切换时的淡入淡出动画效果。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskImage.qml` |
| 继承 | QtQuick AnimatedImage |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `animationEnabled` | `bool` | `true` | 是否启用切换动画 |
| `animationDuration` | `int` | `300` | 动画持续时间（毫秒） |

## 行为

- 图片加载完成自动播放（`status === Image.Ready` 时 `playing = true`）
- `source` 变化时触发淡出动画：旧图片淡出后新图片淡入
- 无 `source` 时隐藏（`opacity: source.toString() !== "" ? 1 : 0`）
- 继承 `AnimatedImage` 的所有属性（如 `fillMode`、`source` 等）

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskImage {
    width: 200
    height: 200
    source: "qrc:/images/logo.png"
    fillMode: Image.PreserveAspectCrop
    animationDuration: 500
}
```

## 相关文档

- [UniDeskIcon](./UniDeskIcon.md) — 图标控件
- [UniDeskFrame](./UniDeskFrame.md) — 容器控件