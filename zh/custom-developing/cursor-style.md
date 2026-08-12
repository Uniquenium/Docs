---
title: 自定义光标样式
layout: doc
editLink: true
---

# 自定义光标样式

厌倦了 Windows 默认的白色箭头？Uniquenium 支持两种光标自定义方式：**系统方式**（修改注册表替换 `.cur` 文件）和 **QML 方式**（隐藏系统光标，用 QML 绘制完全自定义的光标）。

---

## 两种方式对比

| 特性 | 系统方式 (Native) | QML 方式 |
|------|-------------------|----------|
| 原理 | 修改 `HKCU\Control Panel\Cursors` 注册表，替换 `.cur`/`.ani` 文件 | 将所有系统光标设为空白，用 QML 组件覆盖绘制 |
| 适用场景 | 简单的光标替换、静态/动画 `.cur` 文件 | 完全自定义的光标（如跟随动画、发光效果、特殊交互） |
| 实现难度 | 低：只需准备光标文件 | 中：需要编写 QML 组件 |
| 全局生效 | 是（所有应用生效） | 仅 Uniquenium 桌面层可见 |
| 动画支持 | `.ani` 动画 | 任意 QML 动画 |
| 性能 | 高（系统级） | 中（QML 渲染） |
| 兼容性 | 完美支持所有 Windows 应用 | 系统应用仍可能显示系统光标 |

---

## 系统光标状态

Uniquenium 支持替换以下 **15 种系统光标状态**：

| 状态 | 枚举值 | 说明 |
|------|--------|------|
| Arrow | 0 | 默认箭头指针 |
| IBeam | 1 | 文本选择竖线 |
| Wait | 2 | 沙漏/转圈等待 |
| Crosshair | 3 | 十字准星（绘图） |
| Hand | 4 | 超链接手型 |
| Help | 5 | 帮助选择（箭头+问号） |
| SizeAll | 6 | 四向移动 |
| SizeNESW | 7 | 右上-左下对角调整 |
| SizeNS | 8 | 上下调整尺寸 |
| SizeNWSE | 9 | 左上-右下对角调整 |
| SizeWE | 10 | 左右调整尺寸 |
| UpArrow | 11 | 向上箭头 |
| AppStarting | 12 | 应用启动中（箭头+转圈） |
| Pin | 13 | 固定/图钉光标 |
| No | 14 | 禁止/不可用 |

::: tip 状态同步
QML 方式下，Uniquenium 会通过 `UniDeskCursorManager` 每 50ms 检测一次当前系统光标状态，并将 `cursorStdState` 属性传递给 QML 组件。QML 组件可以根据此状态切换不同的外观。
:::

---

## 方式一：系统方式（Native）

### 工作原理

1. 读取 `cursor-style-info.json` 中的光标映射
2. 备份当前注册表中的光标路径
3. 将自定义 `.cur` 文件路径写入注册表 `HKCU\Control Panel\Cursors`
4. 调用 `SystemParametersInfoW(SPI_SETCURSORS)` 刷新系统光标

### 准备 `cursor-style-info.json`

在光标主题目录下创建 `cursor-style-info.json`：

```
MyCursorTheme/
├── cursor-style-info.json
├── Arrow.cur
├── Hand.cur
├── IBeam.cur
├── Wait.ani
└── ...
```

#### `cursor-style-info.json` 结构

```json
{
    "name": "我的光标主题",
    "type": "Native",
    "Arrow": "Arrow.cur",
    "IBeam": "IBeam.cur",
    "Wait": "Wait.ani",
    "Crosshair": "Crosshair.cur",
    "Hand": "Hand.cur",
    "Help": "Help.cur",
    "SizeAll": "SizeAll.cur",
    "SizeNESW": "SizeNESW.cur",
    "SizeNS": "SizeNS.cur",
    "SizeNWSE": "SizeNWSE.cur",
    "SizeWE": "SizeWE.cur",
    "UpArrow": "UpArrow.cur",
    "AppStarting": "AppStarting.ani",
    "Pin": "Pin.cur",
    "No": "No.cur"
}
```

### 加载方式

通过 QML 调用 `UniDeskCursorManager.loadCustomByPath()`：

```qml
UniDeskCursorManager {
    onLoadCustomByPath: {
        // dirPath 为光标主题目录的绝对路径
        var success = UniDeskCursorManager.loadCustomByPath("file:///C:/Cursors/MyCursorTheme");
        if (success) {
            console.log("光标主题加载成功");
        }
    }
}
```

### 恢复系统默认

```qml
UniDeskCursorManager.restoreSystem();
```

`restoreSystem()` 会将注册表中的光标路径恢复为加载主题前的原始值，并刷新系统光标。

---

## 方式二：QML 方式

### 工作原理

1. 读取 `cursor-style-info.json` 配置
2. 将系统注册表中**所有 15 种光标状态**都设置为空白光标 (`blank-cursor.cur`)
3. 在桌面顶层（`z: 32767`）通过 `Loader` 加载 QML 光标组件
4. QML 组件每 50ms 读取 `cursorStdState` 属性，根据系统当前光标状态切换外观
5. 用户移动鼠标时，QML 光标跟随系统鼠标位置实时渲染

### 准备 `cursor-style-info.json`

```
MyQmlCursor/
├── cursor-style-info.json
└── MyCursor.qml
```

```json
{
    "name": "QML 光标主题",
    "type": "Qml",
    "qmlFilePath": "MyCursor.qml"
}
```

### 编写 QML 光标组件

QML 组件是一个普通的 `Item`，必须监听 `UniDeskCursorManager.cursorStdState` 属性来切换光标外观。

#### `MyCursor.qml` 示例

```qml
import QtQuick
import QtQuick.Controls
import UniDesk
import UniDesk.Controls

Item {
    id: cursor
    width: 64
    height: 64
    visible: true

    // 跟随鼠标位置
    x: UniDeskTools.cursorPosition.x - hotspotX
    y: UniDeskTools.cursorPosition.y - hotspotY

    // 光标状态（从 UniDeskCursorManager 获取）
    property int stdState: UniDeskCursorManager.cursorStdState

    // 不同状态的热点偏移
    property int hotspotX: stdState === UniDeskCursorStdState.Crosshair ? 32 : 4
    property int hotspotY: stdState === UniDeskCursorStdState.Crosshair ? 32 : 4

    // 根据状态显示不同外观
    Rectangle {
        anchors.fill: parent
        visible: cursor.stdState === UniDeskCursorStdState.Arrow
        color: "transparent"
        border.color: "#000"
        border.width: 1
        radius: 2

        Text {
            anchors.centerIn: parent
            text: "ARROW"
            font.pixelSize: 10
            color: "#333"
        }
    }

    Rectangle {
        anchors.fill: parent
        visible: cursor.stdState === UniDeskCursorStdState.IBeam
        color: "#333"
        width: 2
        height: parent.height
        anchors.left: parent.left
        anchors.leftMargin: parent.width / 2 - 1
    }

    Text {
        anchors.centerIn: parent
        visible: cursor.stdState === UniDeskCursorStdState.Wait
        text: "Loading..."
        color: "#e74c3c"
        font.pixelSize: 12
        font.bold: true
    }

    // 更多状态...
}
```

::: tip 实现建议
- 使用 `UniDeskTools.cursorPosition` 获取鼠标全局坐标
- 通过 `UniDeskCursorStdState` 枚举判断当前状态
- 不同状态可以使用完全不同的视觉表现（动画、渐变、发光等）
- QML 光标组件必须支持所有 15 种状态，至少为 `Arrow` 状态提供默认外观
:::

### 状态映射

`cursorStdState` 与 `UniDeskCursorStdState` 枚举值对应：

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `Arrow` | 0 | 默认箭头 |
| `IBeam` | 1 | 文本选择 |
| `Wait` | 2 | 等待/沙漏 |
| `Crosshair` | 3 | 十字准星 |
| `Hand` | 4 | 手型 |
| `Help` | 5 | 帮助 |
| `SizeAll` | 6 | 四向移动 |
| `SizeNESW` | 7 | 对角调整 ↘↖ |
| `SizeNS` | 8 | 上下调整 ↕ |
| `SizeNWSE` | 9 | 对角调整 ↙↗ |
| `SizeWE` | 10 | 左右调整 ↔ |
| `UpArrow` | 11 | 向上箭头 |
| `AppStarting` | 12 | 启动中 |
| `Pin` | 13 | 图钉 |
| `No` | 14 | 禁止 |

### QML 方式加载流程

1. `UniDeskCursorManager.loadCustomByPath(dirPath)` 被调用
2. 检测到 `type: "Qml"` → 设置 `isQmlCursor = true`
3. 将所有 15 种系统光标注册表值改为 `blank-cursor.cur`
4. 调用 `refreshSystemCursors()` 刷新系统
5. 主程序中的 `Loader` 加载 `qmlFilePath` 指定的 QML 组件
6. QML 组件在 `z: 32767` 顶层覆盖显示，跟随鼠标移动

---

## 光标文件格式

### `.cur` vs `.ani`

| 格式 | 动画 | 推荐场景 |
|------|------|---------|
| **.cur** (静态) | 否 | 日常使用，推荐除 Wait 外的所有状态 |
| **.ani** (动态) | 是 | Wait、AppStarting 等需要动画的状态 |

### 尺寸规格

- **标准尺寸**：32×32 像素
- **高 DPI**：64×64、128×128（4K 屏推荐）
- **色深**：32 位 ARGB（支持透明边缘）

---

## 制作自定义光标

### 使用现成工具

| 工具 | 平台 | 特点 |
|------|------|------|
| RealWorld Cursor Editor | Windows | 免费、功能全面 |
| CursorWorkshop | Windows | 专业级，支持批量 |
| GIMP | 全平台 | 开源免费 |
| Convertio | 网页 | PNG 转 CUR |

### 设计规范

1. **风格统一**：整套 15 个光标保持风格一致
2. **对比度**：光标边缘加 1-2px 深色描边
3. **热点清晰**：箭头尖端、十字中心必须是实像素
4. **热点坐标**：以像素为单位，从左上角开始计算

---

## 程序化切换

### 通过代码加载主题

```qml
// Native 方式
UniDeskCursorManager.loadCustomByPath("file:///C:/Themes/MyNativeCursor");

// QML 方式
UniDeskCursorManager.loadCustomByPath("file:///C:/Themes/MyQmlCursor");
```

### 恢复系统默认

```qml
UniDeskCursorManager.restoreSystem();
```

### 检测当前模式

```qml
// 判断是否为 QML 光标模式
if (UniDeskCursorManager.isQmlCursor) {
    console.log("当前为 QML 光标模式");
} else {
    console.log("当前为系统光标模式");
}
```

### 获取当前光标状态

```qml
// 获取当前系统光标标准状态
var state = UniDeskCursorManager.getStdState();
// 返回值对应 UniDeskCursorStdState 枚举
```

---

## 完整示例

### 系统方式：极简黑白光标

```
MinimalCursor/
├── cursor-style-info.json
├── Arrow.cur          # 黑色箭头
├── IBeam.cur          # 黑色竖线
├── Wait.ani           # 黑色转圈动画
├── Crosshair.cur      # 黑色十字
├── Hand.cur           # 黑色手型
├── Help.cur           # 黑色帮助
├── SizeAll.cur        # 黑色四向
├── SizeNESW.cur       # 黑色对角
├── SizeNS.cur         # 黑色上下
├── SizeNWSE.cur       # 黑色对角
├── SizeWE.cur         # 黑色左右
├── UpArrow.cur        # 黑色上箭头
├── AppStarting.ani    # 黑色启动动画
├── Pin.cur            # 黑色图钉
└── No.cur             # 黑色禁止
```

### QML 方式：霓虹发光光标

```json
// cursor-style-info.json
{
    "name": "霓虹光标",
    "type": "Qml",
    "qmlFilePath": "NeonCursor.qml"
}
```

```qml
// NeonCursor.qml
import QtQuick
import UniDesk
import UniDesk.Controls

Item {
    id: cursor
    width: 48
    height: 48
    x: UniDeskTools.cursorPosition.x - (state === UniDeskCursorStdState.Crosshair ? 24 : 4)
    y: UniDeskTools.cursorPosition.y - (state === UniDeskCursorStdState.Crosshair ? 24 : 4)

    property int state: UniDeskCursorManager.cursorStdState

    Rectangle {
        anchors.fill: parent
        radius: 8
        color: {
            switch(cursor.state) {
            case UniDeskCursorStdState.Arrow: return "#00ffaa"
            case UniDeskCursorStdState.Hand: return "#ffaa00"
            case UniDeskCursorStdState.Wait: return "#ff00aa"
            default: return "#00ffff"
            }
        }
        opacity: 0.3
        border.color: {
            switch(cursor.state) {
            case UniDeskCursorStdState.Arrow: return "#00ffaa"
            case UniDeskCursorStdState.Hand: return "#ffaa00"
            case UniDeskCursorStdState.Wait: return "#ff00aa"
            default: return "#00ffff"
            }
        }
        border.width: 2
    }

    // 等待状态旋转动画
    NumberAnimation on opacity {
        from: 0.3; to: 0.8; duration: 500; loops: Animation.Infinite
        running: cursor.state === UniDeskCursorStdState.Wait
    }
}
```

---

## 故障排查

### Q: 加载后光标没有变化

**A:** 检查：
1. `cursor-style-info.json` 中 `type` 字段是否为 `"Native"` 或 `"Qml"`
2. Native 方式下，确认 `.cur` 文件路径相对于 JSON 文件目录正确
3. QML 方式下，确认 `qmlFilePath` 指向的 QML 文件存在
4. 查看控制台是否有 `Failed to set cursor` 或 `cursor-style-info.json not found` 等错误

### Q: QML 方式下光标闪烁或卡顿

**A:** 
1. QML 光标每 50ms 更新一次状态，确保你的 QML 组件不要执行重计算
2. 避免在 `x`/`y` 绑定中使用复杂表达式
3. 确保 QML 组件中没有不必要的 `Animation`

### Q: QML 方式下某些应用中不显示光标

**A:** 这是预期行为。由于 QML 方式将系统光标设为空白，那些拥有自己光标的全屏应用（如游戏、某些浏览器）仍会使用自己的光标。这是 Windows 的限制。

### Q: 如何恢复系统默认光标？

**A:** 两种方式：
1. 调用 `UniDeskCursorManager.restoreSystem()`
2. 在程序退出时，`UniDeskCursorManager` 会自动调用 `restoreSystem()`

### Q: Native 方式下部分光标状态不变

**A:** 某些应用会覆盖系统光标设置。这是应用自身的行为，Uniquenium 无法覆盖。

---

## 相关参考

- [插件开发指南](/custom-developing/plugin.md)：插件中可通过 `UniDeskCursorManager` 动态切换光标
- [UniDeskTools 单例](/controls-reference/singletons/UniDeskTools.md)：提供 `cursorPosition` 等工具方法
- [UniDeskGlobals 单例](/controls-reference/singletons/UniDeskGlobals.md)：查询当前主题模式