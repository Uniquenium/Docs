---
title: 下载
layout: doc
editLink: true
---

# 下载 Uniquenium

## 系统要求


在下载和安装 Uniquenium 之前，请确保你的系统满足以下要求：

### 操作系统
- **Windows 10** 版本 1809 及以上（推荐 Windows 10 21H2+ / Windows 11）
- Linux 支持正在开发中

### 硬件要求
| 项目 | 最低配置 | 推荐配置 |
|------|---------|---------|
| 处理器 | 双核 1.5GHz+ | 四核 2.0GHz+ |
| 内存 | 4 GB RAM | 8 GB RAM+ |
| 显卡 | 支持 DirectX 11 | 独立显卡，支持 OpenGL 4.5+ |
| 存储空间 | 500 MB 可用空间 | 2 GB 可用空间（含壁纸/插件） |
| 显示器 | 1280×720 分辨率 | 1920×1080 及以上分辨率 |

### 运行时依赖
如果使用源码编译，需要预装：
- **CMake** 3.25 或更高版本
- **Qt** 6.5.0 或更高版本（含 Core, Widgets, Quick, QuickControls2, DBus, Core5Compat, LabsPlatform, Concurrent 模块）
- **ECM**（Extra CMake Modules）
- **C++17** 兼容编译器（MSVC 2022 / GCC 13+ / Clang 16+）
- Linux 额外需要：KF6WindowSystem、KF6GlobalAccel

## 下载方式

### 方式一：GitHub Release（推荐）

前往 GitHub Releases 页面下载最新的正式版本：

[📥 前往 GitHub Releases 下载](https://github.com/Uniquenium/Uniquenium/releases)

下载说明：
- `Uniquenium-Setup-*.exe` - Windows 安装程序（推荐普通用户使用）
- `Uniquenium-Portable-*.zip` - Windows 便携版，解压即可使用
- `Source code (zip)` / `Source code (tar.gz)` - 源代码包

### 方式二：从源码编译

如果你希望使用最新的开发版本或参与开发，可以从源码编译：

```bash
# 1. 克隆仓库（需要安装 Git）
git clone https://github.com/Uniquenium/Uniquenium.git
cd Uniquenium

# 2. 初始化子模块（QHotkey, exprtk 等）
git submodule update --init --recursive

# 3. 配置构建（替换为你的 Qt6 安装路径）
cmake -B build -DCMAKE_PREFIX_PATH="<你的Qt6安装路径>"

# 4. 编译
cmake --build build --config Release

# 5. 运行
./build/Uniquenium0
```

### 方式三：使用 DeepWiki 文档

你还可以通过 DeepWiki 获取交互式文档和代码说明：

[📖 Uniquenium DeepWiki](https://deepwiki.com/Uniquenium/Uniquenium)

## 版本说明

| 版本类型 | 说明 |
|---------|------|
| Stable (稳定版) | 经过充分测试，推荐日常使用 | 
| Pre-release (预发布版) | 包含新功能，可能存在少量 Bug | 
| Nightly (开发版) | 最新代码，不保证稳定性 | 

## 验证下载文件

下载完成后，建议校验文件完整性（如果 Release 页面提供了 SHA256 校验和）：

```powershell
# Windows PowerShell
Get-FileHash .\Uniquenium-Setup-*.exe -Algorithm SHA256
```

将输出的哈希值与 Release 页面提供的校验和进行比对。

## 下一步

- 下载完成后，请阅读 [安装指南](/quick-start/install.md) 了解安装步骤
- 遇到安装问题？查看 [常见问题 FAQ](/faq.md)
- 想要参与开发？查看 [控件库概览](/controls-reference/overview.md)
