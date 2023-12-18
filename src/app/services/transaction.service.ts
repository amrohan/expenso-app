import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transactions.model';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = environment.backend.ApiUrl;

  private http = inject(HttpClient);

  /**
   * @param month
   * @param year
   * @returns transaction array by month
   */
  GetTransactionByMonthandYear(
    month: string,
    year: string
  ): Observable<ApiResponse<Transaction[]>> {
    return this.http.get<ApiResponse<Transaction[]>>(
      `${this.baseUrl}/api/transaction/${month}-${year}`,
      { withCredentials: true }
    );
  }

  GetCurrentTransactionByUserID(
    month: string,
    year: string,
    userId: string
  ): Observable<ApiResponse<Transaction[]>> {
    return this.http.get<ApiResponse<Transaction[]>>(
      `${this.baseUrl}/api/transaction/u/${month}-${year}-${userId}`,
      { withCredentials: true }
    );
  }

  GetTransactionByID(id: string): Observable<ApiResponse<Transaction>> {
    return this.http.get<ApiResponse<Transaction>>(
      `${this.baseUrl}/api/transaction/${id}`,
      { withCredentials: true }
    );
  }

  CreateTransaction(
    transaction: Transaction
  ): Observable<ApiResponse<Transaction>> {
    return this.http.post<ApiResponse<Transaction>>(
      `${this.baseUrl}/api/transaction`,
      transaction,
      { withCredentials: true }
    );
  }

  UpdateTransaction(
    transaction: Transaction
  ): Observable<ApiResponse<Transaction>> {
    return this.http.put<ApiResponse<Transaction>>(
      `${this.baseUrl}/api/transaction`,
      transaction,
      { withCredentials: true }
    );
  }

  DeleteTransaction(id: string): Observable<ApiResponse<Transaction>> {
    return this.http.delete<ApiResponse<Transaction>>(
      `${this.baseUrl}/api/transaction/${id}`,
      { withCredentials: true }
    );
  }
}
