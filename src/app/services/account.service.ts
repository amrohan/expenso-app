import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/response.model';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = environment.backend.ApiUrl;

  private http = inject(HttpClient);

  GetAccountByUserId(userId: string): Observable<ApiResponse<Account[]>> {
    return this.http.get<ApiResponse<Account[]>>(
      `${this.baseUrl}/api/account/user/${userId}`,
      { withCredentials: true }
    );
  }

  CreateAccount(account: Account): Observable<ApiResponse<Account>> {
    return this.http.post<ApiResponse<Account>>(
      `${this.baseUrl}/api/account`,
      account,
      { withCredentials: true }
    );
  }

  GetAccountById(accountId: string): Observable<ApiResponse<Account>> {
    return this.http.get<ApiResponse<Account>>(
      `${this.baseUrl}/api/account/${accountId}`,
      { withCredentials: true }
    );
  }

  UpdateAccount(account: Account): Observable<ApiResponse<Account>> {
    return this.http.put<ApiResponse<Account>>(
      `${this.baseUrl}/api/account}`,
      account,
      { withCredentials: true }
    );
  }

  DeleteAccount(accountId: string): Observable<ApiResponse<Account>> {
    return this.http.delete<ApiResponse<Account>>(
      `${this.baseUrl}/api/account/${accountId}`,
      { withCredentials: true }
    );
  }
}
