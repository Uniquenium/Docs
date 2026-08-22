---
title: 安装指南
layout: doc
editLink: true
---

# 安装指南

本指南将帮助你在 Windows 系统上安装和运行 Uniquenium。

## 方式一：使用安装程序（推荐普通用户）

1. **下载安装程序**
   - 前往 [下载页面](/download.md) 获取最新的 `Uniquenium-Setup-*.exe`
   
2. **运行安装程序**
   - 双击下载的 `.exe` 文件启动安装向导
   - 如果出现 SmartScreen 提示，点击「更多信息」→「仍要运行」
   - 按照向导提示完成安装：
     - 选择安装路径（默认：`C:\Program Files\Uniquenium`）
     - 选择是否创建桌面快捷方式
     - 选择是否开机自启动

3. **启动程序**
   - 安装完成后，双击桌面快捷方式或从开始菜单启动 Uniquenium
   - 首次启动时，程序会在托盘区域显示图标

## 方式二：使用便携版

1. **下载便携版压缩包**
   - 下载 `Uniquenium-Portable-*.zip`
   
2. **解压文件**
   - 右键选择「解压到当前文件夹」或使用解压工具解压到任意目录
   - 例如：`D:\Programs\Uniquenium\`

3. **运行程序**
   - 进入解压目录，双击 `Uniquenium.exe` 启动
   - 便携版不会写入注册表，数据保存在程序目录下

## 方式三：从源码运行（推荐开发者）

### 前置条件

确保已安装以下软件：

| 软件 | 最低版本 | 下载地址 |
|------|---------|---------|
| CMake | 3.25+ | [cmake.org](https://cmake.org/download/) |
| Qt | 6.5.0+ | [qt.io](https://www.qt.io/download-open-source) |
| ECM | 最新版 | [KDE Invent](https://invent.kde.org/frameworks/extra-cmake-modules) |
| Git | 最新版 | [git-scm.com](https://git-scm.com/downloads) |
| C++ 编译器 | MSVC 2022 / GCC 13+ / Clang 16+ | 随 Visual Studio 或系统包管理器安装 |

::: warning 注意
安装 Qt 时请确保勾选以下模块：Core, Widgets, Quick, QuickControls2, DBus, Core5Compat, LabsPlatform, Concurrent
:::

### 安装步骤

#### 1. 克隆代码仓库

```bash
git clone https://github.com/Uniquenium/Uniquenium.git
cd Uniquenium
```

#### 2. 初始化子模块

项目使用 Git 子模块管理外部依赖（QHotkey、exprtk 等）：

```bash
git submodule update --init --recursive
```

#### 3. 配置 CMake 构建

```bash
# Windows (MSVC)
cmake -B build -DCMAKE_PREFIX_PATH="C:/Qt/6.8.3/msvc2022_64"

# Linux (GCC)
cmake -B build -DCMAKE_PREFIX_PATH="/opt/Qt/6.8.3/gcc_64"
```

::: tip 提示
请将 `CMAKE_PREFIX_PATH` 替换为你实际的 Qt6 安装路径。
:::

#### 4. 编译

```bash
# Windows
cmake --build build --config Release

# Linux (多线程编译)
cmake --build build -j$(nproc)
```

#### 5. 运行程序

```bash
# Windows
.\build\Release\Uniquenium0.exe

# Linux
./build/Uniquenium0
```

::: tip Linux 额外依赖
Linux 系统还需要安装 `KF6WindowSystem` 和 `KF6GlobalAccel`（用于 Wayland 全局热键支持）：

```bash
# Ubuntu / Debian
sudo apt install libkf6windowsystem-dev libkf6globalaccel-dev

# Arch Linux
sudo pacman -S kf6-window-system kf6-globalaccel
```
:::

## 初始配置

首次启动 Uniquenium 后，建议进行以下基础配置：

### 1. 打开设置窗口

- 右键点击托盘区的 Uniquenium 图标
- 选择「设置」

### 2. 主题设置

- 在「外观」选项卡中选择主题模式：
  - **跟随系统**（推荐）：自动匹配 Windows 主题
  - **浅色模式**：强制使用浅色主题
  - **深色模式**：强制使用深色主题

### 3. 快捷键设置

- 在「快捷键」选项卡中配置全局热键：
  - 显示/隐藏主面板
  - 切换页面
  - 快速打开设置
  - 等等

### 4. 开机自启动

- 在「功能」选项卡中勾选「开机自启动」
- 程序会自动添加到 Windows 启动项

### 5. 安装官方插件（推荐）

Uniquenium 的官方插件包提供了系统监控、天气、日历、媒体播放等丰富的扩展组件，建议安装以获得完整体验。

- 在「插件」选项卡中查看可用插件列表
- 点击插件卡片上的「安装」按钮即可安装
- 也可以从 [官方插件仓库](https://github.com/Uniquenium/Official-Plugins) 下载离线安装包

详细信息请参考 [官方插件文档](/official-plugins.md)。

## 验证安装

安装完成后，你可以通过以下方式验证程序是否正常工作：

1. ✅ 托盘区出现 Uniquenium 图标
2. ✅ 右键托盘图标可以打开菜单
3. ✅ 可以创建新页面并添加组件
4. ✅ 主题切换正常工作
5. ✅ 快捷键可以正常触发

## 卸载

### 安装程序版
- 打开「设置」→「应用」→「已安装的应用」
- 找到 Uniquenium，点击「卸载」
- 或运行安装目录下的「卸载程序」

### 便携版/源码版
- 直接删除程序目录即可
- 如需清除用户数据，删除以下目录：
  ```
  %APPDATA%\Uniquenium\
  ```

## 常见问题

安装过程遇到问题？请查看 [FAQ 页面](/faq.md) 或在 GitHub 提交 Issue：

[🐛 提交 Issue](https://github.com/Uniquenium/Uniquenium/issues)