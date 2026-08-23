---
title: UniDeskComBase
editLink: true
---

# UniDeskComBase 类型

组件基类控件。在可视化编辑器中，所有可编辑组件均继承自 `UniDeskComBase`。提供了拖拽移动、选择、右键菜单、矩形边框编辑、属性持久化等核心能力。

| 项目 | 说明 |
|------|------|
| 控件类型 | 可视化控件（Control） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskComBase.qml` |
| 继承 | QtQuick Item |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

::: warning 编辑器专用
本控件主要供 Uniquenium 可视化编辑器内部使用。普通开发者在构建自定义组件时可参考其实现方式。
:::

## 自定义属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `name` | `string` | — | 组件名称 |
| `type` | `string` | — | 组件类型 |
| `identification` | `string` | — | 唯一标识符 |
| `pageid` | `string` | — | 所属页面 ID |
| `canMove` | `bool` | `chosen` | 是否允许拖拽移动 |
| `indicated` | `bool` | `false` | 是否显示指示 Tooltip |
| `selected` | `bool` | `false` | 是否选中 |
| `chosen` | `bool` | `false` | 是否被选中（矩形编辑器可见性） |
| `comManager` | `var` | — | 组件管理器引用 |
| `optionsWindow` | `var` | — | 属性面板窗口 |
| `margins` | `int` | `4` | 边距 |
| `edges` | `int` | `0` | 拖拽边缘标记 |
| `moving` | `bool` | `false` | 是否正在拖动 |
| `moved` | `bool` | `false` | 是否已移动 |
| `itemOpacity` | `real` | `1` | 组件不透明度 |
| `defaultRightClickMenu` | `bool` | `true` | 是否使用默认右键菜单 |
| `pluginDir` | `string` | `""` | 插件目录 |
| `controlHovered` | `bool` | — | 是否悬停 |
| `bg` | `alias` | `rect_bg` | 背景矩形别名 |
| `controlPressed` | `alias` | `mouseArea.pressed` | 按下状态别名 |

## 信号

| 信号 | 说明 |
|------|------|
| `closeSignal()` | 应用退出时发出 |
| `focusOut()` | 失去焦点 |
| `leftClicked()` | 左键点击 |
| `rightClicked()` | 右键点击 |
| `endDrag()` | 拖拽结束 |
| `componentCompleted()` | 组件初始化完成 |

## 方法

| 方法 | 说明 |
|------|------|
| `deleteCom()` | 删除组件 |
| `copyCom()` | 复制组件 |
| `createSubComponent()` | 创建子组件 |
| `containsGlobalPoint(point)` | 判断点是否在组件内 |
| `changeParentWithoutMovingAndSave(p)` | 重新父化并保存 |
| `currentLayer()` | 获取当前所在层（Desktop/Wallpaper/TopMost） |
| `isAncestorOf(p)` | 判断是否为某组件的祖先 |
| `propertyData()` | 导出属性数据为字典 |
| `loadPropertyData(data)` | 从字典加载属性数据 |
| `saveComToFile()` | 保存组件到文件 |

## 右键菜单

默认右键菜单包含：
- **编辑** — 打开属性面板
- **复制** — 复制组件
- **新建子组件** — 创建子组件
- **删除** — 删除组件

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskComBase {
    comManager: comManager
    name: "我的组件"
    type: "UDCFrame"
    identification: "unique-id-001"
    pageid: "page-1"
}
```

## 相关文档

- [UniDeskComRectEditor](./UniDeskComRectEditor.md) — 矩形编辑器
- [UniDeskComBasicOptions](./UniDeskComBasicOptions.md) — 基础属性面板
- [UniDeskComManager](./singletons/UniDeskComManager.md) — 组件管理器