import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { validateLogin } from '../../../../utils/validations';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

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
  simbols = '~!@#$%^&*+-.,{}[;:?<>"_\\/\''
  isError = false

  constructor(private service: AuthService, private router: Router) {
    this.service.isAuth$.pipe(tap(auth => auth)) && this.router.navigateByUrl('/dashboard')
  }

  onLogin(form: NgForm) {
    if (validateLogin(form.value)) {
      this.isError = false
      this.service.login(form.value).subscribe(auth => {
        auth && this.router.navigateByUrl('/dashboard')
      })
    }
    else this.isError = true
  }
}
