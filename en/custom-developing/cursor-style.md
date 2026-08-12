---
title: Custom Cursor Styles
layout: doc
editLink: true
---

# Custom Cursor Styles

Tired of the default white arrow from Windows? Uniquenium supports two cursor customization methods: the **Native method** (modifying the registry to replace `.cur` files) and the **QML method** (hiding the system cursor and drawing a fully custom cursor with QML).

---

## Comparison of the Two Methods

| Feature | Native Method | QML Method |
|---------|---------------|------------|
| Principle | Modifies the `HKCU\Control Panel\Cursors` registry to replace `.cur`/`.ani` files | Sets all system cursors to blank, draws an overlay with a QML component |
| Use Cases | Simple cursor replacement, static/animated `.cur` files | Fully custom cursors (e.g., follow animations, glow effects, special interactions) |
| Implementation Difficulty | Low: just need cursor files | Medium: need to write a QML component |
| Global Effect | Yes (affects all applications) | Only visible on the Uniquenium desktop layer |
| Animation Support | `.ani` animation | Any QML animation |
| Performance | High (system-level) | Medium (QML rendering) |
| Compatibility | Perfectly supports all Windows applications | System applications may still display the system cursor |

---

## System Cursor States

Uniquenium supports replacing the following **15 system cursor states**:

| State | Enum Value | Description |
|-------|------------|-------------|
| Arrow | 0 | Default arrow pointer |
| IBeam | 1 | Text selection vertical line |
| Wait | 2 | Hourglass/spinner wait |
| Crosshair | 3 | Crosshair (drawing) |
| Hand | 4 | Hyperlink hand |
| Help | 5 | Help select (arrow + question mark) |
| SizeAll | 6 | Four-way move |
| SizeNESW | 7 | Top-right to bottom-left diagonal resize |
| SizeNS | 8 | Vertical resize |
| SizeNWSE | 9 | Top-left to bottom-right diagonal resize |
| SizeWE | 10 | Horizontal resize |
| UpArrow | 11 | Up arrow |
| AppStarting | 12 | Application starting (arrow + spinner) |
| Pin | 13 | Pin cursor |
| No | 14 | Forbidden/unavailable |

::: tip State Synchronization
Under the QML method, Uniquenium detects the current system cursor state every 50ms via `UniDeskCursorManager` and passes the `cursorStdState` property to the QML component. The QML component can switch its appearance based on this state.
:::

---

## Method 1: Native Method

### Working Principle

1. Reads the cursor mapping from `cursor-style-info.json`
2. Backs up the current cursor paths in the registry
3. Writes the custom `.cur` file paths to the `HKCU\Control Panel\Cursors` registry
4. Calls `SystemParametersInfoW(SPI_SETCURSORS)` to refresh the system cursors

### Preparing `cursor-style-info.json`

Create `cursor-style-info.json` under the cursor theme directory:

```
MyCursorTheme/
├── cursor-style-info.json
├── Arrow.cur
├── Hand.cur
├── IBeam.cur
├── Wait.ani
└── ...
```

#### `cursor-style-info.json` Structure

```json
{
    "name": "My Cursor Theme",
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

### Loading Method

Call `UniDeskCursorManager.loadCustomByPath()` via QML:

```qml
UniDeskCursorManager {
    onLoadCustomByPath: {
        // dirPath is the absolute path of the cursor theme directory
        var success = UniDeskCursorManager.loadCustomByPath("file:///C:/Cursors/MyCursorTheme");
        if (success) {
            console.log("Cursor theme loaded successfully");
        }
    }
}
```

### Restoring System Defaults

```qml
UniDeskCursorManager.restoreSystem();
```

`restoreSystem()` restores the cursor paths in the registry to their original values before the theme was loaded and refreshes the system cursors.

---

## Method 2: QML Method

### Working Principle

1. Reads the `cursor-style-info.json` configuration
2. Sets **all 15 cursor states** in the system registry to the blank cursor (`blank-cursor.cur`)
3. Loads the QML cursor component via `Loader` at the top of the desktop (`z: 32767`)
4. The QML component reads the `cursorStdState` property every 50ms and switches its appearance based on the current system cursor state
5. When the user moves the mouse, the QML cursor follows the system mouse position and renders in real time

### Preparing `cursor-style-info.json`

```
MyQmlCursor/
├── cursor-style-info.json
└── MyCursor.qml
```

```json
{
    "name": "QML Cursor Theme",
    "type": "Qml",
    "qmlFilePath": "MyCursor.qml"
}
```

### Writing the QML Cursor Component

A QML component is a plain `Item` that must listen to the `UniDeskCursorManager.cursorStdState` property to switch the cursor appearance.

#### `MyCursor.qml` Example

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

    // Follow mouse position
    x: UniDeskTools.cursorPosition.x - hotspotX
    y: UniDeskTools.cursorPosition.y - hotspotY

    // Cursor state (obtained from UniDeskCursorManager)
    property int stdState: UniDeskCursorManager.cursorStdState

    // Hotspot offset for different states
    property int hotspotX: stdState === UniDeskCursorStdState.Crosshair ? 32 : 4
    property int hotspotY: stdState === UniDeskCursorStdState.Crosshair ? 32 : 4

    // Display different appearance based on state
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

    // More states...
}
```

::: tip Implementation Suggestions
- Use `UniDeskTools.cursorPosition` to get the global mouse coordinates
- Use the `UniDeskCursorStdState` enum to determine the current state
- Different states can use completely different visual effects (animations, gradients, glow, etc.)
- The QML cursor component must support all 15 states, at minimum providing a default appearance for the `Arrow` state
:::

### State Mapping

`cursorStdState` corresponds to the `UniDeskCursorStdState` enum values:

| Enum Value | Numeric Value | Description |
|------------|--------------|-------------|
| `Arrow` | 0 | Default arrow |
| `IBeam` | 1 | Text selection |
| `Wait` | 2 | Wait/hourglass |
| `Crosshair` | 3 | Crosshair |
| `Hand` | 4 | Hand |
| `Help` | 5 | Help |
| `SizeAll` | 6 | Four-way move |
| `SizeNESW` | 7 | Diagonal resize ↘↖ |
| `SizeNS` | 8 | Vertical resize ↕ |
| `SizeNWSE` | 9 | Diagonal resize ↙↗ |
| `SizeWE` | 10 | Horizontal resize ↔ |
| `UpArrow` | 11 | Up arrow |
| `AppStarting` | 12 | Starting |
| `Pin` | 13 | Pin |
| `No` | 14 | Forbidden |

### QML Method Loading Flow

1. `UniDeskCursorManager.loadCustomByPath(dirPath)` is called
2. Detects `type: "Qml"` → sets `isQmlCursor = true`
3. Changes all 15 system cursor registry values to `blank-cursor.cur`
4. Calls `refreshSystemCursors()` to refresh the system
5. The `Loader` in the main program loads the QML component specified by `qmlFilePath`
6. The QML component displays at the top overlay at `z: 32767`, following the mouse movement

---

## Cursor File Formats

### `.cur` vs `.ani`

| Format | Animation | Recommended Use Cases |
|--------|-----------|----------------------|
| **.cur** (static) | No | Daily use, recommended for all states except Wait |
| **.ani** (animated) | Yes | Wait, AppStarting, and other states that require animation |

### Size Specifications

- **Standard Size**: 32x32 pixels
- **High DPI**: 64x64, 128x128 (recommended for 4K screens)
- **Color Depth**: 32-bit ARGB (supports transparent edges)

---

## Creating Custom Cursors

### Using Ready-Made Tools

| Tool | Platform | Features |
|------|----------|----------|
| RealWorld Cursor Editor | Windows | Free, comprehensive |
| CursorWorkshop | Windows | Professional, supports batch |
| GIMP | Cross-platform | Open source, free |
| Convertio | Web | PNG to CUR |

### Design Specifications

1. **Consistent Style**: Keep the style consistent across the entire set of 15 cursors
2. **Contrast**: Add a 1-2px dark outline to cursor edges
3. **Clear Hotspots**: The arrow tip and crosshair center must be solid pixels
4. **Hotspot Coordinates**: In pixels, calculated from the top-left corner

---

## Programmatic Switching

### Loading Themes via Code

```qml
// Native method
UniDeskCursorManager.loadCustomByPath("file:///C:/Themes/MyNativeCursor");

// QML method
UniDeskCursorManager.loadCustomByPath("file:///C:/Themes/MyQmlCursor");
```

### Restoring System Defaults

```qml
UniDeskCursorManager.restoreSystem();
```

### Detecting Current Mode

```qml
// Check if it is QML cursor mode
if (UniDeskCursorManager.isQmlCursor) {
    console.log("Currently in QML cursor mode");
} else {
    console.log("Currently in system cursor mode");
}
```

### Getting Current Cursor State

```qml
// Get the current system cursor standard state
var state = UniDeskCursorManager.getStdState();
// The return value corresponds to the UniDeskCursorStdState enum
```

---

## Complete Examples

### Native Method: Minimal Black & White Cursor

```
MinimalCursor/
├── cursor-style-info.json
├── Arrow.cur          # Black arrow
├── IBeam.cur          # Black vertical line
├── Wait.ani           # Black spinning animation
├── Crosshair.cur      # Black crosshair
├── Hand.cur           # Black hand
├── Help.cur           # Black help
├── SizeAll.cur        # Black four-way
├── SizeNESW.cur       # Black diagonal
├── SizeNS.cur         # Black vertical
├── SizeNWSE.cur       # Black diagonal
├── SizeWE.cur         # Black horizontal
├── UpArrow.cur        # Black up arrow
├── AppStarting.ani    # Black starting animation
├── Pin.cur            # Black pin
└── No.cur             # Black forbidden
```

### QML Method: Neon Glow Cursor

```json
// cursor-style-info.json
{
    "name": "Neon Cursor",
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

    // Wait state rotation animation
    NumberAnimation on opacity {
        from: 0.3; to: 0.8; duration: 500; loops: Animation.Infinite
        running: cursor.state === UniDeskCursorStdState.Wait
    }
}
```

---

## Troubleshooting

### Q: Cursor does not change after loading

**A:** Check:
1. Whether the `type` field in `cursor-style-info.json` is `"Native"` or `"Qml"`
2. For the Native method, confirm that the `.cur` file paths are correct relative to the JSON file directory
3. For the QML method, confirm that the QML file pointed to by `qmlFilePath` exists
4. Check the console for errors such as `Failed to set cursor` or `cursor-style-info.json not found`

### Q: Cursor flickers or stutters in QML mode

**A:**
1. The QML cursor updates its state every 50ms. Make sure your QML component does not perform heavy computations
2. Avoid complex expressions in `x`/`y` bindings
3. Ensure there are no unnecessary `Animation` elements in the QML component

### Q: Cursor does not show in some applications under QML mode

**A:** This is expected behavior. Since the QML method sets the system cursor to blank, fullscreen applications that have their own cursors (such as games and certain browsers) will still use their own cursors. This is a limitation of Windows.

### Q: How to restore the system default cursor?

**A:** Two methods:
1. Call `UniDeskCursorManager.restoreSystem()`
2. When the program exits, `UniDeskCursorManager` automatically calls `restoreSystem()`

### Q: Some cursor states do not change in Native mode

**A:** Some applications override the system cursor settings. This is the application's own behavior and cannot be overridden by Uniquenium.

---

## Related References

- [Plugin Development Guide](/custom-developing/plugin.md): In plugins, you can dynamically switch cursors via `UniDeskCursorManager`
- [UniDeskTools Singleton](/controls-reference/singletons/UniDeskTools.md): Provides utility methods such as `cursorPosition`
- [UniDeskGlobals Singleton](/controls-reference/singletons/UniDeskGlobals.md): Query the current theme mode