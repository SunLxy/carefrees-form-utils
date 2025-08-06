/**
 * @description [从lodash中搬了部分需要的代码块](https://www.lodashjs.com/)
 */

import { toKey, isObject, castPath, assignValue, isIndex } from './utils';
import { PropertyPath } from './interface';

/**
 * The base implementation of `set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object: any, path: PropertyPath, value: any, customizer?: Function) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  // 一般都是数组，或者对象进行处理，其他的不进行处理

  const length = path.length;
  const lastIndex = length - 1;

  let index = -1;
  let nested = object;

  while (nested != null && ++index < length) {
    const key = toKey(path[index]);
    let newValue = value;

    if (index !== lastIndex) {
      const objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        // 对数据进行数组还是对象进行判断处理
        if (Array.isArray(objValue)) {
          newValue = [...objValue];
        } else if (objValue !== null && Object.prototype.toString.call(objValue) === '[object Object]') {
          newValue = { ...objValue };
        } else {
          newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
        }
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @see has, hasIn, get, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * set(object, 'a[0].b.c', 4)
 * console.log(object.a[0].b.c)
 * // => 4
 *
 * set(object, ['x', '0', 'y', 'z'], 5)
 * console.log(object.x[0].y.z)
 * // => 5
 */
export function set<T = any>(object: T, path: PropertyPath, value: any): T {
  return object == null ? object : baseSet(object, path, value);
}
