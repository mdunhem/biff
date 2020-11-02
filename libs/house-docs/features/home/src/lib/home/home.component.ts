import { Component } from '@angular/core';

@Component({
  selector: 'biff-home',
  template: `
    <biff-column [gap]="_columnGap">
      <button mat-raised-button color="primary" (click)="draw()">Draw</button>
      <biff-canvas [draw]="_draw"></biff-canvas>
    </biff-column>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  _draw = false;

  _columnGap = 'huge';

  constructor() {
    setTimeout(() => this._columnGap = 'small', 4000);
  }

  draw() {
    this._draw = !this._draw;
  }
}
