import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCredentials } from '../models/auth.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  inputValue: string = '';
  userCredentials: AuthCredentials = {
    username: '',
    email: '',
    password: '',
  };

  userInfo: User;

  isErrorMessage: boolean = false;
  validationInfo = 'abc';

  private auth = inject(AuthService);

  ngOnInit(): void {
    this.auth.IsAuthenticated();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  showErrorMessage(msg: string) {
    this.isErrorMessage = !this.isErrorMessage;
    this.validationInfo = msg;
  }

  onSubmit() {
    this.auth.LoginUser(this.userCredentials).subscribe({
      next: (res) => {},
      error: (error) => {
        if (error.status === 404) {
          this.showErrorMessage('User not found');
        } else {
          this.showErrorMessage(error.error.message);
        }
      },
    });
  }

  updateUserCredentials() {
    if (this.inputValue.includes('@')) {
      this.userCredentials.email = this.inputValue.trim();
      this.userCredentials.username = '';
    } else {
      this.userCredentials.username = this.inputValue.trim();
      this.userCredentials.email = '';
    }
  }
}
