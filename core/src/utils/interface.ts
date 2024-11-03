export type Many<T> = T | readonly T[];

export type PropertyName = string | number | symbol | undefined;
export type PropertyPath = Many<PropertyName>;

