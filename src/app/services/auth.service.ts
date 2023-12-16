import { Injectable, inject, signal } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Response } from '../models/response.model';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AuthCredentials } from '../models/auth.model';

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

  LoginUser(user: AuthCredentials): Observable<Response<AuthCredentials>> {
    return this.http
      .post<Response<AuthCredentials>>(`${this.baseUrl}/login`, user, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem(
            'access_token',
            JSON.stringify(response.data.token)
          );
        })
      );
  }

  RegisterUser(user: AuthCredentials): Observable<Response<AuthCredentials>> {
    return this.http.post<Response<AuthCredentials>>(
      `${this.baseUrl}/register`,
      user,
      {
        withCredentials: true,
      }
    );
  }

  IsAuthenticated() {
    let value = false;
    const token = localStorage.getItem('access_token');
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
}
