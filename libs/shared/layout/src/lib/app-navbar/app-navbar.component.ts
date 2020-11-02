import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'biff-app-navbar',
  template: `
    <mat-toolbar color="primary">
      <button
        mat-icon-button
        class="example-icon"
        aria-label="Example icon-button with menu icon"
        (click)="menuToggle.emit()"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <span>My App</span>
    </mat-toolbar>
  `,
  styleUrls: ['./app-navbar.component.scss'],
})
export class AppNavbarComponent {
  @Output() menuToggle = new EventEmitter<void>();
}
