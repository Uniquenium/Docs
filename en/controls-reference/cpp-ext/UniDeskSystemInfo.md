---
title: UniDeskSystemInfo
editLink: true
---

# UniDeskSystemInfo Type

System information collection singleton that provides real-time hardware data for CPU, memory, network, battery, GPU, disk, and system. It is one of the data sources for the `UniDeskExpr` expression engine and can also be used directly by custom components (dashboards, system monitors, etc.).

| Item | Description |
|------|-------------|
| Control Type | Global Singleton |
| Source File | `UniDesk/CppExt/UniDeskSystemInfo.h` / `.cpp` |
| Inherits | QObject |
| QML Import | `import UniDesk 1.0` |

## Data Structures

### `SystemStats`
Top-level aggregate structure:

```cpp
struct SystemStats {
    CPUStats cpu;
    NetworkStats net;
    MemoryStats mem;
    BatteryStats bat;
    GPUStats gpu;
    DiskStats disk;
    SystemInfo sysInfo;
};
```

### `CPUStats`
```cpp
struct CPUStats {
    double usagePercent;      // CPU usage (0.0 ~ 100.0)
    QString name;             // CPU model name
    int physicalCores;        // Physical core count
    int logicalCores;         // Logical core count (threads)
    double maxClockMHz;       // Maximum clock speed (MHz)
    double temperature;       // CPU temperature (°C, -1 if unavailable)
};
```

### `GPUStats`
```cpp
struct GPUStats {
    QString name;             // GPU model name
    double usagePercent;      // GPU usage (0.0 ~ 100.0, -1 if unavailable)
    uint64_t vramTotal;       // Total VRAM (bytes)
    uint64_t vramUsed;        // Used VRAM (bytes)
    double temperature;       // GPU temperature (°C, -1 if unavailable)
};
```

### `NetworkStats`
```cpp
struct NetworkStats {
    uint64_t bytesRecv;
    uint64_t bytesSend;
    uint64_t bytesRecvPerSec;
    uint64_t bytesSendPerSec;
    double dropPercent;
};
```

### `MemoryStats`
```cpp
struct MemoryStats {
    uint64_t virtmemTotal;
    uint64_t virtmemUsed;
    double virtmemPercent;
    uint64_t swapmemTotal;
    uint64_t swapmemUsed;
    double swapmemPercent;
};
```

### `BatteryStats`
```cpp
struct BatteryStats {
    int batteryPercent;
    bool charging;
    int remainMinutes;  // -1 if unknown
};
```

### `DiskStats`
```cpp
struct DiskStats {
    uint64_t totalSpace;      // System drive total space (bytes)
    uint64_t freeSpace;       // System drive free space (bytes)
    double usagePercent;      // System drive usage (0.0 ~ 100.0)
};
```

### `SystemInfo`
```cpp
struct SystemInfo {
    quint64 uptimeSeconds;    // System uptime (seconds)
    QString hostname;         // Host name
    QString osName;           // Operating system name
    int screenWidth;          // Primary screen width (pixels)
    int screenHeight;         // Primary screen height (pixels)
};
```

## Methods

### `function getSystemStats() → SystemStats`
Sample and return all current system statistics. Triggers a real-time sample.

## Example

```qml
import UniDesk 1.0
import QtQuick

Text {
    id: sysInfo
    Timer {
        running: true
        repeat: true
        interval: 1000
        onTriggered: {
            var s = UniDeskSystemInfo.getSystemStats()
            sysInfo.text =
                "CPU: " + s.cpu.usagePercent.toFixed(1) + "%  " +
                "Temp: " + s.cpu.temperature.toFixed(1) + "°C\n" +
                "GPU: " + s.gpu.name + "\n" +
                "GPU Usage: " + s.gpu.usagePercent.toFixed(1) + "%  " +
                "VRAM: " + (s.gpu.vramUsed / 1024 / 1024).toFixed(0) + " MB\n" +
                "MEM: " + (s.mem.virtmemUsed / 1024 / 1024).toFixed(0) + " MB\n" +
                "BAT: " + s.bat.batteryPercent + "%\n" +
                "Disk: " + s.disk.usagePercent.toFixed(1) + "%\n" +
                "Uptime: " + s.sysInfo.uptimeSeconds + "s"
        }
    }
}
```

## Notes

- Data collection involves system API calls. Poll at intervals of 500ms ~ 1000ms to avoid excessive sampling.
- On desktops, `batteryPercent` is typically 100 and `charging` is false.
- Network statistics depend on system network counters. On first call, `bytesRecvPerSec` may be 0 (requires two samples to compute the delta).
- GPU info is obtained via DXGI + PDH on Windows, and via sysfs (`/sys/class/drm`) on Linux; NVIDIA GPUs on Linux use the `nvidia-smi` command (with 30-second cooldown).
- CPU/GPU temperature may be unavailable on some devices (returns -1), which is normal.
- Disk statistics read the system drive by default (C: on Windows, root partition `/` on Linux).

## Related

- [UniDeskExpr](./UniDeskExpr.md) — Uses `%variable` tokens to read system data automatically