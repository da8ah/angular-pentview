import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockingComponent } from './components/clocking.component';
import { ClockService } from '../../base/services/clock.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClockingComponent
  ],
  providers: [ClockService]
})
export class ClockingModule { }
