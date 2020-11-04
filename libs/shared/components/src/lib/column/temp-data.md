import { Type, ɵComponentDef as ComponentDef, ɵRenderFlags as RenderFlags, ɵɵclassMap as classMap } from '@angular/core';
import { css } from './create-emotion';

export type ClassNames<T> = { [key in keyof T]: string };

export interface ElementStylesConfig {
  classNamesProperty?: string;
  styles: any;
}

const CLASS_NAMES_KEY = '__ccp_class_names_key__';

export function createClassNames<T>(styles: T): ClassNames<T> {
  // @ts-ignore
  const classnames: ClassNames<T> = {};

  for (const key of Object.keys(styles)) {
    classnames[key] = '';
  }

  classnames[CLASS_NAMES_KEY] = true;

  return classnames;
}

export function createClassNames2<T>(styles: T, target: any): ClassNames<T> {
  console.log({ target });
  // @ts-ignore
  const classnames: ClassNames<T> = {};

  for (const key of Object.keys(styles)) {
    classnames[key] = '';
  }

  Object.defineProperty(classnames, CLASS_NAMES_KEY, { value: '' });

  return classnames;
}

function getClassNamesProperty<T extends { [props in keyof T]: Object }>(instance: T) {
  let prop: string = null;

  for (const key of Object.getOwnPropertyNames(instance)) {
    if (instance[key] && instance[key].hasOwnProperty(CLASS_NAMES_KEY)) {
      prop = key;
      break;
    }
  }

  return prop;
}

export function ElementStyles({ styles }: ElementStylesConfig) {
  return (componentDef: ComponentDef<any>) => {
    const originalHostBindings = componentDef.hostBindings;

    console.log({ componentDef });

    function setHostStyles(rf: RenderFlags, ctx: any) {
      if (originalHostBindings) {
        originalHostBindings(rf, ctx);
      }

      // tslint:disable-next-line:no-bitwise
      if (rf & RenderFlags.Update) {
        const classnames: Partial<ClassNames<typeof styles>> = {};
        const classNamesProperty = getClassNamesProperty(ctx);

        for (const key of Object.keys(styles)) {
          const isHost = key === 'host';

          let childStyles = styles[key]
          childStyles = Array.isArray(childStyles) ? childStyles : [childStyles]
          childStyles = childStyles.map((s: any) =>
            typeof s === 'function' ? s(ctx) : s,
          )

          const serialized = css(childStyles);

          classnames[key] = serialized;

          if (isHost) {
            classMap(serialized);
          }
        }

        if (classNamesProperty) {
          ctx[classNamesProperty] = { ...ctx[classNamesProperty], ...classnames };
        }
      }
    }

    // @ts-ignore
    componentDef['hostBindings'] = setHostStyles;

    if (!!styles.host) {
      // @ts-ignore
      componentDef['hostVars'] += 2;
    }
  }
}

export function ElementStyles2<T>({ styles }: ElementStylesConfig) {
  return (componentType: Type<T>) => {
    const originalDoCheck = componentType.prototype.ngDoCheck;

    componentType.prototype.ngDoCheck = function() {
      if (originalDoCheck) {
        originalDoCheck.call(this);
      }

      const classnames: Partial<ClassNames<typeof styles>> = {};
      const classNamesProperty = getClassNamesProperty(this);

      for (const key of Object.keys(styles)) {
        const isHost = key === 'host';

        let childStyles = styles[key]
        childStyles = Array.isArray(childStyles) ? childStyles : [childStyles]
        childStyles = childStyles.map((s: any) =>
          typeof s === 'function' ? s(this) : s,
        )

        const serialized = css(childStyles);

        classnames[key] = serialized;

        if (isHost) {
          classMap(serialized);
        }
      }

      if (classNamesProperty) {
        this[classNamesProperty] = { ...this[classNamesProperty], ...classnames };
      }
    }
  };
}

export function ElementStyles2Feature({ styles }: ElementStylesConfig) {
  return (componentDef: ComponentDef<any>) => {
    const originalDoCheck = componentDef.type.prototype.ngDoCheck;

    componentDef.type.prototype.ngDoCheck = function() {
      if (originalDoCheck) {
        originalDoCheck.call(this);
      }

      const classnames: Partial<ClassNames<typeof styles>> = {};
      const classNamesProperty = getClassNamesProperty(this);

      for (const key of Object.keys(styles)) {
        const isHost = key === 'host';

        let childStyles = styles[key]
        childStyles = Array.isArray(childStyles) ? childStyles : [childStyles]
        childStyles = childStyles.map((s: any) =>
          typeof s === 'function' ? s(this) : s,
        )

        const serialized = css(childStyles);

        classnames[key] = serialized;

        if (isHost) {
          classMap(serialized);
        }
      }

      if (classNamesProperty) {
        this[classNamesProperty] = { ...this[classNamesProperty], ...classnames };
      }
    }
  };
}

// export function ElementStyles<T>({ classNamesProperty, styles }: ElementStylesConfig<T>) {
//   return (componentDef: ComponentDef<T>) => {
//     const originalHostBindings = componentDef.hostBindings;
//     let currentHostClass: string | null = null;
//
//     function setHostStyles(rf, ctx) {
//       if (originalHostBindings) {
//         originalHostBindings(rf, ctx);
//       }
//
//       // console.log({ rf, ctx });
//       //
//       // const classnames: Partial<ClassNames<typeof styles>> = {};
//       //
//       // for (const key of Object.keys(styles)) {
//       //   let childStyles = styles[key]
//       //   childStyles = Array.isArray(childStyles) ? childStyles : [childStyles]
//       //   childStyles = childStyles.map((s: any) =>
//       //     typeof s === 'function' ? s(ctx) : s,
//       //   )
//       //
//       //   classnames[key] = css(childStyles);
//       //
//       //   console.log(classnames[key], childStyles);
//       // }
//
//       // tslint:disable-next-line:no-bitwise
//       // if (rf & RenderFlags.Create) {
//       //   const serialized = classnames['host'];
//       //   if (serialized && currentHostClass !== serialized) {
//       //     console.log('about to set in init', currentHostClass, serialized);
//       //     classMap(serialized);
//       //     currentHostClass = serialized;
//       //   }
//       //
//       //   if (classNamesProperty) {
//       //     ctx[classNamesProperty] = classnames;
//       //   }
//       // }
//
//       // tslint:disable-next-line:no-bitwise
//       if (rf & RenderFlags.Update) {
//         // const serialized = classnames['host'];
//         // if (serialized && currentHostClass !== serialized) {
//         //   // if (!hasBeenInit) {
//         //   //   // @ts-ignore
//         //   //   componentDef['hostVars']++;
//         //   // }
//         //
//         //   console.log('about to set in update', currentHostClass, serialized);
//         //   classMap(serialized);
//         //   currentHostClass = serialized;
//         //
//         //   hasBeenInit = true;
//         // }
//         const classnames: Partial<ClassNames<typeof styles>> = {};
//
//         for (const key of Object.keys(styles)) {
//           const isHost = ['host', ':host'].includes(key)
//
//           let childStyles = styles[key]
//           childStyles = Array.isArray(childStyles) ? childStyles : [childStyles]
//           childStyles = childStyles.map((s: any) =>
//             typeof s === 'function' ? s(ctx) : s,
//           )
//
//           const serialized = css(childStyles);
//
//           classnames[key] = serialized;
//
//           if (isHost) {
//             classMap(serialized);
//           }
//         }
//
//         if (classNamesProperty) {
//           ctx[classNamesProperty] = classnames;
//         }
//       }
//     }
//
//     // @ts-ignore
//     componentDef['hostBindings'] = setHostStyles;
//
//     if (!!styles.host) {
//       // @ts-ignore
//       componentDef['hostVars'] += 2;
//     }
//   }
// }

// export function ElementStyles<T>({ classNamesProperty, fn, styles }: ElementStylesConfig<T>) {
//   return (type: Type<T>) => {
//     Promise.resolve().then(() => {
//       const elementDef = type[ɵNG_COMP_DEF] || type[ɵNG_DIR_DEF];
//       const originalHostBindings = elementDef.hostBindings;
//
//       function setHostStyles(rf, ctx) {
//         if (originalHostBindings) {
//           originalHostBindings(rf, ctx);
//         }
//
//         // tslint:disable-next-line:no-bitwise
//         if (rf & 1) {
//           const classnames: any = {};
//
//           for (const key of Object.keys(styles)) {
//             const isHost = ['host', ':host'].includes(key)
//
//             // @ts-ignore
//             let childStyles = styles[key]
//             childStyles = Array.isArray(childStyles) ? childStyles : [childStyles]
//             childStyles = childStyles.map((s: any) =>
//               typeof s === 'function' ? s(ctx) : s,
//             )
//
//             const serialized = css(childStyles);
//
//             // @ts-ignore dynamic index types are not supported by TS 3.4
//             classnames[key] = serialized;
//
//             console.log(classnames[key], childStyles);
//
//             if (isHost) {
//               classMap(serialized);
//             }
//           }
//
//           // const className = css(fn(ctx));
//           // classMap(className);
//
//           if (classNamesProperty) {
//             ctx[classNamesProperty] = classnames;
//           }
//         }
//       }
//
//       elementDef.hostBindings = setHostStyles;
//     });
//   };
// }

import { ɵComponentDef as ComponentDef, Type } from '@angular/core';

export interface ComponentDefFeature {
  <T>(componentDef: ComponentDef<T>): void;
  /**
   * Marks a feature as something that {@link InheritDefinitionFeature} will
   * execute during inheritance.
   *
   * NOTE: DO NOT SET IN ROOT OF MODULE! Doing so will result in
   * tree-shakers/bundlers identifying the change as a side effect, and the
   * feature will be included in every bundle.
   */
  ngInherit?: true;
}

export type ComponentDefFeatures = ReadonlyArray<ComponentDefFeature>;

export function ComponentFeatures(features: ComponentDefFeatures) {
  return <T>(componentType: Type<T>) => {
    Promise.resolve().then(() => {
      const componentDef = componentType['ɵcmp'];

      if (componentDef === undefined) {
        throw new Error('Ivy is not enabled.');
      }

      componentDef.features = componentDef.features || [];
      componentDef.features = [...componentDef.features, ...features];

      features.forEach(feature => feature(componentDef));
    });
  };
}


import { ClassNames, ComponentFeatures, createClassNames, ElementStyles2Feature } from '@ccp/shared-styled';

@ComponentFeatures([ElementStyles2Feature({ styles })])
export class FooContainer {
  classNames: ClassNames<typeof styles> = createClassNames(styles);
}
