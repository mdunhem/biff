import { Directive, HostBinding } from '@angular/core';
import { css, Interpolation } from '@biff/styling-core';

@Directive()
export abstract class StyledBase {
  protected abstract _getHostStyles(): Interpolation | null;

  @HostBinding('class')
  get __getHostClasses() {
    const hostClasses = this._getHostStyles();
    return hostClasses ? css(hostClasses) : null;
  }
}
