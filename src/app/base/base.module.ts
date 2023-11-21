import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavComponent,
    NotFoundComponent
  ]
})
export class BaseModule { }
