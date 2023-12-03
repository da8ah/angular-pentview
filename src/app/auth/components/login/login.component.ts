import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { patterns, validateLogin } from '../../../../utils/validations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatDividerModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService]
})
export class LoginComponent {
  readonly patterns = patterns
  simbols = patterns.User.PASSSIMB
  isError = false

  constructor(private service: AuthService, private router: Router) {
    this.service.isAuth$.subscribe(auth => {
      auth && this.router.navigateByUrl('/dashboard')
    })
  }

  onLogin(form: NgForm) {
    if (validateLogin(form.value)) {
      this.isError = false
      this.service.login(form.value)
    }
    else this.isError = true
  }
}
