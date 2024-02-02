import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AuthCredentials } from '../models/auth.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.backend.ApiUrl;

  private user = signal<User>({
    id: '',
    username: '',
    name: '',
    email: '',
  });

  private http = inject(HttpClient);

  LoginUser(user: AuthCredentials): Observable<ApiResponse<AuthCredentials>> {
    return this.http
      .post<ApiResponse<AuthCredentials>>(`${this.baseUrl}/login`, user, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', JSON.stringify(response.data));
        })
      );
  }

  RegisterUser(
    user: AuthCredentials
  ): Observable<ApiResponse<AuthCredentials>> {
    return this.http.post<ApiResponse<AuthCredentials>>(
      `${this.baseUrl}/register`,
      user,
      {
        withCredentials: true,
      }
    );
  }

  LogoutUser() {
    this.http.post<ApiResponse<AuthCredentials>>(
      `${this.baseUrl}/logout`,
      {},
      {}
    );

    localStorage.removeItem('token');
  }

  ResetPassword(email: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/reset-password`,
      { email },
      {}
    );
  }

  IsAuthenticated() {
    let value = false;
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp) {
        if (decoded.exp * 1000 > Date.now()) {
          value = true;
        }
      }
    }
    return value;
  }

  GetUserId() {
    let userId;
    let token = localStorage.getItem('token');
    if (token) {
      userId = jwtDecode(token)?.sub;
    }
    return userId;
  }
}
