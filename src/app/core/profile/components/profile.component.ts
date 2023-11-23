import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { profile as ProfileType } from '../profile.types';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [ProfileService]
})
export class ProfileComponent {
  private profile: ProfileType = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    role: {
      _id: '',
      name: '',
      createdAt: '',
      __v: 0
    },
    createdAt: '',
    __v: 0
  }

  constructor(private service: ProfileService) {
    this.service.profile$.subscribe((user: ProfileType | null) => {
      if (user) this.profile = user
    })
  }

  get email() {
    return this.profile.email
  }
}
