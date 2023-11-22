import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { validateLogin } from '../../../../utils/validations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService]
})
export class LoginComponent {
  constructor(private service: AuthService, private router: Router) {
    this.service.isAuth$.pipe(tap(auth => auth)) && this.router.navigateByUrl('/dashboard')
  }

  onLogin(form: NgForm) {
    if (validateLogin(form.value)) {
      this.service.login(form.value).subscribe(auth => {
        auth && this.router.navigateByUrl('/dashboard')
      })
    }
    else console.log('No valid User ', form.value)
  }
}
