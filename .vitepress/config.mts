import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
    title: "官网",
    description: "Uniquenium - 集美化与实用功能于一体的开源桌面自定义工具",
    head: [
        ['link', { rel: 'icon', href: '/uq-d.png' }],
        ['meta', { name: 'keywords', content: 'Uniquenium, UniDesk, 桌面工具, 自定义桌面, QML, Qt, Python' }],
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
                            { text: 'Components Overview', link: '/en/components-wiki/overview.md' },
                            { text: 'Glossary', link: '/en/glossary.md' },
                            { text: 'FAQ', link: '/en/faq.md' },
                        ]
                    },
                    { 
                        text: 'Development', 
                        items: [
                            { text: 'Controls Reference', link: '/en/controls-reference/overview.md' },
                            { text: 'Custom Development', link: '/en/custom-developing/plugin.md' },
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
                    '/en/components-wiki/': [
                        {
                            text: 'User Guide',
                            items: [
                                { text: 'Components Overview', link: '/en/components-wiki/overview.md' },
                                { text: 'Glossary', link: '/en/glossary.md' },
                            ]
                        },
                        {
                            text: 'Basic Operations',
                            items: [
                                { text: 'Interface', link: '/en/components-wiki/overview.md#interface' },
                                { text: 'Creating Pages', link: '/en/components-wiki/overview.md#creating-pages' },
                                { text: 'Adding Components', link: '/en/components-wiki/overview.md#adding-components' },
                                { text: 'Component Properties', link: '/en/components-wiki/overview.md#component-properties' },
                            ]
                        },
                        {
                            text: 'Advanced Features',
                            items: [
                                { text: 'Keyboard Shortcuts', link: '/en/components-wiki/overview.md#keyboard-shortcuts' },
                                { text: 'Theme Switching', link: '/en/components-wiki/overview.md#theme-switching' },
                                { text: 'Using Templates', link: '/en/custom-developing/template.md' },
                                { text: 'Plugin Development', link: '/en/custom-developing/plugin.md' },
                                { text: 'Custom Cursors', link: '/en/custom-developing/cursor-style.md' },
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
                                { text: 'UniDeskGlobals', link: '/en/controls-reference/singletons/UniDeskGlobals.md' },
                                { text: 'UniDeskSettings', link: '/en/controls-reference/singletons/UniDeskSettings.md' },
                                { text: 'UniDeskSettingsWindow', link: '/en/controls-reference/singletons/UniDeskSettingsWindow.md' },
                                { text: 'UniDeskTextStyle', link: '/en/controls-reference/singletons/UniDeskTextStyle.md' },
                                { text: 'UniDeskTools', link: '/en/controls-reference/singletons/UniDeskTools.md' },
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
                        }
                    ]
                },
                socialLinks: [
                    { icon: 'github', link: 'https://github.com/Uniquenium/Uniquenium' }
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
                            { text: '组件百科概览', link: '/components-wiki/overview.md' },
                            { text: '术语表', link: '/glossary.md' },
                            { text: '常见问题 FAQ', link: '/faq.md' },
                        ]
                    },
                    { 
                        text: '开发参考', 
                        items: [
                            { text: '控件库概览', link: '/controls-reference/overview.md' },
                            { text: '自定义开发', link: '/custom-developing/plugin.md' },
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
                    '/components-wiki/': [
                        {
                            text: '使用指南',
                            items: [
                                { text: '组件百科概览', link: '/components-wiki/overview.md' },
                                { text: '术语表', link: '/glossary.md' },
                            ]
                        },
                        {
                            text: '基础操作',
                            items: [
                                { text: '界面介绍', link: '/components-wiki/overview.md#界面介绍' },
                                { text: '创建页面', link: '/components-wiki/overview.md#创建页面' },
                                { text: '添加组件', link: '/components-wiki/overview.md#添加组件' },
                                { text: '组件属性编辑', link: '/components-wiki/overview.md#组件属性编辑' },
                            ]
                        },
                        {
                            text: '高级功能',
                            items: [
                                { text: '快捷键设置', link: '/components-wiki/overview.md#快捷键设置' },
                                { text: '主题切换', link: '/components-wiki/overview.md#主题切换' },
                                { text: '模板使用', link: '/custom-developing/template.md' },
                                { text: '插件开发', link: '/custom-developing/plugin.md' },
                                { text: '自定义光标样式', link: '/custom-developing/cursor-style.md' },
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
                                { text: 'UniDeskGlobals', link: '/controls-reference/singletons/UniDeskGlobals.md' },
                                { text: 'UniDeskSettings', link: '/controls-reference/singletons/UniDeskSettings.md' },
                                { text: 'UniDeskSettingsWindow', link: '/controls-reference/singletons/UniDeskSettingsWindow.md' },
                                { text: 'UniDeskTextStyle', link: '/controls-reference/singletons/UniDeskTextStyle.md' },
                                { text: 'UniDeskTools', link: '/controls-reference/singletons/UniDeskTools.md' },
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
                        }
                    ]
                },
                socialLinks: [
                    { icon: 'github', link: 'https://github.com/Uniquenium/Uniquenium' }
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