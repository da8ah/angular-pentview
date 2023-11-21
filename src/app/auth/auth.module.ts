import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    LoginComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }
