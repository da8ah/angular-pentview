import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
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
    this.service.login(form.value).subscribe(auth => {
      auth && this.router.navigateByUrl('/dashboard');
    })
  }
}
