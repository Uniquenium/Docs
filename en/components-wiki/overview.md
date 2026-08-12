---
title: Components Overview
layout: doc
editLink: true
---

# Components Overview

Welcome to Uniquenium! This guide will introduce you to the core features and basic operation methods.

## Interface Introduction

The main interface of Uniquenium consists of the following parts:

### Tray Area
After launching, the program minimizes to the system tray area (bottom-right of the taskbar) by default:
- **Left-click**: Show/hide the main panel
- **Right-click**: Open the tray menu, including:
  - Show main panel
  - Page management
  - Settings
  - Plugin management
  - Exit program

### Main Panel
The main panel is the core operation area of Uniquenium, divided into:
1. **Left Navigation Bar**: Page list, create/delete/switch pages
2. **Middle Workspace**: Page canvas, where components are displayed and edited
3. **Right Property Panel**: Shows property editing options when a component is selected (edit mode)

### Edit Mode vs. Browse Mode
Uniquenium has two operating modes:
- **Edit Mode**: Can add, delete, drag components, adjust properties
- **Browse Mode**: Components display normally but cannot be modified (daily use state)

Switch via the "Edit/Browse" toggle button in the top toolbar, or press `Ctrl + E`.

---

## Creating Pages

Pages are containers for Uniquenium to organize components. You can create multiple independent pages, for example:
- Main panel: put clock, weather, quick launch
- Monitoring panel: put CPU/memory/network monitoring charts
- Work panel: put to-do items, notes

### Steps
1. Open the main panel, make sure you are in **Edit Mode**
2. Click the **"+ New Page"** button at the top of the left navigation bar
3. Enter the page name in the dialog that pops up (e.g., "My Home")
4. Select the page style:
   - **Normal Panel**: Fixed-size window panel
   - **Full-screen Overlay**: Translucent layer covering the entire screen
   - **Frameless Panel**: Freely resizable
5. Click "OK" to complete creation

### Page Management
- **Switch Page**: Click the page name in the left navigation bar
- **Rename Page**: Right-click page → Rename
- **Delete Page**: Right-click page → Delete (warning: all components in the page will also be deleted)
- **Copy Page**: Right-click page → Copy as New Page
- **Export Template**: Right-click page → Export as Template (share or backup)
- **Page Sorting**: Drag directly in the navigation bar to adjust order

---

## Adding Components

Uniquenium provides a variety of built-in components, and more can be extended through the plugin system.

### Addition Steps
1. Make sure you are in **Edit Mode**
2. Click the **"Add Component"** button in the toolbar (or press `Ctrl + Shift + A`)
3. In the component selection window, select the component type from the left category:
   - **Basic**: Text, Image, Button, Icon
   - **Input**: Text Field, CheckBox, Dropdown Selection
   - **Container**: Frame, Tab
   - **Display**: Chart, Progress Bar, Tooltip
   - **Window**: Dialog, Message Box
   - **Custom**: Components provided by plugins
4. Click or drag the component to the workspace to add it

### Recommended Components

| Component | Purpose | Example Scenario |
|-----------|---------|-----------------|
| UniDeskText | Display text | Clock title, note content |
| UniDeskImage | Display images | Avatar, photo wall, Logo |
| UniDeskButton | Click button | Quick launch, function toggle |
| UniDeskFrame | Group container | Group multiple components together |
| UniDeskChart | Data chart | CPU/memory usage monitoring |
| UniDeskTextField | Text input | To-do input field |
| UniDeskIcon | Icon display | Function icon, status indicator |

---

## Component Property Editing

After selecting a component, the right property panel displays the editable properties for that component.

### Basic Operations

#### Select Component
- **Click** the component in the workspace to select it (blue border displayed)
- **Multi-select**: Hold `Shift` and click sequentially, or drag to select multiple components
- **Select All**: `Ctrl + A`
- **Deselect**: Click blank area or press `Esc`

#### Move & Resize
- **Move**: Drag the component directly to the target position
- **Precise Move**: Use arrow keys to fine-tune (1 pixel), hold `Shift` + arrow keys to move 10 pixels at a time
- **Resize**: Drag edge or corner control points after selecting the component
- **Keep Proportion**: Hold `Shift` and drag corner control point

#### Copy & Delete
- **Copy**: After selecting, press `Ctrl + C`, then `Ctrl + V` to paste; or right-click → Copy
- **Cut**: `Ctrl + X`
- **Delete**: Press `Delete`; or right-click → Delete

### Common Properties

Common properties for all components:

| Property | Description | Example Value |
|----------|-------------|---------------|
| X / Y | Component top-left coordinate (pixels) | X: 100, Y: 50 |
| Width / Height | Component size (pixels) | W: 200, H: 100 |
| Opacity | 0 (fully transparent) ~ 1 (fully opaque) | 0.85 |
| Visibility | Whether to display the component | true / false |
| Z-Order | Component stacking order, larger values go on top | 0, 1, 2... |
| Component ID | Unique identifier for script references | myButton_001 |

### Layer Adjustment

The component's layer (Z-axis) determines which one displays on top when overlapping:
- Right-click component → **Bring to Front** (set Z to maximum)
- Right-click component → **Send to Back** (set Z to minimum)
- Right-click component → **Move Up One Layer** (Z +1)
- Right-click component → **Move Down One Layer** (Z -1)
- Drag directly in the left "Component Tree" panel to adjust order

### Alignment & Distribution

After selecting multiple components, use the toolbar alignment buttons:
- Left align / Right align / Vertical center
- Top align / Bottom align / Horizontal center
- Horizontal equal spacing / Vertical equal spacing
- Equal width / Equal height / Equal size

---

## Shortcut Settings

Properly using shortcuts can greatly improve operational efficiency. Uniquenium supports rich global hotkey binding.

### Default Shortcuts

| Shortcut | Function |
|----------|----------|
| `Ctrl + Alt + U` | Show/hide main panel |
| `Ctrl + Alt + S` | Open settings window |
| `Ctrl + E` | Toggle edit/browse mode |
| `Ctrl + Shift + A` | Add new component |
| `Ctrl + N` | Create new page |
| `Ctrl + S` | Save current page |
| `Ctrl + Z` | Undo previous action |
| `Ctrl + Shift + Z` | Redo action |
| `Delete` | Delete selected component |
| `Ctrl + D` | Quickly copy selected component |

### Custom Shortcuts
1. Open the **Settings** → **Shortcuts** tab
2. Find the function to modify, click the shortcut input box
3. Press the new key combination you want (e.g., `Ctrl + Alt + H`)
4. If "already in use" is prompted, choose another combination
5. Click "Apply" to save settings

::: tip Tip
- Recommended to use `Ctrl + Alt + letter` or `Win + Shift + letter` as global hotkeys, with fewer conflicts
- Numeric keypad keys can also be bound, suitable for frequently used functions
:::

### Shortcut Conflict Handling

If the set shortcut doesn't work:
1. Check if occupied by other software (QQ, WeChat, input methods, browsers commonly use `Alt + letter`)
2. Try running Uniquenium as **administrator** (some system hotkeys require higher permissions)
3. Change to a less commonly used combination, such as `Ctrl + Shift + F12`

---

## Theme Switching

Uniquenium supports three theme modes to perfectly match your Windows appearance.

### Switching Method
1. Open the **Settings** → **Appearance** tab
2. Select in "Theme Mode":
   - **Follow System** (recommended): Auto-sync Windows dark/light settings
   - **Light Mode**: Fresh and bright white interface
   - **Dark Mode**: Eye-friendly and power-saving black interface
3. Click "Apply" to take effect immediately, no restart needed

### Theme Color Settings
In addition to dark/light mode, you can also customize the accent color (primary color):
- Click "Theme Color" in the "Appearance" tab
- Select a preset color, or click "Custom Color" to use the color picker
- All buttons, highlights, and selection frames will automatically use this color

### Acrylic Effect
The UniDesk control library supports **Acrylic** blur effects (similar to Windows 11's Mica material):
- **Enable location**: Settings → Appearance → Enable Acrylic Effect
- **Blur intensity**: Adjust slider, higher values make the background more blurry (0-100)
- **Color concentration**: Adjust the opacity of the panel color

::: warning Performance Note
The acrylic effect consumes GPU resources. If your computer has lower specs or uses battery power, it is recommended to disable it to save power.
:::

---

## More Features

- **Custom Wallpapers**: Settings → Appearance → Wallpaper, supports local images, multi-image carousel, network APIs
- **Custom Cursors**: Refer to [Custom Cursor Styles](/en/custom-developing/cursor-style.md)
- **Template System**: Refer to [Template Usage Guide](/en/custom-developing/template.md)
- **Plugin Extension**: Refer to [Plugin Development Guide](/en/custom-developing/plugin.md)
- **Control Development**: Refer to [UniDesk Control Library Overview](/en/controls-reference/overview.md)

Having issues? Check the [FAQ](/en/faq.md) or [Submit an Issue](https://github.com/Uniquenium/Uniquenium/issues).