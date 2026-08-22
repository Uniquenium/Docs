---
title: UniDeskTextStyle
editLink: true
---

# UniDeskTextStyle Type

Font style singleton based on a C++ backend. It pre-defines seven font sizes (tiny / little / littleStrong / small_ / medium / large / huge_) used globally. All controls reference their font properties through this singleton. When the font family changes, all controls refresh automatically.

| Item | Description |
|------|-------------|
| Control Type | Global Singleton |
| Source File | `UniDesk/CppExt/UniDeskTextStyle.h` / `.cpp` |
| Inherits | QObject |
| QML Import | `import UniDesk 1.0` |

## Properties

### `property QString family`
Global font family name. Defaults to the system default font; on Windows the default is `"微软雅黑"`.

### `property QFont tiny`
Size 12, regular weight. For auxiliary labels, captions.

### `property QFont little`
Size 13, regular weight. For secondary text.

### `property QFont littleStrong`
Size 13, DemiBold. For emphasized secondary text.

### `property QFont small_`
Size 20, DemiBold. For button labels, card titles.

### `property QFont medium`
Size 28, DemiBold. For primary headings.

### `property QFont large`
Size 40, DemiBold. For large titles, welcome messages.

### `property QFont huge_`
Size 68, DemiBold. For display text.

## Methods

### `function changeFontFamily(family)`
Changes the global font family and regenerates all seven font sizes. Emits the `familyChanged` signal.

```qml
import UniDesk 1.0

UniDeskTextStyle.changeFontFamily("Source Han Sans CN")
// All controls using UniDeskTextStyle.tiny / small_ / ... refresh automatically
```

## Example

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

Column {
    spacing: 8
    Text {
        text: "Caption"
        font: UniDeskTextStyle.tiny
    }
    UniDeskText {
        textContent: "Button Label"
        font: UniDeskTextStyle.small_
    }
    Text {
        text: "Large Title"
        font: UniDeskTextStyle.large
    }
}
```

## Notes

- `small_` and `huge_` use underscore suffixes to avoid QML keyword conflicts.
- Setting the `family` property directly does **not** refresh other sizes — always use `changeFontFamily()`.

## Related

- [UniDeskSettings](./UniDeskSettings.md) — `primaryColor` theme color
- [Controls Reference](../overview.md) — Controls that use font styles