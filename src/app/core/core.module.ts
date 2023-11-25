import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClockingModule } from './clocking/clocking.module';
import { ProfileModule } from './profile/profile.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { ClockService } from '../base/services/clock.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClockingModule,
    ProfileModule,
    RolesModule,
    UsersModule
  ],
  providers: [ClockService]
})
export class CoreModule { }
