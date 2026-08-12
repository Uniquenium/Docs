---
title: FAQ
layout: doc
editLink: true
---

# Frequently Asked Questions

Here are the most common issues users encounter when using Uniquenium. If you don't find an answer, feel free to submit an Issue on GitHub.

## Installation & Startup

### Q: Getting "Qt6 not found" or CMake errors during compilation

**A:** Please ensure:
1. Qt 6.5.0+ is installed correctly with required modules (Core, Widgets, Quick, QuickControls2, DBus, Core5Compat, LabsPlatform, Concurrent)
2. The Qt path is correctly specified when configuring CMake:
   ```bash
   cmake -B build -DCMAKE_PREFIX_PATH="C:/Qt/6.8.3/msvc2022_64"
   ```
3. ECM (Extra CMake Modules) is installed

### Q: Program flashes and exits, no window shown

**A:** Try the following steps:
1. Check the tray area (bottom-right taskbar) for the Uniquenium icon; the program minimizes to the tray by default
2. If no tray icon, launch from the command line to view error messages:
   ```bash
   .\build\Release\Uniquenium0.exe --debug
   ```
3. Ensure your graphics driver is updated to the latest version
4. Try running in software rendering mode (lower performance):
   ```bash
   set QMLSCENE_DEVICE=softwarecontext
   .\build\Release\Uniquenium0.exe
   ```

### Q: Installer blocked by Windows Defender / SmartScreen

**A:** This is normal since the program doesn't have a code signing certificate. Please:
1. Click "More info" → "Run anyway"
2. Or right-click the installer → Properties → Check "Unblock" → OK

### Q: Wallpaper feature not working on older Windows 10

**A:** Some older Windows 10 versions (before 1809) have compatibility issues with the wallpaper API. It is recommended to upgrade to Windows 10 21H2 or Windows 11.

## Usage

### Q: How do I add components to the desktop?

**A:** Steps:
1. Open the main panel (default shortcut: `Ctrl + Alt + U`)
2. Click "+ New Page" on the left side or select an existing page
3. Click the "Add Component" button
4. Select the component type from the component list
5. Drag to adjust the component's position and size

### Q: How do I delete a component?

**A:** Three ways:
1. Select the component and press `Delete`
2. Right-click the component → select "Delete"
3. Right-click in the component tree of the page management window → "Delete"

### Q: Component dragged off-screen and can't be found?

**A:** Open the page management window (Settings → Page Management), select the component in the component tree, and reset X/Y coordinates to 0 in the right property panel.

### Q: How do I adjust the component layering (Z-order)?

**A:**
1. Select the component
2. Right-click → select "Move Up" / "Move Down" / "Bring to Front" / "Send to Back"
3. Or drag directly in the component tree to adjust order

## Theme & Appearance

### Q: How do I switch between dark/light themes?

**A:**
1. Right-click the tray icon → Settings → Appearance
2. Select theme mode: Follow System / Light / Dark
3. You can also use shortcuts to quickly switch (bind in settings first)

### Q: Acrylic blur effect not showing

**A:** The acrylic effect depends on:
- Windows 10 1803+ or Windows 11
- GPU supports hardware acceleration
- Confirm "Enable Acrylic Effect" is enabled in Settings → Appearance

If it still doesn't display, try updating your graphics driver.

### Q: Can I use custom wallpapers?

**A:** Yes! Supports:
- Local images (JPG/PNG/BMP/WebP)
- Multiple image carousel
- Custom API interfaces for fetching online wallpapers
Path: Settings → Appearance → Wallpaper

## Shortcuts

### Q: Global shortcuts not working

**A:** Please check:
1. Whether the shortcut conflicts with other software (QQ, WeChat, input methods, etc.)
2. Whether running with administrator privileges (some system hotkeys require admin rights)
3. Confirm the hotkey is enabled in Settings → Shortcuts
4. Try rebinding to a less commonly used key combination

### Q: How to modify/delete shortcuts?

**A:**
1. Open Settings → Shortcuts
2. Find the function to modify
3. Click the shortcut input box and press the new key combination
4. Click "Apply" to save
5. To delete, click the "Clear" button next to the input box

## Plugins & Templates

### Q: How do I install third-party plugins?

**A:**
1. Download the plugin package (usually `.zip` or `.uniq-plugin`)
2. Open Settings → Plugins
3. Click the "Install Plugin" button and select the downloaded file
4. Or manually extract the plugin to:
   ```
   %APPDATA%\Uniquenium\Plugins\
   ```
5. Restart the program

### Q: Plugin not showing/not working after installation

**A:** Please:
1. Check if the plugin version matches the Uniquenium version
2. Check if the plugin is enabled in Settings → Plugins
3. Open the log window (Settings → About → View Logs) to check for error messages
4. Contact the plugin author or submit an Issue on GitHub

### Q: How to export/import page templates?

**A:**
1. **Export**: Right-click on the page → Export as Template → Choose save location
2. **Import**: When creating a new page, select "Import from Template" → Choose the template file
3. Template files include page layout and all component configurations, but not external image resources

## Performance

### Q: High memory usage

**A:** Suggestions:
1. Reduce the number of simultaneously displayed components
2. Disable unnecessary plugins
3. Lower the wallpaper blur radius (Settings → Appearance → Blur Intensity)
4. Avoid using excessively large wallpaper images

### Q: Lag when dragging windows

**A:** This is a known issue with Qt frameless windows. Try:
1. Update graphics driver to the latest version
2. Close unnecessary background programs to free GPU resources
3. Disable "Window Shadow" and "Acrylic Effect" in settings

## Development

### Q: How to get program logs?

**A:** Three ways:
1. Add `--debug` parameter when launching from command line; logs output directly to console
2. Settings → About → Click "View Logs" button
3. Open the log file directly:
   ```
   %APPDATA%\Uniquenium\Logs\uniquenium-YYYY-MM-DD.log
   ```

### Q: How to contribute to development or submit code?

**A:** Contributions welcome! Please:
1. Fork the project repository to your GitHub account
2. Create a new branch to develop features or fix bugs
3. Ensure code passes existing tests
4. Submit a Pull Request with detailed description of changes

### Q: The feature I want doesn't exist?

**A:** You can:
1. Check the [TODO list](https://github.com/Uniquenium/Uniquenium/blob/main/TODO.md) to see if it's already planned
2. Develop a plugin yourself (refer to [Plugin Development Guide](/en/custom-developing/plugin.md))
3. Submit a Feature Request Issue on GitHub with detailed requirements and use cases

## Data & Backup

### Q: Where are configuration files and data stored?

**A:** User data is stored by default at:
```
Windows: %APPDATA%\Uniquenium\
├── Pages\         # Page configuration files
├── Plugins\       # Installed plugins
├── Settings\      # Program settings
├── Templates\     # Exported templates
└── Logs\          # Log files
```

### Q: How to backup and migrate data?

**A:** Simply copy the entire `%APPDATA%\Uniquenium\` folder to the same location on the new computer. It is recommended to back up this folder regularly.

---

Didn't find your question?

- [Read the official documentation](/en/)
- [Submit a GitHub Issue](https://github.com/Uniquenium/Uniquenium/issues)
- [Join the discussion](https://github.com/Uniquenium/Uniquenium/discussions)