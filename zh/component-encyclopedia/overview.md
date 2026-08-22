---
title: 组件百科
editLink: true
---

# 组件百科

Uniquenium 的组件分为两类：**主程序内置组件（UDC 开头）** 和 **官方插件组件**。内置组件开箱即用，官方插件组件需额外安装插件包。

## 内置组件列表

| 组件 | 说明 |
|------|------|
| [UDCText](./UDCText.md) | 文本组件，支持 `%{}` 表达式动态数据 |
| [UDCImage](./UDCImage.md) | 图片组件，支持圆角裁剪、按钮动作 |
| [UDCFrame](./UDCFrame.md) | 框架容器组件，用于布局划分 |

## 官方插件组件

官方插件包提供更多扩展组件，包括系统监控、天气、日历、媒体播放、便签等。

详细列表与安装方式请参考 [官方插件](../official-plugins.md)。

## 通用属性

所有 UDC 组件均继承自 `UniDeskComBase`，拥有以下通用属性：

| 属性 | 类型 | 说明 |
|------|------|------|
| `visible` | bool | 是否可见 |
| `width` | real | 组件宽度 |
| `height` | real | 组件高度 |
| `x` | real | X 坐标 |
| `y` | real | Y 坐标 |
| `itemOpacity` | real | 不透明度 (0.0 ~ 1.0) |
| `identification` | string | 组件唯一 ID |
| `parentIdentification` | string | 父组件 ID |

## 通用方法

### `propertyDataEx() → object`
导出组件的自定义属性数据为 JSON 对象（用于保存模板）。

### `loadPropertyDataEx(data)`
从 JSON 对象加载自定义属性数据（用于加载模板）。

## 相关文档

- [控件库概览](../controls-reference/overview.md) — UniDesk 控件体系
- [UniDeskComManager](../controls-reference/singletons/UniDeskComManager.md) — 组件管理器
- [官方插件](../official-plugins.md) — 插件组件列表