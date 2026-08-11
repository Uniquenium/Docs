---
title: 关于 Uniquenium
layout: doc
editLink: true
---

# 关于 Uniquenium

## 项目简介

**Uniquenium** 是一款开源的桌面自定义工具，致力于将桌面美化与实用功能完美结合。项目名称由 "Unique"（独特）+ "Quantum"（量子）组合而来，寓意着为每位用户创造独一无二的桌面体验。

我们相信，桌面不只是工作的起点，更是表达个性的画布。

- 🎨 **精美**：现代 Fluent 设计语言，深浅色主题无缝切换
- 🧩 **灵活**：组件化架构，随心所欲搭配你的桌面
- 🔌 **开放**：插件与模板系统，无限扩展可能
- 💝 **免费**：完全开源免费，社区驱动开发

## 项目背景

Uniquenium 诞生于对现有桌面工具的不满足——要么功能臃肿难用，要么界面陈旧不堪。项目创始人 [Admibrill](https://github.com/admibrill) 决定亲手打造一款既好看又好用的桌面扩展工具。

从最初的简单面板原型，到现在拥有完整控件库、插件系统、模板机制的成熟项目，离不开每一位贡献者的努力。

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 界面渲染 | **QML / Qt Quick** | 声明式 UI 语言，硬件加速渲染 |
| 核心逻辑 | **C++17 / Qt6** | 纯 C++ 实现，高性能与跨平台 |
| UI 控件库 | **UniDesk** | 自研 30+ 控件，基于 LingmoUI 设计 |
| 系统交互 | **Win32 API / QHotkey** | 无边框窗口、全局热键、壁纸设置等 |
| 构建系统 | **CMake + ECM** | 跨平台编译与打包 |
| 文档站点 | **VitePress** | 基于 Vue 的静态文档生成器 |
| 图标资源 | **Remix Icons** | 开源中性风格图标库 |

## 致谢

Uniquenium 离不开以下开源项目和个人的支持：

### 核心贡献者
- 💻 [Admibrill](https://github.com/admibrill) - 项目发起者与核心开发者

### 开源项目
- 🎨 [LingmoUI](https://github.com/LingmoOS/LingmoUI) - UniDesk 控件库的设计基础
- ⌨️ [QHotkey](https://github.com/Skycoder42/QHotkey) - 跨平台全局热键支持
- 🔤 [Remix Icons](https://www.remixicon.cn) - 精美的开源图标库
- 🔢 [ExprTk](https://github.com/ArashPartow/exprtk) - 数学表达式解析引擎
- ⚡ [Qt6](https://www.qt.io/) - 强大的跨平台 C++ 应用框架
- 📦 [ECM](https://invent.kde.org/frameworks/extra-cmake-modules) - Extra CMake Modules

### 社区与用户
感谢每一位提交 Issue、PR、翻译文档、分享模板的社区成员 ❤️

## 许可证

### 代码许可
Uniquenium 项目代码遵循 **GNU General Public License v3.0** 开源协议发布：

> 你可以自由地运行、研究、分享和改进本软件。修改后的衍生作品**必须**以相同协议开源。

完整协议文本：[LICENSE](https://github.com/Uniquenium/Uniquenium/blob/main/LICENSE)

### 文档许可
本文档（Docs 仓库）遵循 **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)** 协议：

> 你可以自由分享（复制、分发、传播）和改编（修改、商用）本文档，只需：
> - **署名**：给出适当的署名，提供协议链接
> - **相同方式共享**：改编后的内容必须以相同协议发布

## 版本信息

你可以通过以下方式查看版本：
- **程序内**：设置 → 关于 → 版本号
- **命令行**：`Uniquenium0 --version`
- **代码中**：
  ```qml
  import UniDesk
  // 通过 UniDeskTools 获取版本号
  var major = UniDeskTools.getModuleVersionMajor()
  var minor = UniDeskTools.getModuleVersionMinor()
  var patch = UniDeskTools.getModuleVersionPatch()
  ```

## 联系我们

| 渠道 | 链接 | 用途 |
|------|------|------|
| GitHub 仓库 | [Uniquenium/Uniquenium](https://github.com/Uniquenium/Uniquenium) | 源代码、Issue、PR |
| 文档仓库 | [Uniquenium/Docs](https://github.com/Uniquenium/Docs) | 本站文档源码 |
| DeepWiki | [deepwiki.com/Uniquenium](https://deepwiki.com/Uniquenium/Uniquenium) | 交互式代码文档 |
| Issue 反馈 | [新建 Issue](https://github.com/Uniquenium/Uniquenium/issues/new/choose) | Bug 报告 / 功能建议 |

## 贡献指南

我们热情欢迎各种形式的贡献！

### 适合新手的贡献方式
1. 📝 **完善文档**：修复错别字、补充说明、翻译英文文档
2. 🐛 **报告 Bug**：提交详细的复现步骤和环境信息
3. 🎨 **分享模板**：导出你设计的精美页面模板给大家使用
4. 💡 **提出建议**：分享你的使用体验和改进想法

### 代码贡献流程
1. Fork 仓库到你的账号
2. 创建新分支：`git checkout -b feature/your-feature`
3. 提交代码：`git commit -m "feat: 添加你的功能"`
4. 推送分支：`git push origin feature/your-feature`
5. 打开 Pull Request，等待代码审查

### 提交规范
- feat: 新功能
- fix: Bug 修复
- docs: 文档更新
- style: 代码格式调整（不影响功能）
- refactor: 重构
- perf: 性能优化
- test: 测试相关
- chore: 构建/工具链相关

## 路线图

想知道我们正在做什么？查看公开的 [TODO 列表](https://github.com/Uniquenium/Uniquenium/blob/main/TODO.md)，包括：
- ✅ Linux 平台支持（开发中）
- ✅ 更多官方插件组件（计算器、截屏、天气等）
- ✅ 移动端/平板适配
- ✅ 云同步功能

---

**Made with ❤️ by Uniquenium Development Team**

> 「让桌面，回归你想要的样子。」
