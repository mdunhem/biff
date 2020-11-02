import { Component } from '@angular/core';

@Component({
  selector: 'biff-home',
  template: `
    <button mat-raised-button color="primary" (click)="draw()">Draw</button>
    <biff-canvas [draw]="_draw"></biff-canvas>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  _draw = false;

  draw() {
    this._draw = !this._draw;
  }
}
