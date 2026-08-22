---
title: UniDeskTempleteMgr
editLink: true
---

# UniDeskTempleteMgr 类型

模板管理器，负责将组件布局持久化（导出为模板）以及恢复模板（加载模板）。支持媒体资源（图片、视频等）的自动打包与解包，是资源分享与版本迁移的核心。

| 项目 | 说明 |
|------|------|
| 控件类型 | 全局单例 |
| 源文件 | `UniDesk/CppExt/UniDeskTempleteMgr.h` / `.cpp` |
| 继承 | QQuickItem |
| QML 导入 | `import UniDesk 1.0` |

## 属性

### `property bool isWorking`
模板管理器是否正在保存或加载（UI 可据此显示加载状态）。

### `property QVariantList templeteList`
当前已扫描到的模板列表。每项为 `QVariantMap`，包含 `name`、`dir`、`kind` 等元数据。

## 方法

### `function saveTemplete(components, name)`
将指定的组件列表（`QJsonArray`）以 `name` 为模板名保存。内部自动处理：
- 组件 JSON 序列化
- 关联媒体文件的复制与重命名
- UUID 重新分配以避免与现有组件冲突

### `function loadTemplete(dir, presets)`
从指定目录 `dir` 加载模板并将组件恢复到当前页面。`presets` 为可选的预设变量映射，用于替换模板中的表达式变量。

### `function templeteList() → QVariantList`
返回当前模板列表（等同于只读的 `templeteList` 属性）。

### `function refreshTempleteList()`
重新扫描模板目录并刷新 `templeteList`。

## 信号

### `signal errorOccurred(message)`
模板操作失败时发出，携带错误信息。

### `signal finished(success, message, templeteDir, kind)`
模板保存或加载完成时发出。`success` 为布尔值，`kind` 为 `"save"` 或 `"load"`。

### `signal templeteListChanged()`
模板列表变化时发出。

### `signal templeteLoaded(components, presets)`
模板加载解析完成后发出，携带解析后的组件数组与预设值，供 `UniDeskComManager` 进一步处理。

## 使用示例

```qml
import UniDesk 1.0

// 保存模板
UniDeskTempleteMgr.saveTemplete(
    comManager.selectedComponents,
    "我的布局"
)

// 监听保存结果
Connections {
    target: UniDeskTempleteMgr
    function onFinished(success, message, dir, kind) {
        if (success && kind === "save")
            console.log("模板已保存至:", dir)
    }
}

// 加载模板
UniDeskTempleteMgr.loadTemplete(
    "C:/Users/Uniquenium/templates/我的布局",
    { "username": "小明", "theme": "dark" }
)
```

## 备注

- 模板存储于 `%APPDATA%/Uniquenium/templates/` 下的文件夹中。每个模板文件夹包含 `manifest.json`、`components.json` 和 `media/` 目录。
- 加载时会自动重新分配 UUID，并处理媒体文件路径映射。
- `presets` 参数与 `UniDeskExpr` 配合使用：模板中的 `%{变量名}` 会被对应的预设值替换。

## 相关文档

- [UniDeskExpr](./UniDeskExpr.md) — `%{}` 变量表达式引擎
- [模板系统](../../custom-developing/template.md) — 模板使用指南