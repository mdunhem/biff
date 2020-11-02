import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'biff-row',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./row.component.scss']
})
export class RowComponent {}
