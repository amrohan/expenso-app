import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = environment.backend.ApiUrl;

  private http = inject(HttpClient);

  GetCategoryByUserId(userId: string): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(
      `${this.baseUrl}/api/category/user/${userId}`,
      { withCredentials: true }
    );
  }

  CreateCategory(category: Category): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(
      `${this.baseUrl}/api/category`,
      category,
      { withCredentials: true }
    );
  }

  GetCategoryById(id: string): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(
      `${this.baseUrl}/api/category/${id}`,
      { withCredentials: true }
    );
  }

  UpdateCategory(category: Category): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(
      `${this.baseUrl}/api/category`,
      category,
      { withCredentials: true }
    );
  }

  DeleteCategory(id: string): Observable<ApiResponse<Category>> {
    return this.http.delete<ApiResponse<Category>>(
      `${this.baseUrl}/api/category/${id}`,
      { withCredentials: true }
    );
  }
}
