---
title: UniDeskTextStyle
editLink: true
---

# UniDeskTextStyle Singleton

Font preset singleton, provides 4 preset font sizes (tiny, little, middle, big) for consistent font usage across all controls.

| Project | Description |
|---------|-------------|
| Type | Singleton |
| Source File | `UniDesk/Singletons/UniDeskTextStyle.qml` |
| QML Import | `import UniDesk 1.0` |

## Using the Singleton

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

// Use preset fonts
UniDeskText {
    text: "Little Font"
    font.pixelSize: UniDeskTextStyle.little
}

UniDeskText {
    text: "Middle Font"
    font.pixelSize: UniDeskTextStyle.middle
}
```

## Properties

### `property real tiny`
Tiny font size, suitable for labels, annotations, etc.

### `property real little`
Small font size, suitable for secondary text, descriptions, etc.

### `property real middle`
Normal font size, suitable for body text.

### `property real big`
Large font size, suitable for titles, headings, etc.

## Basic Usage

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

Column {
    spacing: 10

    UniDeskText {
        text: "Title"
        font.pixelSize: UniDeskTextStyle.big
        font.bold: true
    }

    UniDeskText {
        text: "Body text"
        font.pixelSize: UniDeskTextStyle.middle
    }

    UniDeskText {
        text: "Secondary text"
        font.pixelSize: UniDeskTextStyle.little
        color: "#888"
    }

    UniDeskText {
        text: "Annotation"
        font.pixelSize: UniDeskTextStyle.tiny
        color: "#aaa"
    }
}
```

## Notes

- The font sizes for `tiny`, `little`, `middle`, and `big` are determined by the system's font scaling and current theme, and users can adjust them in the settings.
- Using these presets ensures consistent font sizing across the entire application.

## Related Singletons

- [UniDeskGlobals](/en/controls-reference/singletons/UniDeskGlobals.md) - Global state
- [UniDeskSettings](/en/controls-reference/singletons/UniDeskSettings.md) - Settings

## Related Documentation

- [UniDeskText](/en/controls-reference/UniDeskText.md) - Text control
- [Glossary](/en/glossary.md)