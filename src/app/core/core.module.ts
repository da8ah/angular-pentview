import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckingModule } from './checking/checking.module';
import { ProfileModule } from './profile/profile.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CheckingModule,
    ProfileModule,
    RolesModule,
    UsersModule
  ]
})
export class CoreModule { }
