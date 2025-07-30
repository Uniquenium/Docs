import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "文档中心",
    description: "Docs for Developing, Using and Contributing",
    head: [
        ['link', { rel: 'icon', href: '/uq-d.png' }],
    ],
    locales: {
        en: { 
            label: 'English', 
        },
        zh: { 
            label: '简体中文',
            themeConfig: {
                nav: [
                    { text: '使用指南', link: '/zh/components-wiki/overview' },
                    { text: '开发参考', link: '/zh/controls-reference/overview' }
                ],
                logo: "/uniquenium-l-bg.png",
                search: {
                    provider: 'local'
                },  
                editLink: {
                    pattern: 'https://github.com/Uniquenium/Docs/edit/main/:path',
                    text: '在 Github 上编辑此页面'
                },
                lastUpdated: {
                    text: 'Updated at',
                    formatOptions: {
                        dateStyle: 'full',
                        timeStyle: 'medium'
                    }
                },
                sidebar: {
                    '/zh/components-wiki/': [
                        {
                            text: '使用指南',
                            items: [
                            ]
                        }
                    ],
                    '/zh/controls-reference/': [
                        {
                            text: 'UniDesk开发文档',
                            items: [
                                {text: '概览', link: '/zh/controls-reference/overview.md'}
                            ]
                        },
                        {
                            text: '基',
                            items: [
                                {text: 'UniDeskBase', link: '/zh/controls-reference/bases/UniDeskBase.md'},
                                {text: 'UniDeskWindowBase', link: '/zh/controls-reference/bases/UniDeskWindowBase.md'}
                            ]
                        },
                        {
                            text: '单项',
                            items: [
                                {text: 'UniDeskComManager',link: '/zh/controls-reference/singletons/UniDeskComManager.md'},
                                {text: 'UniDeskGlobals',link: '/zh/controls-reference/singletons/UniDeskGlobals.md'},
                                {text: 'UniDeskSettings',link: '/zh/controls-reference/singletons/UniDeskSettings.md'},
                                {text: 'UniDeskSettingsWindow',link: '/zh/controls-reference/singletons/UniDeskSettingsWindow.md'},
                                {text: 'UniDeskTextStyle',link: '/zh/controls-reference/singletons/UniDeskTextStyle.md'},
                                {text: 'UniDeskTools',link: '/zh/controls-reference/singletons/UniDeskTools.md'},
                            ]
                        },
                        {
                            text: '元件',
                            items: [
                                {text: 'UniDeskAcrylic',link: '/zh/controls-reference/UniDeskAcrylic.md'},
                                {text: 'UniDeskButton',link: '/zh/controls-reference/UniDeskButton.md'},
                                {text: 'UniDeskChart',link: '/zh/controls-reference/UniDeskChart.md'},
                                {text: 'UniDeskCheckBox',link: '/zh/controls-reference/UniDeskCheckBox.md'},
                                {text: 'UniDeskColorPicker',link: '/zh/controls-reference/UniDeskColorPicker.md'},
                                {text: 'UniDeskComBase',link: '/zh/controls-reference/UniDeskComBase.md'},
                                {text: 'UniDeskComboBox',link: '/zh/controls-reference/UniDeskComboBox.md'},
                                {text: 'UniDeskDialog',link: '/zh/controls-reference/UniDeskDialog.md'},
                                {text: 'UniDeskFontBox',link: '/zh/controls-reference/UniDeskFontBox.md'},
                                {text: 'UniDeskFrame',link: '/zh/controls-reference/UniDeskFrame.md'},
                                {text: 'UniDeskIcon',link: '/zh/controls-reference/UniDeskIcon.md'},
                                {text: 'UniDeskMenu',link: '/zh/controls-reference/UniDeskMenu.md'},
                                {text: 'UniDeskMenuItem',link: '/zh/controls-reference/UniDeskMenuItem.md'},
                                {text: 'UniDeskMenuSeparator',link: '/zh/controls-reference/UniDeskMenuSeparator.md'},
                                {text: 'UniDeskMessageBox',link: '/zh/controls-reference/UniDeskMessageBox.md'},
                                {text: 'UniDeskObject',link: '/zh/controls-reference/UniDeskObject.md'},
                                {text: 'UniDeskPathSelector',link: '/zh/controls-reference/UniDeskPathSelector.md'},
                                {text: 'UniDeskRadioButton',link: '/zh/controls-reference/UniDeskRadioButton.md'},
                                {text: 'UniDeskSpinBox',link: '/zh/controls-reference/UniDeskSpinBox.md'},
                                {text: 'UniDeskTabBar',link: '/zh/controls-reference/UniDeskTabBar.md'},
                                {text: 'UniDeskTabButton',link: '/zh/controls-reference/UniDeskTabButton.md'},
                                {text: 'UniDeskText',link: '/zh/controls-reference/UniDeskText.md'},
                                {text: 'UniDeskTextArea',link: '/zh/controls-reference/UniDeskTextArea.md'},
                                {text: 'UniDeskTextButton',link: '/zh/controls-reference/UniDeskTextButton.md'},
                                {text: 'UniDeskTextField',link: '/zh/controls-reference/UniDeskTextField.md'},
                                {text: 'UniDeskTooltip',link: '/zh/controls-reference/UniDeskTooltip.md'},
                                {text: 'UniDeskWindow',link: '/zh/controls-reference/UniDeskWindow.md'}
                            ]
                        },
                    ]
                },
                socialLinks: [
                    { icon: 'github', link: 'https://github.com/Uniquenium/Uniquenium' }
                ],
                outline:{
                    level: 3,
                    label: "页面导航"
                },
                footer: {
                    message: '遵循 <a href=\"https://creativecommons.org/licenses/by-sa/4.0/deed.zh\" class=\"grabient-text\">CC BY-SA 4.0</a> 协议。',
                    copyright: 'Copyright © 2025-现在 Uniquenium Development Team'
                }
            }
        }
    },
})
