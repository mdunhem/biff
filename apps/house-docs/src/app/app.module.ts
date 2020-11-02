import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SharedCanvasModule } from '@biff/shared/canvas';
import { SharedLayoutModule } from '@biff/shared/layout';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {}),
    MatButtonModule,
    SharedLayoutModule,
    SharedCanvasModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
