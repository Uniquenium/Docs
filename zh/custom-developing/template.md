---
title: 模板系统
layout: doc
editLink: true
---

# 模板系统

Uniquenium 的模板系统允许你将精心设计的组件组布局保存为模板，方便备份、分享，或快速复用在其他场景中。无论是个人使用还是社区分享，模板都能大幅提升效率。

::: tip 术语提示
在阅读本页面前，建议先了解 [术语表](/glossary.md) 中 **模板（Template）** 的定义。
:::

## 什么是模板？

**模板（Template）** 是一组预先配置好的**组件集合**，保存了组件的布局、属性和关联关系。用户可以通过模板快速复用一整套桌面布局，也可以将当前桌面导出为模板分享给他人。

模板是一个组件组配置的**快照**，包含：
- 组件组的基本设置（名称、样式、尺寸、背景色）
- 组内所有组件的位置、尺寸、属性值
- 组件之间的层级关系（Z 轴顺序）
- 组件的事件绑定和信号连接（部分）
- 预设的组件参数（用户可在导入时调整）

模板**不包含**：
- 本地图片、字体等外部资源文件（需要单独复制）
- 安装的插件（如果模板使用了某插件提供的组件，导入方需要自行安装对应插件）

::: warning 拼写说明
早期版本中「模板」曾被误拼为 "templete"，正确拼写为 **Template**。如果你在旧文档或代码中看到 `templete`，请理解为 `template`。
:::

---

## 导出模板

### 方式一：从组件组导出

1. 打开主面板 → 左侧导航栏找到目标组件组
2. **右键组件组** → 选择「导出为模板」
3. 在弹出的对话框中填写：
   - **模板名称**：模板的显示名（如：「简洁工作面板 v2」）
   - **作者**：你的名字（分享时显示）
   - **版本**：模板版本号，如 `1.0.0`
   - **描述**：简要介绍这个模板的设计思路和适用场景
   - **预览图**：点击「截取当前画面」自动生成缩略图（推荐）
4. 选择保存位置（默认：`%APPDATA%\Uniquenium\Templates\`）
5. 点击「确定」，生成 `.uniq-template` 文件

### 方式二：从模板管理器导出

1. 打开 **设置** → **模板** 选项卡
2. 在「我的模板」列表中找到要导出的模板
3. 点击「分享/导出」按钮
4. 选择保存位置，即可导出为可分享的文件

---

## 导入模板

### 方式一：新建组件组时从模板创建

1. 点击左侧导航栏「+ 新建组件组」
2. 在对话框中切换到「**从模板导入**」选项卡
3. 可以：
   - 选择「本地模板」列表中已有的模板
   - 或点击「导入外部模板文件」选择 `.uniq-template` 文件
4. 填写新组件组的名称
5. 点击「创建」，组件组会以模板为蓝本生成

### 方式二：导入到模板库

1. 打开 **设置** → **模板** → 点击「**导入模板**」
2. 选择下载的 `.uniq-template` 文件
3. 模板会出现在「本地模板」列表中，后续新建组件组时可直接选用

### 社区模板下载

可以在以下渠道获取用户分享的模板：
- [GitHub Discussions - Templates 分类](https://github.com/Uniquenium/Uniquenium/discussions/categories/templates)
- [Uniquenium 官网模板库](/)（即将上线）

---

## 模板文件格式（开发者用）

`.uniq-template` 文件本质上是一个 **ZIP 压缩包**，改后缀为 `.zip` 即可用解压软件打开。

内部结构：

```
MyTemplate.uniq-template
├── template.json        # 模板元数据 + 组件组配置（核心）
└── preview.png          # 预览缩略图（可选，推荐 600x400 PNG）
```

### `template.json` 结构

```json
{
    "version": "1.0",
    "templateFormat": 2,
    "meta": {
        "name": "简洁工作面板 v2",
        "author": "YourName",
        "version": "1.0.0",
        "description": "左侧待办 + 右侧时钟，适合办公族。",
        "createdAt": "2025-01-15T10:30:00Z",
        "minAppVersion": "1.2.0",
        "requiredPlugins": [
            {"name": "TodoPlugin", "version": ">=1.0.0"}
        ]
    },
    "groupData": {
        "groupName": "我的工作面板",
        "groupStyle": "normal",
        "width": 600,
        "height": 900,
        "background": "#F5F5F5",
        "components": [
            {
                "type": "UniDeskText",
                "id": "title_001",
                "x": 20, "y": 20,
                "width": 560, "height": 40,
                "properties": {
                    "text": "今日待办",
                    "font.pointSize": 20,
                    "font.bold": true
                }
            },
            {
                "type": "UniDeskFrame",
                "id": "frame_001",
                "x": 20, "y": 80,
                "width": 560, "height": 300,
                "properties": {
                    "radius": 8
                },
                "children": [
                    // 嵌套组件...
                ]
            }
        ]
    }
}
```

### 字段说明

| 字段 | 说明 |
|------|------|
| `version` | 文件版本号（用于兼容性判断） |
| `templateFormat` | 模板格式版本（当前为 2） |
| `meta` | 模板元数据（展示信息） |
| `groupData.groupStyle` | 组件组样式：`normal` / `fullscreen` / `frameless` |
| `groupData.components[]` | 组件树数组，支持嵌套 |
| `requiredPlugins[]` | 依赖的插件，导入时会检查是否已安装 |

---

## 模板设计最佳实践

### 🎨 设计建议

1. **响应式布局优先**
   - 使用锚点（anchors）而非固定坐标，适应不同分辨率
   - 重要元素不要贴边放置，至少留出 20px 边距

2. **主题适配**
   - 颜色使用 `UniDeskGlobals.isLight` 动态判断
   - 避免硬编码纯黑/纯白，使用主题色 `UniDeskSettings.primaryColor`

3. **尺寸合理**
   - 通用模板建议宽度 600~1000px，高度 400~800px
   - 侧边栏模板建议宽度 300~400px，高度铺满屏幕

4. **组件命名**
   - 为关键组件设置有意义的 `id`，方便他人二次修改
   - 例如：`todoList_frame`、`clock_title`、`weather_card`

### 📝 发布前检查清单

- [ ] 预览图是否清晰且真实反映模板效果
- [ ] 描述是否写明了：适用场景、分辨率建议、依赖插件
- [ ] 模板中没有残留个人隐私信息（如账号、路径）
- [ ] 在无插件的新环境中测试能正常导入
- [ ] 如果使用了第三方插件，在描述中注明并提供下载地址

---

## 故障排查

### Q: 导入模板后部分组件显示「未知组件类型」

**A:** 说明模板使用了第三方插件提供的组件，而你尚未安装该插件。
- 查看模板描述中的「依赖插件」部分
- 安装对应插件后重启 Uniquenium
- 重新导入模板即可

### Q: 导入后组件位置偏移或超出屏幕

**A:** 这是因为模板设计时的分辨率与你当前的屏幕分辨率不一致。
- 解决：切换到编辑模式 → 全选组件 → 等比缩放并重新对齐
- 建议：模板描述中注明适配的分辨率（如 1920×1080）

### Q: 图片组件显示为空白

**A:** 模板不会打包外部图片资源。解决：
- 找到原模板作者使用的图片文件
- 手动复制到对应路径，或在属性面板中重新选择图片位置

### Q: 导出的模板文件非常大

**A:** 可能是预览图使用了过大分辨率：
- 使用系统自带的「截图工具」重新截取 600x400 左右的 PNG
- 或在导出时跳过「预览图」选项

---

## 模板版本迁移

Uniquenium 会自动处理旧版本模板的兼容升级：
- 模板格式 v1 → v2：自动转换组件属性命名
- 旧版控件名会自动映射为新名称（如不兼容会在日志中提示）

如果模板过旧无法自动迁移，建议在对应版本的 Uniquenium 中打开后重新导出。

---

## 分享你的模板

欢迎将你的优秀设计分享给社区！推荐方式：

1. **GitHub Discussions**：在 [Templates 分类](https://github.com/Uniquenium/Uniquenium/discussions/categories/templates) 发帖，附上：
   - 模板截图
   - 简短介绍
   - `.uniq-template` 下载链接（附件或网盘）

2. **模板库收录**：提交 PR 到 [Uniquenium/Awesome-Templates](https://github.com/Uniquenium/Awesome-Templates) 仓库，可被官方模板库收录展示。

更多开发相关：
- [🔌 插件开发指南](/custom-developing/plugin.md)
- [📚 UniDesk 控件库参考](/controls-reference/overview.md)
- [📖 术语表](/glossary.md)
