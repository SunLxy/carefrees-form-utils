import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/carefrees-form-utils/' : '/',
  root: path.join(__dirname, 'docs'),
  title: 'Form表单工具',
  icon: '/logo.jpg',
  logo: {
    light: '/logo.jpg',
    dark: '/logo.jpg',
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
});
