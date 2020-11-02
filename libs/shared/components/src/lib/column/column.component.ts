import { ChangeDetectionStrategy, Component, Input, ɵComponentDef as ComponentDef, ɵɵclassMap as classMap, Type } from '@angular/core';
import { Interpolation, css } from '@biff/styling-core';
import { StyledBase } from '../styled-base/styled-base.directive';

export enum Spacing {
  Giant = 'giant',
  Huge = 'huge',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  Tiny = 'tiny',
  Zero = 'zero',
}

const spacingScale = {
  giant: '4rem',
  huge: '2rem',
  large: '1.5rem',
  medium: '1rem',
  small: '0.5rem',
  tiny: '0.25rem',
  zero: '0rem',
};

export const getSpacingSize = (spacing: Spacing) => {
  return spacingScale[spacing];
};

const getGapStyles = (spacing: Spacing) => {
  return {
    '& > *:not(:last-child)': {
      marginBottom: getSpacingSize(spacing),
    },
  };
};

const baseStyles: Interpolation = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};

const getStyles = ({ gap }: ColumnComponent): Interpolation => {
  return [baseStyles, getGapStyles(gap)];
};

export function ElementStyles<T>(fn: (comp: T) => Interpolation) {
  return (componentType: Type<T>) => {
    Promise.resolve().then(() => {
      const componentDef = componentType['ɵcmp'];
      const originalHostBindings = componentDef.hostBindings;

      function setHostStyles(rf, ctx) {
        if (originalHostBindings) {
          originalHostBindings(rf, ctx);
        }

        if (rf & 2) {
          classMap(css(fn(ctx)));
        }
      }

      componentDef.hostBindings = setHostStyles;
    });
  };
}

@Component({
  selector: 'biff-column',
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@ElementStyles(getStyles)
export class ColumnComponent {
  @Input()
  get gap() {
    return this._gap;
  }
  set gap(gap: Spacing) {
    this._gap = gap;
  }
  private _gap = Spacing.Large;
}
// @Component({
//   selector: 'biff-column',
//   template: ` <ng-content></ng-content> `,
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ColumnComponent extends StyledBase {
//   @Input()
//   get gap() {
//     return this._gap;
//   }
//   set gap(gap: Spacing) {
//     this._gap = gap;
//   }
//   private _gap = Spacing.Large;

//   protected _getHostStyles() {
//     // return null;
//     return getStyles(this);
//   }
// }
