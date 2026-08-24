---
title: UniDeskSystemInfo
editLink: true
---

# UniDeskSystemInfo 类型

系统信息采集单例，提供 CPU、内存、网络、电池、GPU、磁盘及系统的实时硬件数据。它是 `UniDeskExpr` 表达式引擎的数据来源之一，也可被自定义组件（仪表盘、系统监控等）直接使用。

| 项目 | 说明 |
|------|------|
| 控件类型 | 全局单例 |
| 源文件 | `UniDesk/CppExt/UniDeskSystemInfo.h` / `.cpp` |
| 继承 | QObject |
| QML 导入 | `import UniDesk 1.0` |

## 数据结构

### `SystemStats`
顶层聚合结构：

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
    double usagePercent;      // CPU 使用率（0.0 ~ 100.0）
    QString name;             // CPU 型号名称
    int physicalCores;        // 物理核心数
    int logicalCores;         // 逻辑核心数（线程数）
    double maxClockMHz;       // 最大主频（MHz）
    double temperature;       // CPU 温度（摄氏度，-1 表示不可用）
};
```

### `GPUStats`
```cpp
struct GPUStats {
    QString name;             // GPU 型号名称
    double usagePercent;      // GPU 使用率（0.0 ~ 100.0，-1 表示不可用）
    uint64_t vramTotal;       // 显存总大小（字节）
    uint64_t vramUsed;        // 已用显存（字节）
    double temperature;       // GPU 温度（摄氏度，-1 表示不可用）
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
    int remainMinutes;  // 未知时为 -1
};
```

### `DiskStats`
```cpp
struct DiskStats {
    uint64_t totalSpace;      // 系统盘总空间（字节）
    uint64_t freeSpace;       // 系统盘剩余空间（字节）
    double usagePercent;      // 系统盘使用率（0.0 ~ 100.0）
};
```

### `SystemInfo`
```cpp
struct SystemInfo {
    quint64 uptimeSeconds;    // 系统运行时间（秒）
    QString hostname;         // 主机名
    QString osName;           // 操作系统名称
    int screenWidth;          // 主屏宽度（像素）
    int screenHeight;         // 主屏高度（像素）
};
```

## 方法

### `function getSystemStats() → SystemStats`
采样并返回当前所有系统统计信息。会触发一次实时采样。

## 使用示例

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

## 备注

- 数据采集涉及系统 API 调用，建议以 500ms ~ 1000ms 的间隔轮询，避免过于频繁的采样。
- 桌面环境下 `batteryPercent` 通常为 100，`charging` 为 false。
- 网络统计依赖系统网络计数器。首次调用时 `bytesRecvPerSec` 可能为 0（需要两次采样才能计算差值）。
- GPU 信息在 Windows 上通过 DXGI + PDH 获取，Linux 上通过 sysfs (`/sys/class/drm`) 读取；NVIDIA 显卡在 Linux 上通过 `nvidia-smi` 命令（30 秒冷却）获取。
- CPU/GPU 温度在部分设备上可能不可用（返回 -1），属正常现象。
- 磁盘统计默认读取系统盘（Windows 为 C:，Linux 为根分区 `/`）。

## 相关文档

- [UniDeskExpr](./UniDeskExpr.md) — 通过 `%变量` 自动读取系统数据