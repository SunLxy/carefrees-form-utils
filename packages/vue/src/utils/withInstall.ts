
import type { Plugin, App } from 'vue';
export type SFCWithInstall<T> = T & Plugin;
export const withInstall = <T, E extends Record<string, any> = Record<string, any>, K extends Record<string, any> = Record<string, any>>(
  main: T,
  extra?: E,// 挂 hooks 之类的
  childComponents?: K,// 挂子组件
) => {
  ; (main as SFCWithInstall<T>).install = (app: App): void => {
    for (const comp of [main, ...Object.values(childComponents ?? {})]) {
      // 当组件是 script setup 的形式时，会自动以为文件名注册，会挂载到组件的__name 属性上
      // 所以要加上这个条件
      const name = (comp as any).name || (comp as any).__name;
      app.component(name, comp)
    }
  }
  if (childComponents) {
    for (const [key, comp] of Object.entries(childComponents)) {
      ; (main as any)[key] = comp
    }
  }
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ; (main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E & K
}
