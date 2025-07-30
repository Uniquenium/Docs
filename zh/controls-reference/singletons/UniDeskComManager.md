---
title: UniDeskComManager
editLink: true
---
# UniDeskComManger 类型
本单项用于管理Uniquenium中的各组件

| 控件类型    | 抽象单项                              |
| ------- | --------------------------------- |
| 源代码文件路径 | `UniDesk/UniDeskComManager.qml`   |
| 继承      | [UniDeskObject](../UniDeskObject) |
## 方法

### `function add_com_text(text,color,fontSource,family,size)`
在桌面上添加一个文本组件。
#### 参数
- text: 文本内容
- color: 文本颜色
- fontSource: 当使用自定义字体时，加载字体的路径，不使用自定义字体则填空字符串
- family： 当使用系统字体时，字体家族的名称，不使用则填空字符串
- size： 文本尺寸，单位像素
### `function close_all()`
关闭所有组件。
### `function toggle_page_to(index)`
切换页面
#### 参数
- index: 要切换到的页面索引
### `function new_page()`
创建新页面。



