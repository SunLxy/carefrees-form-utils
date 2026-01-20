import * as path from 'node:path';
import { defineConfig } from 'rspress/config';
import { pluginPreview } from '@rspress/plugin-preview';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/carefrees-form-utils/' : '/',
  root: path.join(__dirname, 'docs'),
  title: 'Form表单工具',
  icon: '/logo.png',
  globalStyles: path.join(__dirname, 'styles/index.css'),
  logo: {
    light: '/logo.png',
    dark: '/logo.png',
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/SunLxy/carefrees-form-utils',
      },
    ],
  },
  plugins: [pluginPreview({ defaultRenderMode: 'pure' }) as any],
  builderConfig: {
    html: {
      tags: [
        {
          tag: 'script',
          head: true,
          append: false,
          attrs: {
            src: 'https://fastly.jsdelivr.net/npm/live2d-widgets@0/autoload.js',
          },
        },
        {
          tag: 'style',
          children: `
          #waifu{ z-index:999999 } 
          #waifu-toggle{ z-index:999999;position:absolute; }
          `,
          head: true,
          append: false,
        },
      ],
    },
  },
});
