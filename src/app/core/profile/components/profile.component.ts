import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { map } from 'rxjs';
import { user } from '../profile.types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [ProfileService]
})
export class ProfileComponent {
  private user: user = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    role: { name: '' }
  }

  constructor(private service: ProfileService) {
    this.service.user$.subscribe((user: user | null) => {
      if (user) this.user = user
    })
  }

  get email() {
    return this.user.email
  }
}
