import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../components/layout.component';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LayoutComponent, FormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userService = inject(UserService);
  auth = inject(AuthService);

  usernameExists: string = '';
  user: User;
  defaultUsername: string = '';

  ngOnInit(): void {
    this.getUser(this.auth.GetUserId()!);
  }

  updateUser() {
    this.userService.UpdateUser(this.user).subscribe({
      next: (user) => {
        console.log(user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  checkUserName(event: Event) {
    if (this.user.username === '') {
      console.log('Username is required');
      return;
    }
    if (this.defaultUsername === this.user.username) {
      this.usernameExists = '';
      return;
    }

    this.userService.CheckUserName(this.user.username).subscribe({
      next: (user) => {
        if (user.status === 200) {
          this.usernameExists = user.message;
        } else {
          this.usernameExists = user.message;
          console.log('Username is not available');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUser(id: string) {
    this.userService.GetUserById(id).subscribe({
      next: (user) => {
        this.user = user.data;
        this.defaultUsername = user.data.username;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];

    this.userService.UploadProfileImage(file).subscribe({
      next: (res) => {
        console.log(res);
        this.user.imageUrl = res.secure_url;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
