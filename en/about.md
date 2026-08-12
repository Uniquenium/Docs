---
title: About Uniquenium
layout: doc
editLink: true
---

# About Uniquenium

## Project Introduction

**Uniquenium** is an open-source desktop customization tool dedicated to perfectly combining desktop beautification with practical functionality. The project name is derived from "Unique" + "Quantum," signifying the creation of a unique desktop experience for every user.

We believe the desktop is not just a starting point for work, but also a canvas for expressing individuality.

- **Beautiful**: Modern Fluent design language, seamless dark/light theme switching
- **Flexible**: Component-based architecture, mix and match your desktop as you wish
- **Open**: Plugin and template system, infinite extension possibilities
- **Free**: Completely open-source and free, community-driven development

## Project Background

Uniquenium was born out of dissatisfaction with existing desktop tools — either bloated and difficult to use, or outdated in appearance. The project founder [Admibrill](https://github.com/admibrill) decided to create a desktop extension tool that is both beautiful and practical.

From an initial simple panel prototype to a mature project with a complete control library, plugin system, and template mechanism, the effort of every contributor is indispensable.

## Technology Stack

| Layer | Technology | Description |
|-------|-----------|-------------|
| Interface Rendering | **QML / Qt Quick** | Declarative UI language, hardware-accelerated rendering |
| Core Logic | **C++17 / Qt6** | Pure C++ implementation, high performance and cross-platform |
| UI Control Library | **UniDesk** | Self-developed 30+ controls, based on LingmoUI design |
| System Interaction | **Win32 API / QHotkey** | Frameless windows, global hotkeys, wallpaper setting, etc. |
| Build System | **CMake + ECM** | Cross-platform compilation and packaging |
| Documentation Site | **VitePress** | Vue-based static site generator |
| Icon Resources | **Remix Icons** | Open-source neutral-style icon library |

## Acknowledgments

Uniquenium cannot exist without the support of the following open-source projects and individuals:

### Core Contributors
- [Admibrill](https://github.com/admibrill) - Project initiator and core developer

### Open-Source Projects
- [LingmoUI](https://github.com/LingmoOS/LingmoUI) - Design foundation for the UniDesk control library
- [QHotkey](https://github.com/Skycoder42/QHotkey) - Cross-platform global hotkey support
- [Remix Icons](https://www.remixicon.cn) - Beautiful open-source icon library
- [ExprTk](https://github.com/ArashPartow/exprtk) - Mathematical expression parsing engine
- [Qt6](https://www.qt.io/) - Powerful cross-platform C++ application framework
- [ECM](https://invent.kde.org/frameworks/extra-cmake-modules) - Extra CMake Modules

### Community & Users
Thanks to every community member who submits Issues, PRs, translates documentation, and shares templates ❤️

## License

### Code License
The Uniquenium project code is released under the **GNU General Public License v3.0** open-source agreement:

> You are free to run, study, share, and improve this software. Modified derivative works **must** also be open-sourced under the same license.

Full license text: [LICENSE](https://github.com/Uniquenium/Uniquenium/blob/main/LICENSE)

### Documentation License
This documentation (Docs repository) is licensed under the **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)** agreement:

> You may freely share (copy, distribute, transmit) and adapt (modify, commercial use) this documentation, provided that:
> - **Attribution**: Give appropriate credit, provide a link to the license
> - **Share Alike**: Adapted content must be released under the same license

## Version Information

You can view the version in the following ways:
- **In the program**: Settings → About → Version number
- **Command line**: `Uniquenium0 --version`
- **In code**:
  ```qml
  import UniDesk
  // Get version number through UniDeskTools
  var major = UniDeskTools.getModuleVersionMajor()
  var minor = UniDeskTools.getModuleVersionMinor()
  var patch = UniDeskTools.getModuleVersionPatch()
  ```

## Contact Us

| Channel | Link | Purpose |
|---------|------|---------|
| GitHub Repository | [Uniquenium/Uniquenium](https://github.com/Uniquenium/Uniquenium) | Source code, Issues, PRs |
| Documentation Repository | [Uniquenium/Docs](https://github.com/Uniquenium/Docs) | This site's documentation source |
| DeepWiki | [deepwiki.com/Uniquenium](https://deepwiki.com/Uniquenium/Uniquenium) | Interactive code documentation |
| Issue Tracker | [New Issue](https://github.com/Uniquenium/Uniquenium/issues/new/choose) | Bug reports / Feature suggestions |

## Contribution Guidelines

We warmly welcome contributions of all forms!

### Ways for Beginners to Contribute
1. **Improve Documentation**: Fix typos, add explanations, translate English docs
2. **Report Bugs**: Submit detailed reproduction steps and environment information
3. **Share Templates**: Export your beautifully designed page templates for others to use
4. **Share Suggestions**: Share your usage experience and improvement ideas

### Code Contribution Process
1. Fork the repository to your account
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your code: `git commit -m "feat: add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request and wait for code review

### Commit Conventions
- feat: New feature
- fix: Bug fix
- docs: Documentation update
- style: Code formatting (no functional change)
- refactor: Refactoring
- perf: Performance optimization
- test: Testing related
- chore: Build/toolchain related

## Roadmap

Want to know what we're working on? Check the public [TODO list](https://github.com/Uniquenium/Uniquenium/blob/main/TODO.md), including:
- Linux platform support (in development)
- More official plugin components (calculator, screenshot, weather, etc.)
- Mobile/tablet adaptation
- Cloud sync functionality

---

**Made with ❤️ by Uniquenium Development Team**

> "Let the desktop return to how you want it to be."