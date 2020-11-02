import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedCanvasModule } from '@biff/shared/canvas';
import { RowModule, ColumnModule } from '@biff/shared/components';

export const houseDocsFeaturesHomeRoutes: Route[] = [
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(houseDocsFeaturesHomeRoutes),
    MatButtonModule,
    SharedCanvasModule,
    RowModule,
    ColumnModule,
  ],
  declarations: [HomeComponent],
})
export class HouseDocsFeaturesHomeModule {}
