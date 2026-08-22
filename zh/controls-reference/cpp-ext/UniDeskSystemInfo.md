---
title: UniDeskSystemInfo
editLink: true
---

# UniDeskSystemInfo 类型

系统信息采集单例，提供 CPU、内存、网络、电池的实时硬件数据。它是 `UniDeskExpr` 表达式引擎的数据来源之一，也可被自定义组件（仪表盘、系统监控等）直接使用。

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
};
```

### `CPUStats`
```cpp
struct CPUStats {
    double usagePercent;  // CPU 使用率（0.0 ~ 100.0）
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
                "CPU: " + s.cpu.usagePercent.toFixed(1) + "%\n" +
                "MEM: " + (s.mem.virtmemUsed / 1024 / 1024).toFixed(0) + " MB\n" +
                "BAT: " + s.bat.batteryPercent + "%"
        }
    }
}
```

## 备注

- 数据采集涉及系统 API 调用，建议以 500ms ~ 1000ms 的间隔轮询，避免过于频繁的采样。
- 桌面环境下 `batteryPercent` 通常为 100，`charging` 为 false。
- 网络统计依赖系统网络计数器。首次调用时 `bytesRecvPerSec` 可能为 0（需要两次采样才能计算差值）。

## 相关文档

- [UniDeskExpr](./UniDeskExpr.md) — 通过 `%{cpu}`、`%{mem}` 等自动读取系统数据