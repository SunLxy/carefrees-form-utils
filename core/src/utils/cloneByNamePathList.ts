import { PropertyName } from "./interface"
import { get } from "./get"
import { set } from "./set"

/**获取路径数据*/
export function cloneByNamePathList(store: Record<string, any>, namePathList: PropertyName[]): Record<string, any> {
  let newStore = {};
  namePathList.forEach(namePath => {
    const value = get(store, namePath);
    newStore = set(newStore, namePath, value);
  });
  return newStore;
}