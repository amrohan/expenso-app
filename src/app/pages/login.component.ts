import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCredentials } from '../models/auth.model';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { ToastService } from '../services/toast.service';

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
  isLoading = false;

  userCredentials: AuthCredentials = {
    username: '',
    email: '',
    password: '',
  };

  userInfo: User;

  isErrorMessage: boolean = false;
  validationInfo = '';

  private auth = inject(AuthService);
  private route = inject(Router);
  private toast = inject(ToastService);

  ngOnInit(): void {
    if (this.auth.IsAuthenticated()) {
      this.route.navigate(['/']);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  showErrorMessage(msg: string) {
    this.isErrorMessage = !this.isErrorMessage;
    this.validationInfo = msg;
  }

  onSubmit() {
    this.isLoading = !this.isLoading;
    this.auth.LoginUser(this.userCredentials).subscribe({
      next: (res) => {
        this.isLoading = !this.isLoading;
        this.toast.Success('Login successful');
        if (res.status === 200) {
          this.route.navigate(['/']);
          return;
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this.showErrorMessage('User not found');
        } else {
          this.showErrorMessage(error.error.message);
        }
        this.toast.Error('Login failed');
        this.isLoading = !this.isLoading;
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
