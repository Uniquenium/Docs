---
title: 官方插件
editLink: true
---

# 官方插件

Uniquenium 官方插件包提供了一套常用的组件扩展，覆盖系统监控、网络信息、天气、日历等场景。安装官方插件后，桌面即可立即获得丰富的开箱即用组件。

## 插件列表

官方插件包（`Uniquenium-Official-Plugins`）通常包含：

| 插件 | 组件 | 说明 |
|------|------|------|
| **SystemMonitor** | CPUMonitor、MemoryMonitor、NetMonitor、BatteryMonitor | 实时系统监控 |
| **Weather** | WeatherCard、WeatherForecast | 天气显示（需 API Key） |
| **Calendar** | CalendarCard、ClockCard | 日历与时钟组件 |
| **Media** | MediaPlayer、VolumeControl | 媒体播放与音量控制 |
| **QuickNote** | NotePad、TodoList | 便签与待办事项 |

> 插件列表可能随版本变化，最新列表请参考官方仓库。

## 安装方式

### 方式一：安装程序安装（推荐）

1. 从 Releases 页面下载 `Uniquenium-Plugins-Setup-*.exe`
2. 运行安装程序，选择 Uniquenium 安装目录
3. 安装完成后，插件自动放置于 `plugins/` 目录下
4. 启动 Uniquenium，在 **设置 → 插件** 中查看已安装插件

### 方式二：手动安装

1. 从 [官方插件仓库](https://github.com/Uniquenium/Official-Plugins) 下载最新 Release
2. 将 DLL 文件解压到 `<Uniquenium 安装目录>/plugins/` 下的子目录中
3. 启动 Uniquenium，插件会自动扫描并加载

```
Uniquenium/
├── Uniquenium.exe
├── plugins/
│   ├── SystemMonitor/
│   │   └── SystemMonitor.dll
│   ├── Weather/
│   │   └── Weather.dll
│   └── Calendar/
│       └── Calendar.dll
```

### 方式三：应用内安装

1. 打开 Uniquenium 设置
2. 切换到 **插件** 标签
3. 点击 **从本地安装** 选择已下载的插件包
4. 或点击 **检查更新** 从远程仓库获取最新插件

## 配置插件

部分插件需要额外配置。以天气插件为例：

1. 在组件编辑器中从插件分类拖拽一个 `WeatherCard`
2. 右键组件 → **属性** → 填写 API Key 与城市
3. 或在 **设置 → 插件** 标签中进行全局配置

## 卸载插件

1. 打开 **设置 → 插件**
2. 找到要移除的插件
3. 点击 **卸载** 按钮
4. 或直接删除 `plugins/` 下对应的子目录

## 开发插件

如需开发自定义插件，请参考 [插件开发指南](../../custom-developing/plugin.md) 和 [UniDeskPluginInterface](../controls-reference/cpp-ext/UniDeskPluginInterface.md)。

## 备注

- 官方插件必须与 Uniquenium 主程序的主版本匹配。
- 运行时加载失败的插件不会影响主程序稳定性，系统会跳过失败插件继续加载其他插件。
- 请仅从可信来源安装第三方插件。