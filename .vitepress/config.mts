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
                sidebar: {
                    '/zh/components-wiki/overview': [
                        {
                            text: '使用指南',
                            items: [
                            ]
                        }
                    ],
                    '/zh/controls-reference/overview': [
                        {
                            text: '开发文档',
                            items: [
                                {text: '概览', link: '/zh/overview'}
                            ]
                        },
                        {
                            text: '全局单项',
                            items: [
                                {text: 'UniDeskBases'}
                            ]
                        },
                        {
                            text: '空间',
                            items: [
                                {text: 'UniDeskBases'}
                            ]
                        },
                    ]
                },
                search: {
                    provider: 'local'
                },  
                socialLinks: [
                    { icon: 'github', link: 'https://github.com/Uniquenium/Uniquenium' }
                ]
            }
        }
    },
})
