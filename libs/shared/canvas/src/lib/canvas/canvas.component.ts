import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'biff-canvas',
  template: `
    <canvas #canvas width="600" height="300"></canvas>
  `,
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  @Input()
  get draw(): boolean {
    return this._shouldDraw;
  }
  set draw(draw: boolean) {
    this._shouldDraw = coerceBooleanProperty(draw);

    if (this._shouldDraw) {
      this._draw();
    } else {
      this._clear();
    }
  }
  private _shouldDraw = false;

  private _ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this._ctx = this.canvas.nativeElement.getContext('2d');
  }

  private _draw() {
    if (this._ctx) {
      this._ctx.fillStyle = 'green';
      this._ctx.fillRect(10, 10, 150, 100);
    }
  }

  private _clear() {
    if (this._ctx) {
      this._ctx.clearRect(10, 10, 150, 100);
    }
  }
}
