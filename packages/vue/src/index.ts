import * as components from './component';
export * from './hooks';
export * from './component';
export * from './utils';
import { App } from 'vue';
export default {
  install: (app: App) => {
    for (const c in components) {
      app.use((components as any)[c]);
    }
  },
};
