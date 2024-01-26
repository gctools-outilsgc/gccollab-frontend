import { Injectable } from '@angular/core';
import { default as translations } from 'src/assets/i18n/translations.en';

export function GenericClass<Props>(): new () => Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return class {} as any;
}

function concatIfExistsPath(path: string, suffix: string): string {
  return path ? `${path}.${suffix}` : suffix;
}

function transformObjectToPath<T extends object | string>(
  suffix: string,
  objectToTransformOrEndOfPath: T,
  path = '',
): T {
  return typeof objectToTransformOrEndOfPath === 'object'
    ? Object.entries(objectToTransformOrEndOfPath).reduce(
        (objectToTransform, [key, value]) => {
          objectToTransform[key as keyof T] = transformObjectToPath(
            key,
            value,
            concatIfExistsPath(path, suffix),
          );

          return objectToTransform;
        },
        {} as T,
      )
    : (concatIfExistsPath(path, suffix) as T);
}

@Injectable({
  providedIn: 'root',
})
export class Translations extends GenericClass<typeof translations>() {
  private static instance: Translations;

  private constructor() {
    super();
    Object.assign(this, transformObjectToPath('', translations));
  }

  public static getInstance(): Translations {
    if (!Translations.instance) {
      Translations.instance = new Translations();
    }
    return Translations.instance;
  }
}
