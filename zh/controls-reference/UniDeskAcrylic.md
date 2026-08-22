---
title: UniDeskAcrylic
editLink: true
---

# UniDeskAcrylic 类型

毛玻璃（亚克力）效果控件。通过 `FastBlur` 模糊目标区域，叠加颜色、亮度和噪点纹理，实现 Windows 风格的亚克力半透明效果。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskAcrylic.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tintColor` | `color` | `Qt.rgba(1, 1, 1, 1)` | 色调颜色 |
| `tintOpacity` | `real` | `0.65` | 色调不透明度 |
| `luminosity` | `real` | `0.01` | 亮度叠加 |
| `noiseOpacity` | `real` | `0.02` | 噪点纹理不透明度 |
| `target` | `var` | — | 毛玻璃渲染的目标 Item |
| `blurRadius` | `int` | `32` | 模糊半径 |
| `targetRect` | `rect` | Item 区域 | 渲染矩形范围 |
| `cornerRadius` | `int` | `5` | 圆角半径 |

## 实现原理

1. 使用 `ShaderEffectSource` 截取目标区域
2. 通过 `FastBlur` 进行高斯模糊
3. 叠加亮度层、色调层和噪点层

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskAcrylic {
    anchors.fill: parent
    target: parent
    blurRadius: 32
    cornerRadius: 8
    tintColor: UniDeskGlobals.isLight ? Qt.rgba(1,1,1,1) : Qt.rgba(0,0,0,1)
    tintOpacity: 0.65
    luminosity: 0.01
    noiseOpacity: 0.02
}
```

## 相关文档

- [UniDeskWindow](./UniDeskWindow.md) — 使用亚克力效果的窗口
- [UniDeskFrame](./UniDeskFrame.md) — 框架容器