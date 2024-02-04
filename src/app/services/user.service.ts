import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, cloudinary } from '../models/user.model';
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
  CheckUserName(username: string): Observable<ApiResponse<string>> {
    return this.http.get<ApiResponse<string>>(
      `${this.baseUrl}/api/user/u/${username}`,
      {
        withCredentials: true,
      }
    );
  }

  UploadProfileImage(img: File): Observable<cloudinary> {
    const uploadPreset = 'Images';
    const formData = new FormData();
    formData.append('file', img);

    return this.http.post<cloudinary>(
      `https://api.cloudinary.com/v1_1/amrohan/image/upload?upload_preset=${uploadPreset}`,
      formData
    );
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
