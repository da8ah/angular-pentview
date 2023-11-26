import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { profile as ProfileType, putProfile } from '../profile.types';
import { ProfileService } from '../services/profile.service';
import { validateProfileUpdate } from '../../../../utils/validations';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [ProfileService]
})
export class ProfileComponent {
  protected profile: ProfileType = {
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
    this.service.profile$.subscribe((profile: ProfileType | null) => {
      if (profile) this.profile = profile
    })
  }

  protected get pfp() {
    return this.profile.profileImage || 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';
  }

  onUpdate(form: NgForm) {
    if (validateProfileUpdate(form.value as putProfile)) this.service.putProfile(form.value)
  }

}
