import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.backend.ApiUrl;

  private http = inject(HttpClient);

  GetUserById(id: string) {}
}
