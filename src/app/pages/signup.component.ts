import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCredentials } from '../models/auth.model';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  showPassword: boolean = false;

  loginCredentials: AuthCredentials = {
    username: '',
    email: '',
    password: '',
  };

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.minLength(4),
      Validators.required,
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    // console.log(this.loginCredentials);
    this.loginForm.value;
    console.log(
      '🚀 ~ file: signup.component.ts:43 ~ SignupComponent ~ onSubmit ~ this.loginForm.value:',
      this.loginForm.value
    );
  }
}
