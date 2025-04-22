import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Form表单工具',
  icon: '/light-logo.png',
  logo: {
    light: '/light-logo.png',
    dark: '/light-logo.png',
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
