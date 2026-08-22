---
title: UniDesk 控件库概览
layout: doc
editLink: true
---

# UniDesk 控件库概览

UniDesk 是 Uniquenium 内置的 QML 控件库，灵感来源于 LingmoUI，提供了一套现代 Fluent 风格的 UI 控件。使用 UniDesk 可以快速构建外观精美、风格统一的桌面应用界面。

::: tip 先读术语表
在开始前，建议先阅读 [术语表](/glossary.md) 了解 **控件（Control）** 与 **组件（Component）** 的区别。本页面介绍的是「控件」——构成界面的最基础元件。
:::

## 系统要求

在使用 UniDesk 开发前，请确保你的环境满足以下要求：

| 依赖 | 最低版本 | 说明 |
|------|---------|------|
| **CMake** | 3.25+ | 构建系统 |
| **Qt** | 6.5.0+ | QML 引擎与 Qt Quick（含 Core, Widgets, Quick, QuickControls2 等模块） |
| **ECM** | 最新版 | Extra CMake Modules |
| **C++ 编译器** | C++17 | MSVC 2022 / GCC 13+ / Clang 16+ |

::: tip 学习建议
在开始前，建议先阅读 [Qt 官方 QML 文档](https://doc.qt.io/qt-6.8/qmlapplications.html)，了解 QML 的基本语法和概念。
:::

---

## 开发环境搭建

### 步骤 1：获取源代码

```bash
git clone https://github.com/Uniquenium/Uniquenium.git
cd Uniquenium
git submodule update --init --recursive
```

### 步骤 2：配置与编译

```bash
# 配置（替换为你的 Qt6 路径）
cmake -B build -DCMAKE_PREFIX_PATH="<你的Qt6安装路径>"

# 编译
cmake --build build --config Release
```

### 步骤 3：启动程序

```bash
# Windows:
.\build\Release\Uniquenium0.exe --debug

# Linux:
./build/Uniquenium0 --debug
```

---

## 控件库 UniDesk

### 模块导入

在 QML 文件开头使用以下语句导入 UniDesk 控件：

```qml
// 基础模块（全局单例：UniDeskGlobals, UniDeskTools, UniDeskSettings...）
import UniDesk 1.0

// UI 控件模块（按钮、文本、窗口等所有可视化控件）
import UniDesk.Controls 1.0
```

### 控件分类

UniDesk 中的内容分为两大类：

| 类别 | 说明 | 命名模式 | 示例 |
|------|------|---------|------|
| **单例 (Singleton)** | 全局唯一实例，直接通过名字访问属性和方法，用于全局状态与工具 | 任何全局状态/工具 | UniDeskGlobals, UniDeskTools, UniDeskSettings |
| **控件 (Control)** | 可实例化、可嵌套的可视化 UI 元件，是构建组件的基础 | `UniDesk` + 控件名 | UniDeskButton, UniDeskWindow, UniDeskText |

::: warning 基类已移除
早期版本中曾存在 `UniDeskBase`、`UniDeskWindowBase` 等「基类」概念，当前版本已**移除基类抽象层**。所有控件现在直接继承自 Qt 原生类型（如 `Item`、`Rectangle`、`Window`），不再需要通过基类间接继承。如果你在旧文档或代码中看到 `bases` 相关引用，请以本页面为准。
:::

---

## 单例的使用方法

单例是全局唯一对象，**不需要实例化**，在任何 QML 文件中直接通过名字访问。

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

Item {
    Component.onCompleted: {
        // 直接访问属性
        console.log("当前主题：", UniDeskGlobals.isLight ? "浅色" : "深色")
        console.log("主题色：", UniDeskSettings.primaryColor)
        
        // 直接调用方法
        UniDeskTools.web_browse("https://github.com/Uniquenium")
        var uuid = UniDeskTools.createUuid()
    }
}
```

通用格式：
```qml
<单例名>.<属性名>
<单例名>.<函数名>(参数)
```

---

## 控件的使用方法

可视化控件通过 QML 声明式语法使用，支持属性、信号、嵌套子项。控件既可以单独使用，也可以互相组合构成更复杂的「组件」。

```qml
import UniDesk.Controls 1.0

// 父控件
UniDeskWindow {
    id: myWindow
    visible: true
    width: 600
    height: 400
    title: "我的窗口"
    
    // 属性
    tintOpacity: 0.85
    showStayTop: true
    
    // 事件（信号）处理
    onActiveChanged: {
        console.log("窗口激活状态：", active)
    }
    
    // 子控件（嵌套）
    UniDeskButton {
        id: myBtn
        anchors.centerIn: parent
        contentText: "点我"
        iconSource: "qrc:/icon/heart.svg"
        display: Button.TextUnderIcon
        radius: 8
        
        onClicked: {
            myWindow.showSuccess("按钮被点击了！", 3000)
        }
        
        // 嵌套孙控件
        UniDeskTooltip {
            text: "这是一个按钮提示"
        }
    }
}
```

通用模式：
```qml
<控件名> {
    <属性名>: <属性值>
    <信号名>: { /* 处理逻辑 */ }
    <子控件名> { /* ... */ }
}
```

---

## 内置单例速览

| 单例 | 用途 | 常用内容 |
|------|------|---------|
| [UniDeskGlobals](/controls-reference/cpp-ext/UniDeskGlobals.md) | 全局状态 | `isLight` 主题模式，事件通知 |
| [UniDeskTools](/controls-reference/cpp-ext/UniDeskTools.md) | 工具函数 | 颜色切换、壁纸操作、字体管理、UUID 生成 |
| [UniDeskSettings](/controls-reference/cpp-ext/UniDeskSettings.md) | 设置访问 | `primaryColor` 主题色，各类配置读写 |
| [UniDeskTextStyle](/controls-reference/cpp-ext/UniDeskTextStyle.md) | 预设字体 | `tiny` / `little` / `middle` / `big` 四级字号 |
| [UniDeskExpr](/controls-reference/cpp-ext/UniDeskExpr.md) | 表达式引擎 | `%变量` 替换、`%{}` 数学表达式 |
| [UniDeskPluginMgr](/controls-reference/cpp-ext/UniDeskPluginMgr.md) | 插件管理 | 插件加载、卸载、元数据管理 |
| [UniDeskTempleteMgr](/controls-reference/cpp-ext/UniDeskTempleteMgr.md) | 模板管理 | 模板导入导出、预设变量 |
| [UniDeskComponentsData](/controls-reference/cpp-ext/UniDeskComponentsData.md) | 组件数据 | 组件与页面 JSON 数据持久化 |
| [UniDeskComManager](/controls-reference/singletons/UniDeskComManager.md) | 组件管理 | 组件注册、创建、销毁 |
| [UniDeskSettingsWindow](/controls-reference/singletons/UniDeskSettingsWindow.md) | 设置窗口 | 程序设置 UI 入口 |

---

## 主题适配最佳实践

UniDesk 所有控件都内置深浅色双主题，但**自定义控件时需手动适配**：

```qml
import UniDesk 1.0

Rectangle {
    id: myCard
    width: 200
    height: 120
    radius: 8
    
    // ❌ 错误：硬编码颜色
    // color: "white"
    // border.color: "black"
    
    // ✅ 正确：使用 UniDeskGlobals 动态判断
    color: UniDeskGlobals.isLight 
        ? Qt.rgba(255/255, 255/255, 255/255, 1)
        : Qt.rgba(32/255, 32/255, 32/255, 1)
    
    border.color: UniDeskGlobals.isLight
        ? Qt.rgba(0, 0, 0, 0.1)
        : Qt.rgba(1, 1, 1, 0.1)
    
    // 强调色永远用主题色
    Rectangle {
        width: 4
        height: parent.height
        color: UniDeskSettings.primaryColor
    }
}
```

如需更精细的颜色控制，使用 `UniDeskTools.switchColor()`：

```qml
import UniDesk 1.0

property color textNormalColor: UniDeskGlobals.isLight ? "black" : "white"
property color textHoverColor:  UniDeskGlobals.isLight ? textNormalColor.darker(1.2) : textNormalColor.lighter(1.2)
property color textPressColor:  UniDeskGlobals.isLight ? textNormalColor.darker(1.5) : textNormalColor.lighter(1.5)
property color textDisableColor: "#888888"

property color finalColor: UniDeskTools.switchColor(
    textNormalColor, textHoverColor, textPressColor, textDisableColor,
    hovered, pressed, disabled
)
```

---

## 控件文档索引

根据功能分类查看每个控件的详细 API 文档：

### 单例 (Singletons)
- [UniDeskGlobals](/controls-reference/cpp-ext/UniDeskGlobals.md)
- [UniDeskTools](/controls-reference/cpp-ext/UniDeskTools.md)
- [UniDeskSettings](/controls-reference/cpp-ext/UniDeskSettings.md)
- [UniDeskTextStyle](/controls-reference/cpp-ext/UniDeskTextStyle.md)
- [UniDeskExpr](/controls-reference/cpp-ext/UniDeskExpr.md)
- [UniDeskPluginMgr](/controls-reference/cpp-ext/UniDeskPluginMgr.md)
- [UniDeskTempleteMgr](/controls-reference/cpp-ext/UniDeskTempleteMgr.md)
- [UniDeskComponentsData](/controls-reference/cpp-ext/UniDeskComponentsData.md)
- [UniDeskComManager](/controls-reference/singletons/UniDeskComManager.md)
- [UniDeskSettingsWindow](/controls-reference/singletons/UniDeskSettingsWindow.md)

### 窗口与容器
- [UniDeskWindow](/controls-reference/UniDeskWindow.md) - 无边框亚克力窗口
- [UniDeskDialog](/controls-reference/UniDeskDialog.md) - 对话框
- [UniDeskFrame](/controls-reference/UniDeskFrame.md) - 分组容器 / 卡片
- [UniDeskAcrylic](/controls-reference/UniDeskAcrylic.md) - 亚克力模糊特效
- [UniDeskAppBar](/controls-reference/UniDeskAppBar.md) - 应用顶栏
- [UniDeskShadow](/controls-reference/UniDeskShadow.md) - 阴影效果

### 按钮控件
- [UniDeskButton](/controls-reference/UniDeskButton.md) - 标准按钮（图标+文字）
- [UniDeskTextButton](/controls-reference/UniDeskTextButton.md) - 纯文字按钮
- [UniDeskIcon](/controls-reference/UniDeskIcon.md) - 纯图标显示

### 输入控件
- [UniDeskTextField](/controls-reference/UniDeskTextField.md) - 单行文本输入框
- [UniDeskTextArea](/controls-reference/UniDeskTextArea.md) - 多行文本区
- [UniDeskSpinBox](/controls-reference/UniDeskSpinBox.md) - 数值调节框
- [UniDeskComboBox](/controls-reference/UniDeskComboBox.md) - 下拉选择框
- [UniDeskFontBox](/controls-reference/UniDeskFontBox.md) - 字体选择器
- [UniDeskPathSelector](/controls-reference/UniDeskPathSelector.md) - 文件/目录路径选择
- [UniDeskColorPicker](/controls-reference/UniDeskColorPicker.md) - 颜色选择器
- [UniDeskSlider](/controls-reference/UniDeskSlider.md) - 滑块
- [UniDeskHotkeyPicker](/controls-reference/UniDeskHotkeyPicker.md) - 快捷键选择器

### 选择控件
- [UniDeskCheckBox](/controls-reference/UniDeskCheckBox.md) - 复选框
- [UniDeskRadioButton](/controls-reference/UniDeskRadioButton.md) - 单选按钮

### 文本与显示
- [UniDeskText](/controls-reference/UniDeskText.md) - 文本标签
- [UniDeskImage](/controls-reference/UniDeskImage.md) - 图片显示
- [UniDeskChart](/controls-reference/UniDeskChart.md) - 数据图表
- [UniDeskTooltip](/controls-reference/UniDeskTooltip.md) - 浮动提示
- [UniDeskInfoBar](/controls-reference/UniDeskInfoBar.md) - 信息提示条
- [UniDeskMessageBox](/controls-reference/UniDeskMessageBox.md) - 消息弹框

### 导航与标签
- [UniDeskTabBar](/controls-reference/UniDeskTabBar.md) - 标签栏
- [UniDeskTabButton](/controls-reference/UniDeskTabButton.md) - 标签按钮

### 菜单系统
- [UniDeskMenu](/controls-reference/UniDeskMenu.md) - 弹出菜单
- [UniDeskMenuItem](/controls-reference/UniDeskMenuItem.md) - 菜单项
- [UniDeskMenuSeparator](/controls-reference/UniDeskMenuSeparator.md) - 菜单分隔线

### 位置与尺寸选择
- [UniDeskPosSelector](/controls-reference/UniDeskPosSelector.md) - 位置选择器
- [UniDeskSizeSelector](/controls-reference/UniDeskSizeSelector.md) - 尺寸选择器

### 组件编辑器专用
- [UniDeskComBase](/controls-reference/UniDeskComBase.md) - 组件基类（Uniquenium 可视化编辑器用）
- [UniDeskComBox](/controls-reference/UniDeskComBox.md) - 组件容器框
- [UniDeskComBasicOptions](/controls-reference/UniDeskComBasicOptions.md) - 组件基础选项面板
- [UniDeskComRectEditor](/controls-reference/UniDeskComRectEditor.md) - 组件矩形编辑器
- [UniDeskComManager](/controls-reference/singletons/UniDeskComManager.md) - 组件管理器

### 基础对象
- [UniDeskObject](/controls-reference/UniDeskObject.md) - 对象基类

---

## 下一步

- 想要了解术语区分？阅读 [术语表](/glossary.md)
- 想要开发插件扩展？阅读 [插件开发指南](/custom-developing/plugin.md)
- 想分享页面布局？阅读 [模板系统](/custom-developing/template.md)
- 使用中遇到问题？查看 [FAQ](/faq.md)