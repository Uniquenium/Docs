---
title: Installation Guide
layout: doc
editLink: true
---

# Installation Guide

This guide will help you install and run Uniquenium on your Windows system.

## Method 1: Using the Installer (Recommended for Regular Users)

1. **Download the Installer**
   - Go to the [download page](/en/download.md) to get the latest `Uniquenium-Setup-*.exe`
   
2. **Run the Installer**
   - Double-click the downloaded `.exe` file to launch the installation wizard
   - If a SmartScreen prompt appears, click "More info" → "Run anyway"
   - Follow the wizard to complete the installation:
     - Choose installation path (default: `C:\Program Files\Uniquenium`)
     - Choose whether to create a desktop shortcut
     - Choose whether to enable auto-start on boot

3. **Launch the Program**
   - After installation, double-click the desktop shortcut or launch Uniquenium from the Start Menu
   - On first launch, the program will display an icon in the tray area

## Method 2: Using the Portable Version

1. **Download the Portable Archive**
   - Download `Uniquenium-Portable-*.zip`
   
2. **Extract the Files**
   - Right-click and select "Extract to current folder" or use an extraction tool to extract to any directory
   - For example: `D:\Programs\Uniquenium\`

3. **Run the Program**
   - Navigate to the extracted directory and double-click `Uniquenium.exe` to launch
   - The portable version does not write to the registry; data is stored under the program directory

## Method 3: Running from Source (Recommended for Developers)

### Prerequisites

Make sure the following software is installed:

| Software | Minimum Version | Download Link |
|----------|----------------|---------------|
| CMake | 3.25+ | [cmake.org](https://cmake.org/download/) |
| Qt | 6.5.0+ | [qt.io](https://www.qt.io/download-open-source) |
| ECM | Latest | [KDE Invent](https://invent.kde.org/frameworks/extra-cmake-modules) |
| Git | Latest | [git-scm.com](https://git-scm.com/downloads) |
| C++ Compiler | MSVC 2022 / GCC 13+ / Clang 16+ | Install with Visual Studio or system package manager |

::: warning Note
When installing Qt, make sure to check the following modules: Core, Widgets, Quick, QuickControls2, DBus, Core5Compat, LabsPlatform, Concurrent
:::

### Installation Steps

#### 1. Clone the Code Repository

```bash
git clone https://github.com/Uniquenium/Uniquenium.git
cd Uniquenium
```

#### 2. Initialize Submodules

The project uses Git submodules to manage external dependencies (QHotkey, exprtk, etc.):

```bash
git submodule update --init --recursive
```

#### 3. Configure CMake Build

```bash
# Windows (MSVC)
cmake -B build -DCMAKE_PREFIX_PATH="C:/Qt/6.8.3/msvc2022_64"

# Linux (GCC)
cmake -B build -DCMAKE_PREFIX_PATH="/opt/Qt/6.8.3/gcc_64"
```

::: tip Tip
Replace `CMAKE_PREFIX_PATH` with your actual Qt6 installation path.
:::

#### 4. Compile

```bash
# Windows
cmake --build build --config Release

# Linux (multi-threaded compilation)
cmake --build build -j$(nproc)
```

#### 5. Run the Program

```bash
# Windows
.\build\Release\Uniquenium0.exe

# Linux
./build/Uniquenium0
```

::: tip Additional Linux Dependencies
Linux systems also require `KF6WindowSystem` and `KF6GlobalAccel` (for Wayland global hotkey support):

```bash
# Ubuntu / Debian
sudo apt install libkf6windowsystem-dev libkf6globalaccel-dev

# Arch Linux
sudo pacman -S kf6-window-system kf6-globalaccel
```
:::

## Initial Configuration

After first launching Uniquenium, it is recommended to perform the following basic configuration:

### 1. Open the Settings Window

- Right-click the Uniquenium icon in the tray area
- Select "Settings"

### 2. Theme Settings

- In the "Appearance" tab, select the theme mode:
  - **Follow System** (recommended): Automatically matches Windows theme
  - **Light Mode**: Force light theme
  - **Dark Mode**: Force dark theme

### 3. Shortcut Settings

- Configure global hotkeys in the "Shortcuts" tab:
  - Show/hide main panel
  - Switch page
  - Quick open settings
  - etc.

### 4. Auto-start on Boot

- Check "Auto-start on boot" in the "Features" tab
- The program will automatically add itself to Windows startup items

### 5. Install Official Plugins (Recommended)

The official plugin pack provides rich extension components such as system monitors, weather, calendar, media player, and more. Installation is recommended for the full experience.

- View the available plugin list in the "Plugins" tab
- Click the "Install" button on a plugin card to install
- You can also download offline packages from the [Official Plugins Repository](https://github.com/Uniquenium/Official-Plugins)

For details, see the [Official Plugins documentation](/en/official-plugins.md).

## Verifying the Installation

After installation, you can verify the program is working correctly by:

1. ✅ Uniquenium icon appears in the tray area
2. ✅ Right-clicking the tray icon opens the menu
3. ✅ Can create new pages and add components
4. ✅ Theme switching works correctly
5. ✅ Shortcuts can be triggered normally

## Uninstalling

### Installer Version
- Open "Settings" → "Apps" → "Installed apps"
- Find Uniquenium, click "Uninstall"
- Or run the uninstaller from the installation directory

### Portable / Source Version
- Simply delete the program directory
- To remove user data, delete the following directory:
  ```
  %APPDATA%\Uniquenium\
  ```

## FAQ

Having issues during installation? Check the [FAQ page](/en/faq.md) or submit an Issue on GitHub:

[🐛 Submit Issue](https://github.com/Uniquenium/Uniquenium/issues)