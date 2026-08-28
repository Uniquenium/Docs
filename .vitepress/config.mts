import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
    title: "官网",
    description: "Uniquenium - 高度自由的开源桌面自定义工具",
    head: [
        ['link', { rel: 'icon', href: '/uq-d.png' }],
        ['meta', { name: 'keywords', content: 'Uniquenium, UniDesk, 桌面工具, 自定义桌面, QML, Qt, C++' }],
        ['meta', { name: 'author', content: 'Uniquenium Development Team' }],
    ],
    rewrites: {
        'zh/:rest*': ':rest*'
    },
    cleanUrls: true,
    locales: {
        en: { 
            label: 'English',
            lang: 'en-US',
            link: '/en/',
            themeConfig: {
                nav: [
                    { text: 'Home', link: '/en/' },
                    { 
                        text: 'Getting Started', 
                        items: [
                            { text: 'Download', link: '/en/download.md' },
                            { text: 'Installation Guide', link: '/en/quick-start/install.md' },
                        ]
                    },
                    { 
                        text: 'User Guide', 
                        items: [
                            { text: 'Component Encyclopedia', link: '/en/component-encyclopedia/overview.md' },
                            { text: 'Glossary', link: '/en/glossary.md' },
                            { text: 'FAQ', link: '/en/faq.md' },
                        ]
                    },
                    { 
                        text: 'Development', 
                        items: [
                            { text: 'Controls Reference', link: '/en/controls-reference/overview.md' },
                            { text: 'CppExt Backend', link: '/en/controls-reference/cpp-ext/overview.md' },
                            { text: 'Custom Development', link: '/en/custom-developing/plugin.md' },
                            { text: 'Official Plugins', link: '/en/official-plugins.md' },
                        ]
                    },
                    { text: 'About', link: '/en/about.md' }
                ],
                logo: {
                    light:"/uniquenium-l.png",  
                    dark:"/uniquenium-d.png",
                    alt: 'Uniquenium Logo'
                },
                search: {
                    provider: 'local',
                    options: {
                        miniSearch: {
                            options: {
                                fuzzy: 0.2,
                                prefix: true
                            }
                        },
                        translations: {
                            button: {
                                buttonText: 'Search Docs',
                                buttonAriaLabel: 'Search documentation'
                            },
                            modal: {
                                noResultsText: 'No results found',
                                resetButtonTitle: 'Clear search',
                                footer: {
                                    selectText: 'Select',
                                    navigateText: 'Navigate',
                                    closeText: 'Close'
                                },
                                displayDetails: 'Show details'
                            }
                        }
                    }
                },
                editLink: {
                    pattern: 'https://github.com/Uniquenium/Docs/edit/main/:path',
                    text: 'Edit this page on GitHub'
                },
                lastUpdated: {
                    text: 'Last updated',
                    formatOptions: {
                        dateStyle: 'full',
                        timeStyle: 'medium'
                    }
                },
                docFooter: {
                    prev: 'Previous',
                    next: 'Next'
                },
                sidebar: {
                    '/en/quick-start/': [
                        {
                            text: 'Getting Started',
                            items: [
                                { text: 'Download Uniquenium', link: '/en/download.md' },
                                { text: 'Installation Guide', link: '/en/quick-start/install.md' },
                            ]
                        }
                    ],
                    '/en/custom-developing/': [
                        {
                            text: 'Custom Development',
                            items: [
                                { text: 'Plugin Development Guide', link: '/en/custom-developing/plugin.md' },
                                { text: 'Template System', link: '/en/custom-developing/template.md' },
                                { text: 'Custom Cursor Styles', link: '/en/custom-developing/cursor-style.md' },
                                { text: 'Official Plugins', link: '/en/official-plugins.md' },
                            ]
                        }
                    ],
                    '/en/component-encyclopedia/': [
                        {
                            text: 'Component Encyclopedia',
                            items: [
                                { text: 'Overview', link: '/en/component-encyclopedia/overview.md' },
                                { text: 'UDCText', link: '/en/component-encyclopedia/UDCText.md' },
                                { text: 'UDCImage', link: '/en/component-encyclopedia/UDCImage.md' },
                                { text: 'UDCFrame', link: '/en/component-encyclopedia/UDCFrame.md' },
                            ]
                        }
                    ],
                    '/en/controls-reference/': [
                        {
                            text: 'UniDesk Development',
                            items: [
                                { text: 'Overview', link: '/en/controls-reference/overview.md' },
                                { text: 'Glossary', link: '/en/glossary.md' },
                                { text: 'System Requirements', link: '/en/controls-reference/overview.md#system-requirements' },
                                { text: 'Setting Up Environment', link: '/en/controls-reference/overview.md#setting-up-environment' },
                            ]
                        },
                        {
                            text: 'Singletons',
                            items: [
                                { text: 'UniDeskComManager', link: '/en/controls-reference/singletons/UniDeskComManager.md' },
                                { text: 'UniDeskSettingsWindow', link: '/en/controls-reference/singletons/UniDeskSettingsWindow.md' },
                            ]
                        },
                        {
                            text: 'Windows & Containers',
                            items: [
                                { text: 'UniDeskWindow', link: '/en/controls-reference/UniDeskWindow.md' },
                                { text: 'UniDeskDialog', link: '/en/controls-reference/UniDeskDialog.md' },
                                { text: 'UniDeskFrame', link: '/en/controls-reference/UniDeskFrame.md' },
                                { text: 'UniDeskAcrylic', link: '/en/controls-reference/UniDeskAcrylic.md' },
                                { text: 'UniDeskAppBar', link: '/en/controls-reference/UniDeskAppBar.md' },
                                { text: 'UniDeskShadow', link: '/en/controls-reference/UniDeskShadow.md' },
                            ]
                        },
                        {
                            text: 'Buttons',
                            items: [
                                { text: 'UniDeskButton', link: '/en/controls-reference/UniDeskButton.md' },
                                { text: 'UniDeskTextButton', link: '/en/controls-reference/UniDeskTextButton.md' },
                                { text: 'UniDeskIcon', link: '/en/controls-reference/UniDeskIcon.md' },
                            ]
                        },
                        {
                            text: 'Input',
                            items: [
                                { text: 'UniDeskTextField', link: '/en/controls-reference/UniDeskTextField.md' },
                                { text: 'UniDeskTextArea', link: '/en/controls-reference/UniDeskTextArea.md' },
                                { text: 'UniDeskSpinBox', link: '/en/controls-reference/UniDeskSpinBox.md' },
                                { text: 'UniDeskComboBox', link: '/en/controls-reference/UniDeskComboBox.md' },
                                { text: 'UniDeskFontBox', link: '/en/controls-reference/UniDeskFontBox.md' },
                                { text: 'UniDeskPathSelector', link: '/en/controls-reference/UniDeskPathSelector.md' },
                                { text: 'UniDeskColorPicker', link: '/en/controls-reference/UniDeskColorPicker.md' },
                                { text: 'UniDeskSlider', link: '/en/controls-reference/UniDeskSlider.md' },
                                { text: 'UniDeskHotkeyPicker', link: '/en/controls-reference/UniDeskHotkeyPicker.md' },
                            ]
                        },
                        {
                            text: 'Selection',
                            items: [
                                { text: 'UniDeskCheckBox', link: '/en/controls-reference/UniDeskCheckBox.md' },
                                { text: 'UniDeskRadioButton', link: '/en/controls-reference/UniDeskRadioButton.md' },
                            ]
                        },
                        {
                            text: 'Text & Display',
                            items: [
                                { text: 'UniDeskText', link: '/en/controls-reference/UniDeskText.md' },
                                { text: 'UniDeskImage', link: '/en/controls-reference/UniDeskImage.md' },
                                { text: 'UniDeskChart', link: '/en/controls-reference/UniDeskChart.md' },
                                { text: 'UniDeskTooltip', link: '/en/controls-reference/UniDeskTooltip.md' },
                                { text: 'UniDeskInfoBar', link: '/en/controls-reference/UniDeskInfoBar.md' },
                                { text: 'UniDeskMessageBox', link: '/en/controls-reference/UniDeskMessageBox.md' },
                            ]
                        },
                        {
                            text: 'Navigation & Tabs',
                            items: [
                                { text: 'UniDeskTabBar', link: '/en/controls-reference/UniDeskTabBar.md' },
                                { text: 'UniDeskTabButton', link: '/en/controls-reference/UniDeskTabButton.md' },
                            ]
                        },
                        {
                            text: 'Menu System',
                            items: [
                                { text: 'UniDeskMenu', link: '/en/controls-reference/UniDeskMenu.md' },
                                { text: 'UniDeskMenuItem', link: '/en/controls-reference/UniDeskMenuItem.md' },
                                { text: 'UniDeskMenuSeparator', link: '/en/controls-reference/UniDeskMenuSeparator.md' },
                            ]
                        },
                        {
                            text: 'Position & Size',
                            items: [
                                { text: 'UniDeskPosSelector', link: '/en/controls-reference/UniDeskPosSelector.md' },
                                { text: 'UniDeskSizeSelector', link: '/en/controls-reference/UniDeskSizeSelector.md' },
                            ]
                        },
                        {
                            text: 'Component Editor',
                            items: [
                                { text: 'UniDeskComBase', link: '/en/controls-reference/UniDeskComBase.md' },
                                { text: 'UniDeskComBox', link: '/en/controls-reference/UniDeskComBox.md' },
                                { text: 'UniDeskComBasicOptions', link: '/en/controls-reference/UniDeskComBasicOptions.md' },
                                { text: 'UniDeskComRectEditor', link: '/en/controls-reference/UniDeskComRectEditor.md' },
                            ]
                        },
                        {
                            text: 'Base Object',
                            items: [
                                { text: 'UniDeskObject', link: '/en/controls-reference/UniDeskObject.md' },
                            ]
                        },
                        {
                            text: 'CppExt Backend',
                            items: [
                                { text: 'Overview', link: '/en/controls-reference/cpp-ext/overview.md' },
                                { text: 'UniDeskGlobals', link: '/en/controls-reference/cpp-ext/UniDeskGlobals.md' },
                                { text: 'UniDeskSettings', link: '/en/controls-reference/cpp-ext/UniDeskSettings.md' },
                                { text: 'UniDeskTextStyle', link: '/en/controls-reference/cpp-ext/UniDeskTextStyle.md' },
                                { text: 'UniDeskTools', link: '/en/controls-reference/cpp-ext/UniDeskTools.md' },
                                { text: 'UniDeskPluginMgr', link: '/en/controls-reference/cpp-ext/UniDeskPluginMgr.md' },
                                { text: 'UniDeskTempleteMgr', link: '/en/controls-reference/cpp-ext/UniDeskTempleteMgr.md' },
                                { text: 'UniDeskExpr', link: '/en/controls-reference/cpp-ext/UniDeskExpr.md' },
                                { text: 'UniDeskSystemInfo', link: '/en/controls-reference/cpp-ext/UniDeskSystemInfo.md' },
                                { text: 'UniDeskComponentsData', link: '/en/controls-reference/cpp-ext/UniDeskComponentsData.md' },
                                { text: 'UniDeskPluginInterface', link: '/en/controls-reference/cpp-ext/UniDeskPluginInterface.md' },
                            ]
                        }
                    ]
                },
                socialLinks: [
                    { icon: 'github', link: 'https://github.com/Uniquenium/Uniquenium' },
                    { icon: 'discord', link: 'https://discord.gg/Cqq9sRkrW2' },
                    {
                        icon: {
                            svg: '<svg t="1787889371823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns=" " p-id="1803" width="200" height="200"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" p-id="1804"></path></svg>'
                        },
                        link: '/en/about#community-users'
                    }
                ],
                outline:{
                    level: [2, 4],
                    label: "On This Page"
                },
                footer: {
                    message: 'Released under the <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" style="color: var(--vp-c-brand-1)">CC BY-SA 4.0</a> open documentation license.',
                    copyright: 'Copyright © 2025-present Uniquenium Development Team · Crafted with care'
                }
            }
        },
        root: { 
            label: '简体中文',
            lang: 'zh-CN',
            themeConfig: {
                nav: [
                    { text: '首页', link: '/' },
                    { 
                        text: '快速开始', 
                        items: [
                            { text: '下载', link: '/download.md' },
                            { text: '安装指南', link: '/quick-start/install.md' },
                        ]
                    },
                    { 
                        text: '使用指南', 
                        items: [
                            { text: '组件百科', link: '/component-encyclopedia/overview.md' },
                            { text: '术语表', link: '/glossary.md' },
                            { text: '常见问题 FAQ', link: '/faq.md' },
                        ]
                    },
                    { 
                        text: '开发参考', 
                        items: [
                            { text: '控件库概览', link: '/controls-reference/overview.md' },
                            { text: 'CppExt 后端', link: '/controls-reference/cpp-ext/overview.md' },
                            { text: '自定义开发', link: '/custom-developing/plugin.md' },
                            { text: '官方插件', link: '/official-plugins.md' },
                        ]
                    },
                    { text: '关于', link: '/about.md' }
                ],
                logo: {
                    light:"/uniquenium-l.png",  
                    dark:"/uniquenium-d.png",
                    alt: 'Uniquenium Logo'
                },
                search: {
                    provider: 'local',
                    options: {
                        miniSearch: {
                            options: {
                                fuzzy: 0.2,
                                prefix: true
                            }
                        },
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                    closeText: '关闭'
                                },
                                displayDetails: '显示详细列表'
                            }
                        }
                    }
                },  
                editLink: {
                    pattern: 'https://github.com/Uniquenium/Docs/edit/main/:path',
                    text: '在 GitHub 上编辑此页面'
                },
                lastUpdated: {
                    text: '最后更新于',
                    formatOptions: {
                        dateStyle: 'full',
                        timeStyle: 'medium'
                    }
                },
                docFooter: {
                    prev: '上一篇',
                    next: '下一篇'
                },
                sidebar: {
                    '/quick-start/': [
                        {
                            text: '快速开始',
                            items: [
                                { text: '下载 Uniquenium', link: '/download.md' },
                                { text: '安装指南', link: '/quick-start/install.md' },
                            ]
                        }
                    ],
                    '/custom-developing/': [
                        {
                            text: '自定义开发',
                            items: [
                                { text: '插件开发指南', link: '/custom-developing/plugin.md' },
                                { text: '模板系统', link: '/custom-developing/template.md' },
                                { text: '自定义光标样式', link: '/custom-developing/cursor-style.md' },
                                { text: '官方插件', link: '/official-plugins.md' },
                            ]
                        }
                    ],
                    '/component-encyclopedia/': [
                        {
                            text: '组件百科',
                            items: [
                                { text: '概览', link: '/component-encyclopedia/overview.md' },
                                { text: 'UDCText', link: '/component-encyclopedia/UDCText.md' },
                                { text: 'UDCImage', link: '/component-encyclopedia/UDCImage.md' },
                                { text: 'UDCFrame', link: '/component-encyclopedia/UDCFrame.md' },
                            ]
                        }
                    ],
                    '/controls-reference/': [
                        {
                            text: 'UniDesk 开发文档',
                            items: [
                                { text: '概览', link: '/controls-reference/overview.md' },
                                { text: '术语表', link: '/glossary.md' },
                                { text: '系统要求', link: '/controls-reference/overview.md#系统要求' },
                                { text: '开发环境搭建', link: '/controls-reference/overview.md#开发环境搭建' },
                                { text: '控件库分类', link: '/controls-reference/overview.md#控件库unidesk' },
                            ]
                        },
                        {
                            text: '单例 (Singletons)',
                            items: [
                                { text: 'UniDeskComManager', link: '/controls-reference/singletons/UniDeskComManager.md' },
                                { text: 'UniDeskSettingsWindow', link: '/controls-reference/singletons/UniDeskSettingsWindow.md' },
                            ]
                        },
                        {
                            text: '窗口与容器',
                            items: [
                                { text: 'UniDeskWindow', link: '/controls-reference/UniDeskWindow.md' },
                                { text: 'UniDeskDialog', link: '/controls-reference/UniDeskDialog.md' },
                                { text: 'UniDeskFrame', link: '/controls-reference/UniDeskFrame.md' },
                                { text: 'UniDeskAcrylic', link: '/controls-reference/UniDeskAcrylic.md' },
                                { text: 'UniDeskAppBar', link: '/controls-reference/UniDeskAppBar.md' },
                                { text: 'UniDeskShadow', link: '/controls-reference/UniDeskShadow.md' },
                            ]
                        },
                        {
                            text: '按钮控件',
                            items: [
                                { text: 'UniDeskButton', link: '/controls-reference/UniDeskButton.md' },
                                { text: 'UniDeskTextButton', link: '/controls-reference/UniDeskTextButton.md' },
                                { text: 'UniDeskIcon', link: '/controls-reference/UniDeskIcon.md' },
                            ]
                        },
                        {
                            text: '输入控件',
                            items: [
                                { text: 'UniDeskTextField', link: '/controls-reference/UniDeskTextField.md' },
                                { text: 'UniDeskTextArea', link: '/controls-reference/UniDeskTextArea.md' },
                                { text: 'UniDeskSpinBox', link: '/controls-reference/UniDeskSpinBox.md' },
                                { text: 'UniDeskComboBox', link: '/controls-reference/UniDeskComboBox.md' },
                                { text: 'UniDeskFontBox', link: '/controls-reference/UniDeskFontBox.md' },
                                { text: 'UniDeskPathSelector', link: '/controls-reference/UniDeskPathSelector.md' },
                                { text: 'UniDeskColorPicker', link: '/controls-reference/UniDeskColorPicker.md' },
                                { text: 'UniDeskSlider', link: '/controls-reference/UniDeskSlider.md' },
                                { text: 'UniDeskHotkeyPicker', link: '/controls-reference/UniDeskHotkeyPicker.md' },
                            ]
                        },
                        {
                            text: '选择控件',
                            items: [
                                { text: 'UniDeskCheckBox', link: '/controls-reference/UniDeskCheckBox.md' },
                                { text: 'UniDeskRadioButton', link: '/controls-reference/UniDeskRadioButton.md' },
                            ]
                        },
                        {
                            text: '文本与显示',
                            items: [
                                { text: 'UniDeskText', link: '/controls-reference/UniDeskText.md' },
                                { text: 'UniDeskImage', link: '/controls-reference/UniDeskImage.md' },
                                { text: 'UniDeskChart', link: '/controls-reference/UniDeskChart.md' },
                                { text: 'UniDeskTooltip', link: '/controls-reference/UniDeskTooltip.md' },
                                { text: 'UniDeskInfoBar', link: '/controls-reference/UniDeskInfoBar.md' },
                                { text: 'UniDeskMessageBox', link: '/controls-reference/UniDeskMessageBox.md' },
                            ]
                        },
                        {
                            text: '导航与标签',
                            items: [
                                { text: 'UniDeskTabBar', link: '/controls-reference/UniDeskTabBar.md' },
                                { text: 'UniDeskTabButton', link: '/controls-reference/UniDeskTabButton.md' },
                            ]
                        },
                        {
                            text: '菜单系统',
                            items: [
                                { text: 'UniDeskMenu', link: '/controls-reference/UniDeskMenu.md' },
                                { text: 'UniDeskMenuItem', link: '/controls-reference/UniDeskMenuItem.md' },
                                { text: 'UniDeskMenuSeparator', link: '/controls-reference/UniDeskMenuSeparator.md' },
                            ]
                        },
                        {
                            text: '位置与尺寸选择',
                            items: [
                                { text: 'UniDeskPosSelector', link: '/controls-reference/UniDeskPosSelector.md' },
                                { text: 'UniDeskSizeSelector', link: '/controls-reference/UniDeskSizeSelector.md' },
                            ]
                        },
                        {
                            text: '组件编辑器专用',
                            items: [
                                { text: 'UniDeskComBase', link: '/controls-reference/UniDeskComBase.md' },
                                { text: 'UniDeskComBox', link: '/controls-reference/UniDeskComBox.md' },
                                { text: 'UniDeskComBasicOptions', link: '/controls-reference/UniDeskComBasicOptions.md' },
                                { text: 'UniDeskComRectEditor', link: '/controls-reference/UniDeskComRectEditor.md' },
                            ]
                        },
                        {
                            text: '基础对象',
                            items: [
                                { text: 'UniDeskObject', link: '/controls-reference/UniDeskObject.md' },
                            ]
                        },
                        {
                            text: 'CppExt 后端',
                            items: [
                                { text: '总览', link: '/controls-reference/cpp-ext/overview.md' },
                                { text: 'UniDeskGlobals', link: '/controls-reference/cpp-ext/UniDeskGlobals.md' },
                                { text: 'UniDeskSettings', link: '/controls-reference/cpp-ext/UniDeskSettings.md' },
                                { text: 'UniDeskTextStyle', link: '/controls-reference/cpp-ext/UniDeskTextStyle.md' },
                                { text: 'UniDeskTools', link: '/controls-reference/cpp-ext/UniDeskTools.md' },
                                { text: 'UniDeskPluginMgr', link: '/controls-reference/cpp-ext/UniDeskPluginMgr.md' },
                                { text: 'UniDeskTempleteMgr', link: '/controls-reference/cpp-ext/UniDeskTempleteMgr.md' },
                                { text: 'UniDeskExpr', link: '/controls-reference/cpp-ext/UniDeskExpr.md' },
                                { text: 'UniDeskSystemInfo', link: '/controls-reference/cpp-ext/UniDeskSystemInfo.md' },
                                { text: 'UniDeskComponentsData', link: '/controls-reference/cpp-ext/UniDeskComponentsData.md' },
                                { text: 'UniDeskPluginInterface', link: '/controls-reference/cpp-ext/UniDeskPluginInterface.md' },
                            ]
                        }
                    ]
                },
                socialLinks: [
                    { icon: 'github', link: 'https://github.com/Uniquenium/Uniquenium' },
                    { icon: 'discord', link: 'https://discord.gg/Cqq9sRkrW2' },
                    {
                        icon: {
                            svg: '<svg t="1787889371823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns=" " p-id="1803" width="200" height="200"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" p-id="1804"></path></svg>'
                            },
                        link: '/about#社区与用户'
                    }
                ],
                outline:{
                    level: [2, 4],
                    label: "本页目录"
                },
                footer: {
                    message: '遵循 <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh" target="_blank" style="color: var(--vp-c-brand-1)">CC BY-SA 4.0</a> 协议开源文档。',
                    copyright: 'Copyright © 2025-至今 Uniquenium Development Team · 用心打造每一个像素'
                }
            }
        }
    },
    base: '/',
    sitemap: {
        hostname: 'https://docs.uniquenium.qyadbr.top'
    },
    vue: {
        template: {
            compilerOptions: {
                isCustomElement: (tag) => tag.startsWith('uni-')
            }
        }
    },
    
}))