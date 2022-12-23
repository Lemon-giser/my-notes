import { defineConfig } from 'vitepress'
import menu from './create-nav'

export default defineConfig({
  lang: 'zh-CN',
  base: '/',
  head: [
    [
      'link', { rel: 'icon', href: '/head.jpg' }
    ]
  ],
  titleTemplate: false,
  description: '倡的学习记录',
  themeConfig: {
    siteTitle: '倡的学习记录',
    logo: '/head.jpg',
    // nav
    ...menu,
    outline: [1, 6]
    // nav: [
    //   { text: 'Guide1', link: '/guide/index' },
    //   { text: 'Guide', link: '/guide/index' },
    //   { text: 'Guide', link: '/guide/index' },
    //   { text: 'Guide', link: '/guide/index' },
    //   { text: 'Configs', link: '/configs' },
    //   { text: 'Changelog', link: 'https://github.com/...' },
    //   // {
    //   //   text: 'Dropdown Menu',
    //   //   items: [
    //   //     { text: 'Item A', link: '/item-1' },
    //   //     { text: 'Item B', link: '/item-2' },
    //   //     { text: 'Item C', link: '/item-3' }
    //   //   ]
    //   // },
    //   // {
    //   //   text: '嵌套下拉菜单',
    //   //   items: [
    //   //     {
    //   //       // Title for the section.
    //   //       text: 'Section A Title',
    //   //       items: [
    //   //         { text: 'Section A Item A', link: '...' },
    //   //         { text: 'Section B Item B', link: '...' }
    //   //       ]
    //   //     }
    //   //   ]
    //   // },
    //
    // ],
    // sidebar: {
    //   // This sidebar gets displayed when user is
    //   // under `guide` directory.
    //   '/guide/': [
    //     {
    //       text: 'Guide',
    //       items: [
    //         // This shows `/guide/index.md` page.
    //         { text: 'Index', link: '/guide/' }, // /guide/index.md
    //         { text: 'One', link: '/guide/one' }, // /guide/one.md
    //         { text: 'Two', link: '/guide/two' } // /guide/two.md
    //       ]
    //     }
    //   ],
    //
    //   // This sidebar gets displayed when user is
    //   // under `config` directory.
    //   '/config/': [
    //     {
    //       text: 'Config',
    //       items: [
    //         // This shows `/config/index.md` page.
    //         { text: 'Index', link: '/config/' }, // /config/index.md
    //         { text: 'Three', link: '/config/three' }, // /config/three.md
    //         { text: 'Four', link: '/config/four' } // /config/four.md
    //       ]
    //     }
    //   ]
    // }
  }
})
