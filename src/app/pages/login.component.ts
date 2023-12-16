import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCredentials } from '../models/auth.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  showPassword: boolean = false;

  inputValue: string = '';
  loginCredentials: AuthCredentials = {
    username: '',
    email: '',
    password: '',
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log(this.loginCredentials);
  }

  updateLoginCredentials() {
    if (this.inputValue.includes('@')) {
      this.loginCredentials.email = this.inputValue;
      this.loginCredentials.username = '';
    } else {
      this.loginCredentials.username = this.inputValue;
      this.loginCredentials.email = '';
    }
  }
}
