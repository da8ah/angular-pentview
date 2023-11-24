import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DialogComponent } from './dialog/dialog.component';
import { ClockService } from './services/clock.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogComponent,
    NavComponent,
    NotFoundComponent
  ],
  providers: [ClockService]
})
export class BaseModule { }
