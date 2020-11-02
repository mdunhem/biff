import { Component } from '@angular/core';

@Component({
  selector: 'biff-root',
  template: `
    <biff-app-layout>
      <router-outlet></router-outlet>
    </biff-app-layout>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'house-docs';
}
