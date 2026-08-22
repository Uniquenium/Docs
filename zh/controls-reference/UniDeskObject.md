---
title: UniDeskObject
editLink: true
---

# UniDeskObject 类型

基础对象类型，基于 QtQuick `QtObject` 实现。当需要一个非可视化的容器来组织子对象时使用。

| 项目 | 说明 |
|------|------|
| 控件类型 | 非可视化对象（Object） |
| 源代码文件路径 | `UniDesk/Controls/UniDeskObject.qml` |
| 继承 | QtQuick QtObject |
| QML 导入方式 | `import UniDesk.Controls 1.0` |

## 特性

- 支持 `default property list<QtObject> children`，可以包含子对象
- 不可见、无尺寸，仅用于组织子对象或作为逻辑容器

## 示例

```qml
import UniDesk.Controls 1.0

UniDeskObject {
    id: myObject

    UniDeskText {
        text: "子控件1"
    }
    UniDeskText {
        text: "子控件2"
    }
}
```

## 相关文档

- [UniDeskFrame](./UniDeskFrame.md) — 可视化容器
- [UniDeskInfoBar](./UniDeskInfoBar.md) — 继承自 UniDeskObject 的提示条