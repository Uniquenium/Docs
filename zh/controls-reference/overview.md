---
title: 概览 
layout: doc
editLink: true
---
# 概览
## 系统要求
- Python 3.12.8以上版本
- PySide 6.8.3以上版本
- darkdetect
## 准备工作
建议先阅读[Qt官方QML文档](https://doc.qt.io/qt-6.8/qmlapplications.html)
## 开发环境搭建
```sh
git clone https://github.com/Uniquenium/Uniquenium.git
cd Uniquenium
pip install -r requirements.txt
```
## 运行

```sh
./start
```
## 控件库UniDesk

UniDesk 是 Uniquenium 的控件库。
UniDesk 控件分为三类： 基（Base）、抽象单项和具体单项（Singleton）和元件（Element）
使用时，在qml文件前添加

```qml
import UniDesk
```

## 抽象单项使用方法

```qml
<全局单项名>.<属性名>
<全局单项名>.<函数名>(参数)
```

## 基、具体单项、元件使用方法

```qml
//父元件的部分
<元件名>{
	<属性名>: <属性值>
	<事件（信号）名>: {
		//处理的内容
	}
	<子元件名>{
		//...
	}
}
```
