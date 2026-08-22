---
title: UniDeskTextStyle
editLink: true
---

# UniDeskTextStyle 类型

字体样式单例，基于 C++ 后端实现。预定义了七级字号（tiny / little / littleStrong / small_ / medium / large / huge_）供全局统一调用。所有控件的字体属性都基于此单例，修改字体家族后会自动同步刷新所有控件。

| 项目 | 说明 |
|------|------|
| 控件类型 | 全局单例 |
| 源文件 | `UniDesk/CppExt/UniDeskTextStyle.h` / `.cpp` |
| 继承 | QObject |
| QML 导入 | `import UniDesk 1.0` |

## 属性

### `property QString family`
全局字体家族名称。默认值为系统默认字体，Windows 下默认为 `"微软雅黑"`。

### `property QFont tiny`
字号 12，常规字重。用于辅助说明、标签等小号文字。

### `property QFont little`
字号 13，常规字重。用于次要文本。

### `property QFont littleStrong`
字号 13，DemiBold 加粗。用于强调型次要文本。

### `property QFont small_`
字号 20，DemiBold 加粗。用于按钮文本、卡片标题等。

### `property QFont medium`
字号 28，DemiBold 加粗。用于主要标题。

### `property QFont large`
字号 40，DemiBold 加粗。用于大标题、欢迎语等。

### `property QFont huge_`
字号 68，DemiBold 加粗。用于超大号展示文本。

## 方法

### `function changeFontFamily(family)`
修改全局字体家族，自动重新生成所有七级字号并触发 `familyChanged` 信号。

```qml
import UniDesk 1.0

UniDeskTextStyle.changeFontFamily("思源黑体")
// 所有使用 UniDeskTextStyle.tiny / small_ / ... 的控件自动刷新
```

## 使用示例

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

Column {
    spacing: 8
    Text {
        text: "辅助说明"
        font: UniDeskTextStyle.tiny
    }
    UniDeskText {
        textContent: "按钮文本"
        font: UniDeskTextStyle.small_
    }
    Text {
        text: "大标题"
        font: UniDeskTextStyle.large
    }
}
```

## 备注

- 七级字号中 `small_` 和 `huge_` 使用下划线后缀，以规避 QML 关键字 `small` / `huge` 的命名冲突。
- 修改 `family` 属性不会自动刷新其他字号，必须调用 `changeFontFamily()` 才能同步更新。

## 相关文档

- [UniDeskSettings](./UniDeskSettings.md) — `primaryColor` 主题色
- [UniDeskControls 控件库](../overview.md) — 使用字体样式的控件