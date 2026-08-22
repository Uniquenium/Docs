---
title: UniDeskComboBox
editLink: true
---

# UniDeskComboBox Type

Dropdown control based on `UniDeskButton`. Integrates `UniDeskMenu` as the popup list, supporting editable mode, font delegate rendering, and component delegate rendering.

| Item | Description |
|------|-------------|
| Control Type | Visual Control |
| Source File | `UniDesk/Controls/UniDeskComboBox.qml` |
| Inherits | UniDeskButton |
| QML Import | `import UniDesk.Controls 1.0` |

## Custom Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableFontDelegate` | `bool` | `false` | Enable font delegate mode (renders each item's text as a font name) |
| `enableComDelegate` | `bool` | `false` | Enable component delegate mode (for editor highlighting) |
| `comManager` | `var` | — | Component manager reference |
| `currentIndex` | `int` | `0` | Current selected index |
| `model` | `var` | `[]` | List of options |
| `editable` | `bool` | `false` | Whether the text field is editable |
| `displayText` | `string` | `model[currentIndex]` | Display text (non-editable mode) |
| `editText` | `string` | `displayText` | Edit text (editable mode) |
| `currentText` | `string` | — | Current text (read-only, returns displayText or editText depending on mode) |
| `inputMethodHints` | `int` | `Qt.ImhNoPredictiveText` | Input method hints |
| `validator` | `var` | `null` | Input validator |
| `selectTextByMouse` | `bool` | `false` | Whether text can be selected by mouse |

## Signals

### `signal activated()`
Emitted when the user triggers a selection (menu click or edit completion match).

## Behavior

- Clicking the button automatically opens the `UniDeskMenu` popup
- The menu automatically pops up or down depending on available space
- `enableFontDelegate` mode renders menu items using their text as font names (used by font pickers)
- `enableComDelegate` mode links menu item highlighting to component `indicated` state
- In editable mode, pressing Enter after typing automatically matches an option in `model`
- Inherits all properties from `UniDeskButton` (colors, radius, icon, etc.)

## Examples

```qml
import UniDesk.Controls 1.0

// Basic usage
UniDeskComboBox {
    model: ["Option A", "Option B", "Option C"]
    currentIndex: 0
    onActivated: console.log("selected:", currentText)
}

// Editable mode
UniDeskComboBox {
    model: ["Beijing", "Shanghai", "Guangzhou"]
    editable: true
    onActivated: console.log("confirmed:", currentText)
}

// Font delegate mode
UniDeskComboBox {
    model: ["Microsoft YaHei", "SimSun", "KaiTi"]
    enableFontDelegate: true
}
```

## Related

- [UniDeskButton](./UniDeskButton.md) — Base button
- [UniDeskMenu](./UniDeskMenu.md) — Popup menu
- [UniDeskMenuItem](./UniDeskMenuItem.md) — Menu item
- [UniDeskFontBox](./UniDeskFontBox.md) — Font selector using font delegate