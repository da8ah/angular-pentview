import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private service: AuthService, private router: Router) { }

  onLogin(form: NgForm) {
    // if (this.validate(username, password))
    console.log(form.value)
    if (this.service.login(form.value))
      this.router.navigateByUrl('/dashboard');
  }
}
