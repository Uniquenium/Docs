import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "文档中心",
    description: "Docs for Developing, Using and Contributing",
    head: [
        ['link', { rel: 'icon', href: '/uq-d.png' }],
    ],
    rewrites: {
        'zh/:rest*': ':rest*'
    },
    cleanUrls: true,
    locales: {
        en: { 
            label: 'English', 
        },
        root: { 
            label: '简体中文',
            themeConfig: {
                nav: [
                    { text: '首页', link: '/' },
                    { text: '使用指南', link: '/components-wiki/overview.md' },
                    { text: '开发参考', link: '/controls-reference/overview.md' }
                ],
                logo: {
                    light:"/uniquenium-l.png",  
                    dark:"/uniquenium-d.png",
                },
                search: {
                    provider: 'local'
                },  
                editLink: {
                    pattern: 'https://github.com/Uniquenium/Docs/edit/main/:path',
                    text: '在 Github 上编辑此页面'
                },
                lastUpdated: {
                    text: '最后更新',
                    formatOptions: {
                        dateStyle: 'full',
                        timeStyle: 'medium'
                    }
                },
                docFooter: {
                    prev: '上一页',
                    next: '下一页'
                },
                sidebar: {
                    '/components-wiki/': [
                        {
                            text: '使用指南',
                            items: [
                            ]
                        }
                    ],
                    '/controls-reference/': [
                        {
                            text: 'UniDesk开发文档',
                            items: [
                                {text: '概览', link: '/controls-reference/overview.md'},
                            ]
                        },
                        {
                            text: '基',
                            items: [
                                {text: 'UniDeskBase', link: '/controls-reference/bases/UniDeskBase.md'},
                                {text: 'UniDeskWindowBase', link: '/controls-reference/bases/UniDeskWindowBase.md'}
                            ]
                        },
                        {
                            text: '单项',
                            items: [
                                {text: 'UniDeskComManager',link: '/controls-reference/singletons/UniDeskComManager.md'},
                                {text: 'UniDeskGlobals',link: '/controls-reference/singletons/UniDeskGlobals.md'},
                                {text: 'UniDeskSettings',link: '/controls-reference/singletons/UniDeskSettings.md'},
                                {text: 'UniDeskSettingsWindow',link: '/controls-reference/singletons/UniDeskSettingsWindow.md'},
                                {text: 'UniDeskTextStyle',link: '/controls-reference/singletons/UniDeskTextStyle.md'},
                                {text: 'UniDeskTools',link: '/controls-reference/singletons/UniDeskTools.md'},
                            ]
                        },
                        {
                            text: '元件',
                            items: [
                                {text: 'UniDeskAcrylic',link: '/controls-reference/UniDeskAcrylic.md'},
                                {text: 'UniDeskButton',link: '/controls-reference/UniDeskButton.md'},
                                {text: 'UniDeskChart',link: '/controls-reference/UniDeskChart.md'},
                                {text: 'UniDeskCheckBox',link: '/controls-reference/UniDeskCheckBox.md'},
                                {text: 'UniDeskColorPicker',link: '/controls-reference/UniDeskColorPicker.md'},
                                {text: 'UniDeskComBase',link: '/controls-reference/UniDeskComBase.md'},
                                {text: 'UniDeskComboBox',link: '/controls-reference/UniDeskComboBox.md'},
                                {text: 'UniDeskDialog',link: '/controls-reference/UniDeskDialog.md'},
                                {text: 'UniDeskFontBox',link: '/controls-reference/UniDeskFontBox.md'},
                                {text: 'UniDeskFrame',link: '/controls-reference/UniDeskFrame.md'},
                                {text: 'UniDeskIcon',link: '/controls-reference/UniDeskIcon.md'},
                                {text: 'UniDeskMenu',link: '/controls-reference/UniDeskMenu.md'},
                                {text: 'UniDeskMenuItem',link: '/controls-reference/UniDeskMenuItem.md'},
                                {text: 'UniDeskMenuSeparator',link: '/controls-reference/UniDeskMenuSeparator.md'},
                                {text: 'UniDeskMessageBox',link: '/controls-reference/UniDeskMessageBox.md'},
                                {text: 'UniDeskObject',link: '/controls-reference/UniDeskObject.md'},
                                {text: 'UniDeskPathSelector',link: '/controls-reference/UniDeskPathSelector.md'},
                                {text: 'UniDeskRadioButton',link: '/controls-reference/UniDeskRadioButton.md'},
                                {text: 'UniDeskSpinBox',link: '/controls-reference/UniDeskSpinBox.md'},
                                {text: 'UniDeskTabBar',link: '/controls-reference/UniDeskTabBar.md'},
                                {text: 'UniDeskTabButton',link: '/controls-reference/UniDeskTabButton.md'},
                                {text: 'UniDeskText',link: '/controls-reference/UniDeskText.md'},
                                {text: 'UniDeskTextArea',link: '/controls-reference/UniDeskTextArea.md'},
                                {text: 'UniDeskTextButton',link: '/controls-reference/UniDeskTextButton.md'},
                                {text: 'UniDeskTextField',link: '/controls-reference/UniDeskTextField.md'},
                                {text: 'UniDeskTooltip',link: '/controls-reference/UniDeskTooltip.md'},
                                {text: 'UniDeskWindow',link: '/controls-reference/UniDeskWindow.md'}
                            ]
                        },
                    ]
                },
                socialLinks: [
                    { icon: 'github', link: 'https://github.com/Uniquenium/Uniquenium' }
                ],
                outline:{
                    level: 'deep',
                    label: "页面导航"
                },
                footer: {
                    message: '遵循 <a href=\"https://creativecommons.org/licenses/by-sa/4.0/deed.zh\" class=\"grabient-text\">CC BY-SA 4.0</a> 协议。',
                    copyright: 'Copyright © 2025-现在 Uniquenium Development Team'
                }
            }
        }
    },
    base: '/',
    sitemap: {
        hostname: 'https://docs.uniquenium.qyadbr.top'
    }
})
