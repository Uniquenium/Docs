---
title: UniDeskExpr
editLink: true
---

# UniDeskExpr 类型

表达式引擎单例，支持在文本中通过 `%变量` 语法引用系统数据，以及通过 `%{数学表达式}` 语法进行数值计算。所有文本类控件（如 `UDCText`）在渲染前都会调用 `convertStr()` 处理文本内容。

| 项目 | 说明 |
|------|------|
| 控件类型 | 全局单例（QML_SINGLETON） |
| 源文件 | `UniDesk/CppExt/UniDeskExpr.h` / `.cpp` |
| 继承 | QQuickItem |
| QML 导入 | `import UniDesk 1.0` |

## 属性

### `readonly property SystemStats systemStats`
缓存的系统统计数据，由内部定时器每秒更新一次。`SystemStats` 结构体包含以下成员：
- `cpu.usagePercent` / `cpu.temperature` — CPU 使用率与温度
- `cpu.name` / `cpu.physicalCores` / `cpu.logicalCores` / `cpu.maxClockMHz` — CPU 型号与规格
- `gpu.name` / `gpu.usagePercent` / `gpu.vramTotal` / `gpu.vramUsed` / `gpu.temperature` — GPU 信息
- `mem.virtmemTotal` / `mem.virtmemUsed` / `mem.virtmemPercent` — 物理内存
- `mem.swapmemTotal` / `mem.swapmemUsed` / `mem.swapmemPercent` — 交换内存
- `net.bytesSend` / `net.bytesRecv` — 累计网络流量
- `net.bytesSendPerSec` / `net.bytesRecvPerSec` — 每秒网络速率
- `net.dropPercent` — 丢包率
- `bat.batteryPercent` / `bat.charging` / `bat.remainMinutes` — 电池信息
- `disk.totalSpace` / `disk.freeSpace` / `disk.usagePercent` — 磁盘信息
- `sysInfo.uptimeSeconds` / `sysInfo.hostname` / `sysInfo.osName` — 系统信息
- `sysInfo.screenWidth` / `sysInfo.screenHeight` — 屏幕分辨率

## 方法

### `function convertStr(text, presets) → QString`
解析文本中的所有 `%变量` 和 `%{数学表达式}` 并替换为实际值。

替换优先级：
1. 先用 `QString::replace` 直接替换所有 `%变量`（系统数据、日期时间等）
2. 再用 **exprtk** 库求值 `%{数学表达式}` 块，支持 `presets` 中传入的自定义变量

```qml
import UniDesk 1.0

// %变量替换
var result = UniDeskExpr.convertStr("CPU: %cpuPercent%")
// → "CPU: 23.5%"

// %{数学表达式}计算（内部引用系统变量仍需 % 前缀）
var result = UniDeskExpr.convertStr(
    "速度: %{%bytesRecvPerSec/1024} KB/s"
)
// → "速度: 512.5 KB/s"

// 通过presets传入自定义变量（无需 % 前缀）
var result = UniDeskExpr.convertStr(
    "总量: %{a + b}",
    { "a": 10, "b": 20 }
)
// → "总量: 30"
```

### `function evalResponse(response, expression) → QVariant`
解析 API 响应（JSON 字符串）并在 `response` 全局对象上下文中执行 JS 表达式，支持字典与列表访问。

```qml
var value = UniDeskExpr.evalResponse(
    '{"temp": 26.5, "weather": {"city": "北京"}}',
    "weather.city"
)
// → "北京"
```

### `function stopTimer()`
停止内部数据刷新定时器（通常在应用退出时调用）。

## `%变量` 替换表

所有 `%变量` 均使用 `QString::replace` 直接匹配替换，**按以下顺序依次执行**，先匹配先生效。

### CPU

| 变量 | 说明 | 类型 |
|------|------|------|
| `%cpuPercent` | CPU 使用率 | double (%) |
| `%cpuTemp` | CPU 温度 | double (°C) |
| `%cpuName` | CPU 型号名称 | string |
| `%cpuCores` | CPU 逻辑核心数（线程数） | int |
| `%cpuMaxClock` | CPU 最大主频 | double (MHz) |

### GPU

| 变量 | 说明 | 类型 |
|------|------|------|
| `%gpuUsagePercent` | GPU 使用率 | double (%) |
| `%gpuVramTotal` | GPU 显存总大小 | uint64 (字节) |
| `%gpuVramUsed` | GPU 已用显存 | uint64 (字节) |
| `%gpuTemp` | GPU 温度 | double (°C) |
| `%gpuName` | GPU 型号名称 | string |

### 内存

| 变量 | 说明 | 类型 |
|------|------|------|
| `%virtmemTotal` | 总物理内存 | uint64 (字节) |
| `%virtmemUsed` | 已用物理内存 | uint64 (字节) |
| `%virtmemPercent` | 物理内存使用率 | double (%) |
| `%swapmemTotal` | 总交换内存 | uint64 (字节) |
| `%swapmemUsed` | 已用交换内存 | uint64 (字节) |
| `%swapmemPercent` | 交换内存使用率 | double (%) |

### 网络

| 变量 | 说明 | 类型 |
|------|------|------|
| `%bytesSendTotal` | 累计发送字节数 | uint64 |
| `%bytesRecvTotal` | 累计接收字节数 | uint64 |
| `%bytesSendPerSec` | 每秒发送字节数 | uint64 |
| `%bytesRecvPerSec` | 每秒接收字节数 | uint64 |
| `%dropPercent` | 丢包率 | double (%) |

### 电池

| 变量 | 说明 | 类型 |
|------|------|------|
| `%bpercent` | 电池百分比 | int |
| `%bplug` | 是否正在充电 (1/0) | int |
| `%bleftdays` | 剩余天数（充电时显示 UNLIMITED） | string |
| `%blefthours` | 剩余小时数（充电时显示 UNLIMITED） | string |
| `%bleftmins` | 剩余分钟数（充电时显示 UNLIMITED） | string |
| `%blefthoursr` | 剩余小时数（不含天数） | string |
| `%bleftminsr` | 剩余分钟数（不含小时） | string |

### 磁盘

| 变量 | 说明 | 类型 |
|------|------|------|
| `%diskTotal` | 系统盘总空间 | uint64 (字节) |
| `%diskFree` | 系统盘剩余空间 | uint64 (字节) |
| `%diskPercent` | 系统盘使用率 | double (%) |

### 系统

| 变量 | 说明 | 类型 |
|------|------|------|
| `%uptime` | 系统运行时间 | quint64 (秒) |
| `%hostname` | 主机名 | string |
| `%osName` | 操作系统名称 | string |
| `%screenWidth` | 主屏宽度 | int (像素) |
| `%screenHeight` | 主屏高度 | int (像素) |

### 日期与时间

| 变量 | 说明 | 示例 |
|------|------|------|
| `%yyyy` | 四位年份 | 2026 |
| `%yy` | 两位年份 | 26 |
| `%MMMM` | 月份全名 | August |
| `%MMM` | 月份缩写 | Aug |
| `%MM` | 两位月份 | 08 |
| `%M` | 月份 | 8 |
| `%dddd` | 星期全名 | Saturday |
| `%ddd` | 星期缩写 | Sat |
| `%dd` | 两位日期 | 22 |
| `%d` | 日期 | 22 |
| `%HH` | 两位小时（24h） | 14 |
| `%hh` | 两位小时（12h） | 02 |
| `%H` | 小时（24h） | 14 |
| `%h` | 小时（12h） | 2 |
| `%mm` | 两位分钟 | 35 |
| `%m` | 分钟 | 35 |
| `%ss` | 两位秒 | 59 |
| `%s` | 秒 | 59 |
| `%ap` | 小写上下午 | am / pm |
| `%AP` | 大写上下午 | AM / PM |
| `%zzz` | 三位毫秒 | 123 |
| `%z` | 毫秒 | 123 |
| `%t` | 时间戳 | 1756878959 |

### 日历

| 变量 | 说明 | 类型 |
|------|------|------|
| `%isLeapYear` | 是否闰年 (1/0) | int |
| `%yearDays` | 今年天数 | int |
| `%monthDays` | 本月天数 | int |
| `%dayOfYear` | 一年中第几天 | int |
| `%dayOfWeek` | 一周中第几天（1=周一） | int |

## `%{数学表达式}` 块

`%{...}` 内支持 **exprtk** 数学表达式语法。执行流程：
1. 先替换文本中所有 `%变量`（包括 `%{}` 内部的）为实际数值
2. 再对 `%{...}` 包裹的内容进行数学求值

因此在 `%{}` 内部引用系统变量时，**仍需保留 `%` 前缀**（如 `%{%cpuPercent * 2}`）。

而通过 `presets` 传入的自定义变量**不需要 `%` 前缀**，直接使用变量名即可。

支持：
- 算术运算：`+` `-` `*` `/` `^`
- 数学函数：`sin` `cos` `sqrt` `abs` `log` `exp` `min` `max` 等
- 比较运算：`>` `<` `>=` `<=` `==` `!=`
- 括号嵌套

```qml
// 单位换算（系统变量需 % 前缀，先替换再计算）
"%{%bytesRecvPerSec/1048576} MB/s"

// 百分比计算
"%{%virtmemUsed/%virtmemTotal*100}%"

// CPU 温度转华氏度
"%{%cpuTemp * 9 / 5 + 32}°F"

// GPU 显存使用率
"%{%gpuVramUsed / %gpuVramTotal * 100}%"

// 使用预设变量（无需 % 前缀）
UniDeskExpr.convertStr("%{price * count}", { "price": 9.9, "count": 3 })
// → "29.7"

// 混合使用
UniDeskExpr.convertStr("%{%cpuPercent + bonus}", { "bonus": 5 })
// → "28.5"
```

## 完整示例

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

UDCText {
    textContent: "CPU: %cpuPercent%  GPU: %gpuUsagePercent%  内存: %virtmemPercent%"
}

UDCText {
    textContent: "CPU温度: %cpuTemp°C  GPU温度: %gpuTemp°C"
}

UDCText {
    textContent: "GPU: %gpuName  VRAM: %{%gpuVramUsed/1048576}MB"
}

UDCText {
    textContent: "网速: %{%bytesRecvPerSec/1048576} MB/s  磁盘: %diskPercent%"
}

UDCText {
    textContent: "%osName | %hostname | 运行: %uptime秒"
}
```

## 实现细节

- 系统数据通过内部 1000ms（1 秒）定时器刷新。
- `%` 变量使用 `QString::replace` 直接替换，不支持转义。如需显示字面 `%`，可以用两个连续的 `%`（`%%`），引擎会先将其替换为内部占位符 `[(*&*%^*$^%#%%^^&&*^*&(^))]`，处理完所有变量后再还原为 `%`。
- `%{}` 表达式支持括号嵌套，使用括号计数法找到匹配的右括号。
- 未匹配的 `%变量` 或 `%{}` 括号不匹配时，会原样保留。
- `%变量` 替换在 `%{}` 求值之前执行，因此 `%{}` 内部的系统变量也会被替换为实际数值。
- 温度变量在部分设备上可能返回 -1（不可用），建议在 UI 中做条件判断显示。

## 相关文档

- [UniDeskTempleteMgr](./UniDeskTempleteMgr.md) — 模板系统，通过 `presets` 传递自定义变量
- [UniDeskSystemInfo](./UniDeskSystemInfo.md) — 系统数据来源
- [UDCText](../../component-encyclopedia/UDCText.md) — 使用表达式的文本组件