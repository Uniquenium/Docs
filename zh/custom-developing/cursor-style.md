---
title: 自定义光标样式
layout: doc
editLink: true
---

# 自定义光标样式

厌倦了 Windows 默认的白色箭头？Uniquenium 支持完全自定义全局鼠标光标样式，让你的桌面从细节处彰显个性。

## 功能概述

Uniquenium 支持替换以下 **17 种系统光标状态**：

| 状态 | 说明 |
|------|------|
| 🖱️ Arrow (默认) | 常规箭头指针 |
| 👆 Hand | 超链接手型 |
| 🔤 IBeam | 文本选择竖线 |
| ✋ Wait | 沙漏/转圈等待 |
| 🎯 Cross | 十字准星（绘图） |
| ↔️ SizeHor | 左右调整尺寸 |
| ↕️ SizeVer | 上下调整尺寸 |
| ↘️ SizeFDiag | 左上-右下对角调整 |
| ↙️ SizeBDiag | 右上-左下对角调整 |
| ↕↔️ SizeAll | 四向移动 |
| 🚫 Forbidden | 禁止/不可用 |
| 📍 AppStarting | 应用启动中（箭头+转圈）|
| ✏️ Pen | 画笔模式 |
| ➡️ ScrollNS | 纵向滚动指示 |
| ⬇️ ScrollWE | 横向滚动指示 |
| ✥ Move | 拖拽移动 |
| ⬜ Help | 帮助选择（箭头+问号） |

---

## 快速开始

### 方式一：使用系统设置 UI

1. 打开 Uniquenium **设置** → **光标样式** 选项卡
2. 左侧列表中选择要修改的光标状态（如「默认箭头」）
3. 右侧点击「**选择光标文件**」，挑选 `.cur` 或 `.ani` 文件
4. 上方预览区会实时显示效果
5. 调整光标**热点**（点击生效的像素位置）：
   - 普通箭头：热点在左上角
   - 十字准星：热点在中心
   - 手型：热点在食指指尖
6. 点击「**应用**」→ 立即生效！
7. 对每个需要修改的状态重复 2-6 步

### 方式二：安装光标主题包

网络上有大量整理好的 Windows 光标主题包（通常为 `.zip` 或 `.themepack`）。

1. 下载光标主题包（推荐网站：[DeviantArt](https://www.deviantart.com/)、[OpenCursors](https://www.reddit.com/r/opencursors/)）
2. 解压后找到包含 `.cur` 文件的 `Cursors` 文件夹
3. 在 Uniquenium 设置 → 光标样式 → 点击「**批量导入**」
4. 选择解压出的 `Cursors` 文件夹，Uniquenium 会尝试自动匹配各状态
5. 检查预览效果，对未匹配的状态手动选择文件
6. 点击「应用」完成

### 方式三：使用内置空白光标

如果想要在特定场合**完全隐藏鼠标**（如演示、录屏）：

1. 在光标设置中选择任意状态
2. 点击「**设为空白光标**」按钮
3. Uniquenium 会使用内置的 1×1 透明光标（位于 `cursors/blank-cursor.cur`）
4. 如需恢复，点击「恢复默认」即可

---

## 光标文件格式

### 推荐格式：`.cur` vs `.ani`

| 格式 | 动画 | 推荐场景 | 兼容性 |
|------|------|---------|--------|
| **.cur** (静态) | ❌ | 日常使用、省电 | ⭐⭐⭐⭐⭐ 完美 |
| **.ani** (动态) | ✅ | 个性展示、Wait 状态 | ⭐⭐⭐⭐ 良好 |

::: tip 性能建议
动态光标（.ani）会持续消耗少量 CPU/GPU 资源。如果使用笔记本电池模式或希望极致流畅，建议除了 Wait（等待）状态外，其他状态全部使用静态 `.cur`。
:::

### 尺寸规格

- **标准尺寸**：32×32 像素（Windows 默认）
- **高 DPI**：48×48、64×64、128×128（4K 屏推荐）
- **色深**：推荐 32 位色（ARGB，支持平滑透明边缘）

如果你的光标文件尺寸小于 32×32，高 DPI 屏幕下会被放大导致模糊。建议使用至少 64×64 的源文件。

---

## 制作自定义光标

### 使用现成工具（零代码）

| 工具 | 平台 | 特点 | 地址 |
|------|------|------|------|
| RealWorld Cursor Editor | Windows | 免费、功能全面、支持动画 | [rw-designer.com](https://www.rw-designer.com/cursor-maker) |
| CursorWorkshop | Windows | 专业级，支持批量制作 | [axialis.com](https://www.axialis.com/cursorworkshop/) |
| GIMP + 插件 | Win/Mac/Linux | 开源免费，适合设计达人 | [gimp.org](https://www.gimp.org/) |
| 在线制作 Convertio | 网页 | 免安装，PNG 转 CUR | [convertio.co](https://convertio.co/png-cur/) |

### 设计规范建议

1. **风格统一**：整套 17 个光标保持线条粗细、配色、圆角一致
2. **对比度**：光标边缘加 1~2px 深色描边，在浅色背景下清晰可见
3. **热点清晰**：箭头尖端、十字中心必须是实像素，避免半透明
4. **可访问性**：至少保留 Wait（等待）和 Forbidden（禁止）状态的辨识度，不要过度设计导致用户看不懂

### 示例：用 PNG 制作光标

1. 在 Photoshop / Figma / GIMP 中画出光标图案：
   - 画布：64×64 px，透明背景
   - 箭头主体：白色填充 + 1px 黑色描边
   - 保存为 **PNG-32**（带 Alpha 通道）
2. 打开 [Convertio PNG to CUR](https://convertio.co/png-cur/)
3. 上传 PNG → 选择输出格式 `.cur` → 转换并下载
4. 在 Uniquenium 中导入，设置热点坐标为 (2, 2) 即箭头尖端位置
5. 完成！

---

## 光标主题文件结构（高级）

如果你想打包分享你的光标主题，可以创建标准结构：

```
MyAwesomeCursor/
├── theme.json          # 主题元数据
├── preview.png         # 主题预览（推荐）
└── Cursors/
    ├── Arrow.cur
    ├── Hand.cur
    ├── IBeam.cur
    ├── Wait.ani
    ├── Cross.cur
    ├── SizeHor.cur
    ├── SizeVer.cur
    ├── SizeFDiag.cur
    ├── SizeBDiag.cur
    ├── SizeAll.cur
    ├── No.cur          # Forbidden
    ├── AppStarting.ani
    ├── Pen.cur
    ├── ScrollNS.cur
    ├── ScrollWE.cur
    ├── Move.cur
    └── Help.cur
```

### `theme.json` 示例

```json
{
    "name": "极简黑指针",
    "author": "YourName",
    "version": "1.0.0",
    "description": "纯黑色圆角指针，适合深色主题。32/64 双尺寸。",
    "supportsAnimation": true,
    "dpiScale": [100, 125, 150, 200],
    "cursorMap": {
        "Arrow": "Cursors/Arrow.cur",
        "Hand": "Cursors/Hand.cur",
        "IBeam": "Cursors/IBeam.cur",
        "Wait": "Cursors/Wait.ani",
        "Cross": "Cursors/Cross.cur",
        "SizeHor": "Cursors/SizeHor.cur",
        "SizeVer": "Cursors/SizeVer.cur",
        "SizeFDiag": "Cursors/SizeFDiag.cur",
        "SizeBDiag": "Cursors/SizeBDiag.cur",
        "SizeAll": "Cursors/SizeAll.cur",
        "Forbidden": "Cursors/No.cur",
        "AppStarting": "Cursors/AppStarting.ani",
        "Pen": "Cursors/Pen.cur",
        "ScrollNS": "Cursors/ScrollNS.cur",
        "ScrollWE": "Cursors/ScrollWE.cur",
        "Move": "Cursors/Move.cur",
        "Help": "Cursors/Help.cur"
    },
    "hotspots": {
        "Arrow": [2, 2],
        "Hand": [8, 2],
        "Cross": [16, 16],
        "IBeam": [16, 16],
        "SizeAll": [16, 16]
    }
}
```

打包为 ZIP 后，用户即可在「批量导入」中直接选择该 ZIP 文件，一键应用整套主题。

---

## 故障排查

### Q: 应用光标后没有变化 / 恢复默认了

**A:** 请检查：
1. **管理员权限**：修改系统光标需要一定权限，右键 Uniquenium →「以管理员身份运行」试试
2. **文件路径**：确保 `.cur` 文件路径中没有中文或特殊字符，复制到 `%APPDATA%\Uniquenium\Cursors\` 再导入
3. **文件损坏**：用画图工具打开 `.cur` 看看能否正常显示
4. **重启资源管理器**：打开任务管理器 → 找到「Windows 资源管理器」→ 右键 → 重启

### Q: 部分应用内不显示自定义光标

**A:** 这是正常现象，以下情况会使用应用内置光标：
- 游戏（DirectX / OpenGL 全屏渲染）
- 浏览器中某些网页自定义的 CSS cursor
- 管理员权限运行的系统程序（如注册表编辑器）

这些情况 Uniquenium 无法覆盖，属于系统限制。

### Q: 动态光标 (.ani) 卡顿 / 掉帧

**A:** 解决方案：
1. 减小 `.ani` 的帧尺寸（64×64 足够）和帧数（< 30 帧）
2. 关闭不必要的后台程序释放 GPU
3. 改用静态 `.cur`，只有 Wait 状态用动画

### Q: 4K 屏下光标模糊

**A:** 原因是使用了 32×32 的小尺寸光标文件：
- 下载或制作 64×64 / 128×128 的高分辨率光标
- 在设置中勾选「高 DPI 自适应缩放」

### Q: 如何完全恢复系统默认光标？

**A:** 两种方式：
1. **设置 UI**：设置 → 光标样式 → 点击「**恢复系统默认**」按钮
2. **手动**：如果 Uniquenium 已经关闭但光标没恢复：
   - 控制面板 → 鼠标 → 指针 → 方案 → 选择「Windows 默认（系统方案）」→ 确定

---

## 光标资源推荐

以下是一些优质的光标主题资源站点（注意甄别版权）：

| 站点 | 特点 |
|------|------|
| [DeviantArt Cursors](https://www.deviantart.com/tag/cursors) | 艺术家社区，大量精品 |
| [Reddit r/opencursors](https://www.reddit.com/r/opencursors/) | 开源免费光标集合 |
| [CursorFX Themes](https://www.stardock.com/products/cursorfx/) | 付费但品质极高 |
| [GitHub - awesome-cursors](https://github.com/topics/cursor-theme) | 开源光标主题汇总 |

::: warning 版权提示
分享或商用他人制作的光标主题前，请先确认原作者的授权协议。个人使用一般无限制。
:::

---

## 相关参考

- [插件开发指南](/custom-developing/plugin.md)：插件中可通过 `UniDeskCursorManager` 动态切换光标
- [UniDeskGlobals 单例](/controls-reference/singletons/UniDeskGlobals.md)：查询当前主题模式
