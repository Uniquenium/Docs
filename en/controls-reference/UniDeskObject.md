---
title: UniDeskObject
editLink: true
---

# UniDeskObject Type

Base object type based on QtQuick `QtObject`. Used when you need a non-visual container to organize child objects.

| Item | Description |
|------|-------------|
| Control Type | Non-visual Object |
| Source File | `UniDesk/Controls/UniDeskObject.qml` |
| Inherits | QtQuick QtObject |
| QML Import | `import UniDesk.Controls 1.0` |

## Features

- Supports `default property list<QtObject> children`, can contain child objects
- Invisible, no size, used only for organizing children or as a logical container

## Example

```qml
import UniDesk.Controls 1.0

UniDeskObject {
    id: myObject

    UniDeskText {
        text: "Child 1"
    }
    UniDeskText {
        text: "Child 2"
    }
}
```

## Related

- [UniDeskFrame](./UniDeskFrame.md) — Visual container
- [UniDeskInfoBar](./UniDeskInfoBar.md) — Inherits from UniDeskObject