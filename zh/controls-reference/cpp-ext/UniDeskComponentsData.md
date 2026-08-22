---
title: UniDeskComponentsData
editLink: true
---

# UniDeskComponentsData 类型

组件与页面数据的持久化管理器。负责在应用启动时从磁盘加载页面/组件的 JSON 数据，并在用户增删改组件时写回。它是 `UniDeskComManager` 的数据后端。

| 项目 | 说明 |
|------|------|
| 控件类型 | 全局单例 |
| 源文件 | `UniDesk/CppExt/UniDeskComponentsData.h` / `.cpp` |
| 继承 | QQuickItem |
| QML 导入 | `import UniDesk 1.0` |

## 方法

### `function getPages() → QJsonArray`
获取所有已保存的页面 JSON 数组。每项包含 `id`、`name`、`index` 字段。

### `function getComponents() → QJsonArray`
获取所有已保存的组件 JSON 数组。每项包含 `identification`、`type`、`parent`、`geometry`、`properties` 字段。

### `function updatePage(pIndex, page)`
更新指定索引处页面的 JSON 数据。

### `function updateComponent(componentIndex, component)`
更新指定索引处组件的 JSON 数据。

### `function addComponent(component)`
将新组件（`QJsonObject`）添加到持久化数据中。

### `function removeComponent(identification)`
根据唯一 `identification` 删除组件的持久化数据。

### `function addPage(page)`
添加新页面。

### `function insertPage(index, page)`
在指定索引处插入新页面。

### `function removePage(idx)`
按索引删除页面。

### `function setCurrentPage(id)`
设置当前激活的页面 ID。

### `function getCurrentPage() → QString`
获取当前激活的页面 ID。

### `function getComponentTypes() → QVariant`
获取所有已注册组件类型的元数据列表（内置 + 插件）。

### `function getBasicComponentTypes() → QVariant`
仅获取内置（非插件）组件类型的元数据列表。

## 使用示例

```qml
import UniDesk 1.0

var pages = UniDeskComponentsData.getPages()
console.log("已保存页面数:", pages.length)
for (var i = 0; i < pages.length; i++)
    console.log("  -", pages[i].name)

console.log("当前页面 ID:", UniDeskComponentsData.getCurrentPage())
UniDeskComponentsData.setCurrentPage("page-2")
```

## 备注

- `UniDeskComponentsData` 仅负责数据持久化，不涉及 QML 组件实例。实际组件的创建与销毁由 `UniDeskComManager` 处理。
- 数据文件存储于 `%APPDATA%/Uniquenium/components.json` 和 `pages.json`。
- 所有方法均为同步操作，批量操作时建议在 UI 线程外执行。

## 相关文档

- [UniDeskComManager](../singletons/UniDeskComManager.md) — 调用此单例的高层组件管理器
- [UniDeskPluginMgr](./UniDeskPluginMgr.md) — 提供插件组件类型的插件管理器