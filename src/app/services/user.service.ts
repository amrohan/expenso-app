import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.backend.ApiUrl;

  private http = inject(HttpClient);

  GetUserById(id: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/api/user/${id}`, {
      withCredentials: true,
    });
  }

  UpdateUser(user: User): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.baseUrl}/api/user`, user, {
      withCredentials: true,
    });
  }

  // DeleteUser(id: string): Observable<ApiResponse<User>> {
  //   return this.http.delete<ApiResponse<User>>(
  //     `${this.baseUrl}/api/user/${id}`,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // }
}
