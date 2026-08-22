---
title: UniDeskExpr
editLink: true
---

# UniDeskExpr Type

Expression engine singleton that supports `%variable` syntax for system data references and `%{math expression}` syntax for numerical computations in text. All text controls (e.g. `UDCText`) call `convertStr()` before rendering.

| Item | Description |
|------|-------------|
| Control Type | Global Singleton (QML_SINGLETON) |
| Source File | `UniDesk/CppExt/UniDeskExpr.h` / `.cpp` |
| Inherits | QQuickItem |
| QML Import | `import UniDesk 1.0` |

## Properties

### `readonly property SystemStats systemStats`
Cached system stats (CPU, memory, network, battery), updated every second by an internal timer. The `SystemStats` struct contains:
- `cpu.usagePercent` — CPU usage
- `mem.virtmemTotal` / `mem.virtmemUsed` / `mem.virtmemPercent` — Physical memory
- `mem.swapmemTotal` / `mem.swapmemUsed` / `mem.swapmemPercent` — Swap memory
- `net.bytesSend` / `net.bytesRecv` — Total network traffic
- `net.bytesSendPerSec` / `net.bytesRecvPerSec` — Network rate per second
- `net.dropPercent` — Packet drop rate
- `bat.batteryPercent` / `bat.charging` / `bat.remainMinutes` — Battery info

## Methods

### `function convertStr(text, presets) → QString`
Parses all `%variable` and `%{math expression}` tokens in the text and replaces them with actual values.

Replacement priority:
1. All `%variable` tokens (system data, date/time) are replaced directly via `QString::replace`
2. Then `%{math expression}` blocks are evaluated with the **exprtk** library, with custom variables from `presets`

```qml
import UniDesk 1.0

// %variable replacement
var result = UniDeskExpr.convertStr("CPU: %cpuPercent%")
// → "CPU: 23.5%"

// %{math expression} evaluation (system variables still need % prefix inside)
var result = UniDeskExpr.convertStr(
    "Speed: %{%bytesRecvPerSec/1024} KB/s"
)
// → "Speed: 512.5 KB/s"

// Custom variables via presets (no % prefix needed)
var result = UniDeskExpr.convertStr(
    "Total: %{a + b}",
    { "a": 10, "b": 20 }
)
// → "Total: 30"
```

### `function evalResponse(response, expression) → QVariant`
Parses an API response (JSON string) and evaluates a JS expression in the `response` global object context, supporting dictionary and list access.

```qml
var value = UniDeskExpr.evalResponse(
    '{"temp": 26.5, "weather": {"city": "Beijing"}}',
    "weather.city"
)
// → "Beijing"
```

### `function stopTimer()`
Stops the internal data refresh timer (typically called on application exit).

## `%variable` Replacement Table

All `%variable` tokens are matched and replaced directly via `QString::replace`, executed in order — earlier matches take priority.

### CPU

| Variable | Description | Type |
|----------|-------------|------|
| `%cpuPercent` | CPU usage | double (%) |

### Memory

| Variable | Description | Type |
|----------|-------------|------|
| `%virtmemTotal` | Total physical memory | uint64 (bytes) |
| `%virtmemUsed` | Used physical memory | uint64 (bytes) |
| `%virtmemPercent` | Physical memory usage | double (%) |
| `%swapmemTotal` | Total swap memory | uint64 (bytes) |
| `%swapmemUsed` | Used swap memory | uint64 (bytes) |
| `%swapmemPercent` | Swap memory usage | double (%) |

### Network

| Variable | Description | Type |
|----------|-------------|------|
| `%bytesSendTotal` | Total bytes sent | uint64 |
| `%bytesRecvTotal` | Total bytes received | uint64 |
| `%bytesSendPerSec` | Bytes sent per second | uint64 |
| `%bytesRecvPerSec` | Bytes received per second | uint64 |
| `%dropPercent` | Packet drop rate | double (%) |

### Battery

| Variable | Description | Type |
|----------|-------------|------|
| `%bpercent` | Battery percentage | int |
| `%bplug` | Currently charging (1/0) | int |
| `%bleftdays` | Days remaining (UNLIMITED when charging) | string |
| `%blefthours` | Hours remaining (UNLIMITED when charging) | string |
| `%bleftmins` | Minutes remaining (UNLIMITED when charging) | string |
| `%blefthoursr` | Hours remaining (excluding days) | string |
| `%bleftminsr` | Minutes remaining (excluding hours) | string |

### Date & Time

| Variable | Description | Example |
|----------|-------------|---------|
| `%yyyy` | 4-digit year | 2026 |
| `%yy` | 2-digit year | 26 |
| `%MMMM` | Full month name | August |
| `%MMM` | Abbreviated month | Aug |
| `%MM` | 2-digit month | 08 |
| `%M` | Month | 8 |
| `%dddd` | Full day name | Saturday |
| `%ddd` | Abbreviated day | Sat |
| `%dd` | 2-digit day | 22 |
| `%d` | Day | 22 |
| `%HH` | 2-digit hour (24h) | 14 |
| `%hh` | 2-digit hour (12h) | 02 |
| `%H` | Hour (24h) | 14 |
| `%h` | Hour (12h) | 2 |
| `%mm` | 2-digit minute | 35 |
| `%m` | Minute | 35 |
| `%ss` | 2-digit second | 59 |
| `%s` | Second | 59 |
| `%ap` | Lowercase am/pm | am / pm |
| `%AP` | Uppercase AM/PM | AM / PM |
| `%zzz` | 3-digit milliseconds | 123 |
| `%z` | Milliseconds | 123 |
| `%t` | Timestamp | 1756878959 |

### Calendar

| Variable | Description | Type |
|----------|-------------|------|
| `%isLeapYear` | Leap year (1/0) | int |
| `%yearDays` | Days in current year | int |
| `%monthDays` | Days in current month | int |
| `%dayOfYear` | Day of year | int |
| `%dayOfWeek` | Day of week (1=Monday) | int |

## `%{math expression}` Blocks

`%{...}` supports **exprtk** math expression syntax. Execution flow:
1. All `%variable` tokens (including those inside `%{}`) are replaced with their actual numeric values
2. The content inside `%{...}` is then evaluated as a math expression

Therefore, when referencing system variables inside `%{}`, you **must keep the `%` prefix** (e.g. `%{%cpuPercent * 2}`).

Custom variables passed via `presets` **do not need a `%` prefix** — use them directly by name.

Supports:
- Arithmetic: `+` `-` `*` `/` `^`
- Math functions: `sin` `cos` `sqrt` `abs` `log` `exp` `min` `max` etc.
- Comparison: `>` `<` `>=` `<=` `==` `!=`
- Nested parentheses

```qml
// Unit conversion (system variables need % prefix, substituted before evaluation)
"%{%bytesRecvPerSec/1048576} MB/s"

// Percentage calculation
"%{%virtmemUsed/%virtmemTotal*100}%"

// Using preset variables (no % prefix)
UniDeskExpr.convertStr("%{price * count}", { "price": 9.9, "count": 3 })
// → "29.7"

// Mixed usage
UniDeskExpr.convertStr("%{%cpuPercent + bonus}", { "bonus": 5 })
// → "28.5"
```

## Full Example

```qml
import UniDesk 1.0
import UniDesk.Controls 1.0

UDCText {
    textContent: "CPU: %cpuPercent%  Memory: %virtmemPercent%  Battery: %bpercent%"
}

UDCText {
    textContent: "Network: %{%bytesRecvPerSec/1048576} MB/s"
}
```

## Implementation Details

- System data is refreshed by an internal 1000ms (1 second) timer.
- `%` variables use `QString::replace` for direct substitution — no escaping. To display a literal `%`, use two consecutive `%` (`%%`), which the engine temporarily replaces with an internal placeholder `[(*&*%^*$^%#%%^^&&*^*&(^))]` before restoring to `%` after all variables are processed.
- `%{}` expressions support nested parentheses, using a bracket-counting algorithm to find matching closing brackets.
- Unmatched `%variable` or mismatched `%{}` brackets are preserved as-is.
- `%variable` substitution happens before `%{}` evaluation, so system variables inside `%{}` are already replaced with their numeric values.

## Related

- [UniDeskTempleteMgr](./UniDeskTempleteMgr.md) — Template system, passes custom variables via `presets`
- [UniDeskSystemInfo](./UniDeskSystemInfo.md) — System data source
- [UDCText](../../component-encyclopedia/UDCText.md) — Text control using expressions