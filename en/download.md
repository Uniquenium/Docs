---
title: Download
layout: doc
editLink: true
---

# Download Uniquenium

## System Requirements

Before downloading and installing Uniquenium, please ensure your system meets the following requirements:

### Operating System
- **Windows 10** version 1809 and above (Windows 10 21H2+ / Windows 11 recommended)
- Linux support is under development

### Hardware Requirements
| Item | Minimum | Recommended |
|------|---------|-------------|
| Processor | Dual-core 1.5GHz+ | Quad-core 2.0GHz+ |
| Memory | 4 GB RAM | 8 GB RAM+ |
| Graphics | DirectX 11 support | Dedicated GPU with OpenGL 4.5+ |
| Storage | 500 MB available | 2 GB available (with wallpapers/plugins) |
| Display | 1280x720 resolution | 1920x1080 or higher |

### Runtime Dependencies
If compiling from source, the following must be pre-installed:
- **CMake** 3.25 or higher
- **Qt** 6.5.0 or higher (with Core, Widgets, Quick, QuickControls2, DBus, Core5Compat, LabsPlatform, Concurrent modules)
- **ECM** (Extra CMake Modules)
- **C++17** compatible compiler (MSVC 2022 / GCC 13+ / Clang 16+)
- Linux additionally requires: KF6WindowSystem, KF6GlobalAccel

## Download Methods

### Method 1: GitHub Release (Recommended)

Go to the GitHub Releases page to download the latest stable version:

[📥 Go to GitHub Releases](https://github.com/Uniquenium/Uniquenium/releases)

Download descriptions:
- `Uniquenium-Setup-*.exe` - Windows installer (recommended for regular users)
- `Uniquenium-Portable-*.zip` - Windows portable version, extract and use
- `Source code (zip)` / `Source code (tar.gz)` - Source code package

### Method 2: Compile from Source

If you want to use the latest development version or participate in development, you can compile from source:

```bash
# 1. Clone the repository (requires Git)
git clone https://github.com/Uniquenium/Uniquenium.git
cd Uniquenium

# 2. Initialize submodules (QHotkey, exprtk, etc.)
git submodule update --init --recursive

# 3. Configure the build (replace with your Qt6 installation path)
cmake -B build -DCMAKE_PREFIX_PATH="<Your Qt6 installation path>"

# 4. Compile
cmake --build build --config Release

# 5. Run
./build/Uniquenium0
```

### Method 3: Use DeepWiki Docs

You can also access interactive documentation and code explanations through DeepWiki:

[📖 Uniquenium DeepWiki](https://deepwiki.com/Uniquenium/Uniquenium)

## Version Descriptions

| Version Type | Description |
|-------------|-------------|
| Stable | Fully tested, recommended for daily use |
| Pre-release | Includes new features, may have minor bugs |
| Nightly | Latest code, no stability guarantee |

## Verifying Downloaded Files

After downloading, it is recommended to verify file integrity (if the Release page provides a SHA256 checksum):

```powershell
# Windows PowerShell
Get-FileHash .\Uniquenium-Setup-*.exe -Algorithm SHA256
```

Compare the output hash with the checksum provided on the Release page.

## Next Steps

- After downloading, read the [Installation Guide](/en/quick-start/install.md) for installation steps
- Having installation issues? Check the [FAQ](/en/faq.md)
- Want to contribute to development? Check the [Control Library Overview](/en/controls-reference/overview.md)