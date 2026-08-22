---
title: UniDeskComManager
editLink: true
---

# UniDeskComManager 类型

本单项用于管理 Uniquenium 中的组件、页面和整体编辑状态。它并非通过 QML `QML_SINGLETON` 注册的真正单例，而是由 `main.qml` 在根组件中实例化后，作为属性 `comManager` 传递给其他窗口、控件和组件，从而在整个应用中唯一存在并被全局访问。

> 访问方式：任何持有 `comManager` 属性的对象（例如 `UniDeskSettingsWindow`、`UniDeskComWindow`、`UniDeskPageWindow` 以及所有继承 `UniDeskComBase` 的组件）都可以通过该属性获取当前这唯一的 `UniDeskComManager` 实例。

| 控件类型    | 抽象单项                              |
| ------- | --------------------------------- |
| 源代码文件路径 | `UniDesk/Controls/UniDeskComManager.qml` |
| 继承      | [UniDeskObject](../UniDeskObject) |

## 属性

### `property string currentPid`
当前激活页面的 ID，默认值为 `"default"`。所有组件会根据此值自动显示/隐藏。

### `property var root`
桌面根容器（即 `UniDeskRoot`），用于承载默认页面中的组件。

### `property var wallpaperLayer`
壁纸层容器，标识为 `"Wallpaper"` 的层级。

### `property var topMostLayer`
置顶层容器，标识为 `"TopMost"` 的层级。

### `property var comWindow`
组件管理窗口 `UniDeskComWindow` 的引用。

### `property var pageWindow`
页面管理窗口 `UniDeskPageWindow` 的引用。

### `property UniDeskComponentSelectMode selectMode`
当前选择模式（单选 / 多选 / 无选择）。

### `property list<Item> selectedComponents`
当前选中的组件列表。

### `property list<Item> needMoveComponents`
批量移动时需要跟随移动的组件列表（由 `update_need_move_com()` 维护）。

### `property alias page_list: compModels`
页面列表的别名（指向内部 `ListModel`）。

### `property list<Component> type_list`
所有已注册组件类型的 QML `Component` 实例列表，由 `loadComponentTypesFromData()` 填充。

### `property list<string> typename_list`
与 `type_list` 一一对应的类型名列表（原生组件使用文件名，插件组件使用 `author.id.name` 格式）。

### `property list<var> componentInfoList`
从 `UniDeskComponentsData.getComponentTypes()` 读取的组件元数据列表。

## 方法

### `function add_com(typename, typenameTr, pageid)`
在指定页面（默认当前页面）添加一个组件。会自动分配唯一识别 ID、写入 `UniDeskComponentsData` 并刷新树模型。

### `function add_com_from_data(data)`
根据持久化 JSON 数据复原一个组件（不含父子关系恢复）。

### `function add_components_from_data(components)`
批量从 JSON 数据创建一组组件，并按 `parent` 字段重建父子关系。

### `function toggle_page_to(id)`
切换到 ID 为 `id` 的页面（同时更新 `currentPid` 与 `UniDeskComponentsData.setCurrentPage`）。

### `function new_page()`
创建一个新的空页面，附带壁纸层 / 桌面层 / 置顶层三个内置节点。

### `function rename_page(index, newname)`
重命名指定索引的页面。

### `function remove_page(index)`
删除指定索引的页面；若删除的是当前页，会自动切换至相邻页。

### `function copy_page(index)`
复制指定页面中的所有组件到一个新页面。

### `function clear_page(index)`
清空指定页面中的所有组件。

### `function previous_page()` / `function next_page()`
切换到上一页 / 下一页。

### `function is_first_page()` / `function is_last_page()`
判断当前页是否为第一页 / 最后一页。

### `function select_com(com)`
选中或取消选中一个组件；在多选模式下会处理祖先/后代关系。

### `function unselect_all_com()`
清空所有选中状态。

### `function delete_com(id)`
根据识别 ID 删除组件（会同时删除其所有后代）。

### `function copy_com(com)`
复制一个组件（位置偏移 `delta` 像素）。

### `function getComById(id)`
根据识别 ID 或保留字 `"Wallpaper"`、`"Desktop"`、`"TopMost"` 获取对应组件或层级。

### `function getIndexById(id)` / `function getIndexByCom(com)`
获取指定组件在内部 `component_list` 中的索引。

### `function move_com_to_page(comId, indexPage)`
将组件（及其后代）移动到另一个页面。

### `function loadPagesFromData()` / `function loadComponentsFromData()`
从 `UniDeskComponentsData` 重新加载页面与组件，用于应用启动或重置场景。

### `function loadComponentTypesFromData()`
从 `UniDeskComponentsData` 与 `UniDeskPluginMgr.plugins_list` 中加载所有内置与插件组件类型。

### `function insert_new_page(index)`
在指定索引处插入一个新页面。

### `function move_page_up(index)` / `function move_page_down(index)`
上移或下移指定页面。

### `function mouse_on_any_com(mousePos, layer)`
判断指定坐标下是否存在指定层级中可见的组件，用于设置鼠标穿透。

### `function updateMouseClickThrough(pos)` （非 QML 方法，由 main.qml 包装）
根据当前鼠标位置和组件命中情况，设置窗口的 `mouseClickThrough`。

## 信号

### `signal menuClosed()`
右键菜单关闭后发出，用于触发窗口鼠标穿透状态刷新。

### `signal deleteComSignal(string id)`
删除某个组件前发出，供内部 `onDeleteComSignal` 处理器执行实际删除逻辑。

### `signal multiSelectRightClicked(int x, int y)`
多选模式下右键组件时发出，用于弹出多选操作菜单。

## 使用示例

```qml
// 在继承 UniDeskComBase 的组件中，comManager 属性会在创建时被注入
UniDeskComBase {
    onSomeEvent: {
        comManager.toggle_page_to("other-page-id");
        comManager.new_page();
    }
}

// 在单例窗口（如 UniDeskSettingsWindow）中，由 main.qml 显式赋值
// UniDeskSettingsWindow.comManager = component_manager
UniDeskSettingsWindow {
    property var comManager
    onSomething: comManager.next_page()
}
```

## 备注

- `UniDeskComManager` 继承自 `UniDeskObject`，因此拥有 `UniDeskObject` 的通用属性（如 `identification`、`name`、`parent`、`z` 等）。
- 由于并非 QML 单例，**不能**通过 `UniDeskComManager.xxx` 直接访问，必须通过 `comManager` 属性在对象树中传递。
- 应用启动时 `main.qml` 会将其分别赋值给 `UniDeskSettingsWindow.comManager`、`UniDeskComWindow.comManager`、`UniDeskPageWindow.comManager`，其他控件则通过这些窗口或组件的 `comManager` 属性向下传递。