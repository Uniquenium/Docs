---
title: UniDeskSystemInfo
editLink: true
---

# UniDeskSystemInfo Type

System information collection singleton that provides real-time hardware data for CPU, memory, network, and battery. It is one of the data sources for the `UniDeskExpr` expression engine and can also be used directly by custom components (dashboards, system monitors, etc.).

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
};
```

### `CPUStats`
```cpp
struct CPUStats {
    double usagePercent;  // CPU usage (0.0 ~ 100.0)
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
                "CPU: " + s.cpu.usagePercent.toFixed(1) + "%\n" +
                "MEM: " + (s.mem.virtmemUsed / 1024 / 1024).toFixed(0) + " MB\n" +
                "BAT: " + s.bat.batteryPercent + "%"
        }
    }
}
```

## Notes

- Data collection involves system API calls. Poll at intervals of 500ms ~ 1000ms to avoid excessive sampling.
- On desktops, `batteryPercent` is typically 100 and `charging` is false.
- Network statistics depend on system network counters. On first call, `bytesRecvPerSec` may be 0 (requires two samples to compute the delta).

## Related

- [UniDeskExpr](./UniDeskExpr.md) — Uses `%{cpu}`, `%{mem}` etc. to read system data automatically