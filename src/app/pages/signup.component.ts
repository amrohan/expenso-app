import { Component, OnInit, inject, signal } from '@angular/core';
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
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  showPassword: boolean = false;
  isLoading = false;
  isErrorMessage: boolean = false;
  validationInfo = signal('');

  loginCredentials: AuthCredentials = {
    username: '',
    email: '',
    password: '',
  };

  private auth = inject(AuthService);
  private route = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.minLength(4),
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9]*$'),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  ngOnInit(): void {
    if (this.auth.IsAuthenticated()) {
      this.route.navigate(['/home']);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  showErrorMessage(msg: string) {
    this.isErrorMessage = !this.isErrorMessage;
    this.validationInfo.set(msg);
  }

  onSubmit() {
    const formValues = this.loginForm.getRawValue();

    this.loginCredentials.username = formValues.username!.trim();
    this.loginCredentials.email = formValues.email!.trim();
    this.loginCredentials.password = formValues.password!.trim();

    if (
      this.loginCredentials.username &&
      this.loginCredentials.email &&
      this.loginCredentials.password
    ) {
      this.isLoading = !this.isLoading;

      this.auth.RegisterUser(this.loginCredentials).subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.auth.LoginUser(this.loginCredentials).subscribe({
              next: (res) => {
                this.isLoading = !this.isLoading;
                this.route.navigate(['/home']);
              },
              error: (err) => {
                alert('Something went wrong');
                this.isLoading = !this.isLoading;
                this.showErrorMessage(err.error.message);
              },
            });
          }
        },
        error: (err) => {
          this.isLoading = !this.isLoading;
          this.showErrorMessage(err.error.message);
        },
      });
    }
  }
}
