import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './column.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ColumnComponent],
  exports: [ColumnComponent],
})
export class ColumnModule {}
