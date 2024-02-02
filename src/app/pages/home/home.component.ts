import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../components/layout.component';
import { Router, RouterLink } from '@angular/router';
import {
  Transaction,
  TransactionByUsers,
} from '../../models/transactions.model';
import { TransactionService } from '../../services/transaction.service';
import { CategoryService } from '../../services/category.service';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { AccountPipe } from '../../account.pipe';
import { CategoryPipe } from '../../category.pipe';
import { Category } from '../../models/category.model';
import { Account } from '../../models/account.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/response.model';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    RouterLink,
    AccountPipe,
    CategoryPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  isMenu: boolean = false;
  date: Date = new Date();
  categoryList: Category[] = [];
  accountList: Account[] = [];
  transactions: TransactionByUsers = {
    summary: {
      totalExpense: 0,
      totalIncome: 0,
    },
    transaction: [],
  };

  private readonly router = inject(Router);
  private readonly transactionService = inject(TransactionService);
  private readonly categoryService = inject(CategoryService);
  private readonly accountService = inject(AccountService);
  private readonly authService = inject(AuthService);

  data: Transaction[] = [];
  transaction$: Observable<ApiResponse<TransactionByUsers>>;

  ngOnInit(): void {
    if (this.authService.GetUserId() === null) {
      return;
    }

    // get month and year from local storage
    if (
      localStorage.getItem('month') === null ||
      localStorage.getItem('year') === null
    ) {
      this.getMonthandYear();
    } else {
      const m = localStorage.getItem('month');
      const y = localStorage.getItem('year');
      this.getUserTransactions(m!, y!);
      this.date = new Date(parseInt(y!), parseInt(m!) - 1);
    }

    this.getAllCategoryAndAccount(this.authService.GetUserId()!);
  }

  // Functions

  navigateUser(value: number) {
    this.isMenu = !this.isMenu;

    const type = value === 1 ? 'expense' : 'income';
    this.router.navigate(['/add'], { queryParams: { type: type } });
  }

  getAllCategoryAndAccount(userId: string) {
    this.categoryService.GetCategoryByUserId(userId).subscribe({
      next: (res) => {
        this.categoryList = res.data;
      },
      error: (err) => {},
    });

    this.accountService.GetAccountByUserId(userId).subscribe({
      next: (res) => {
        this.accountList = res.data;
      },
      error: (err) => {},
    });
  }

  getUserTransactions(month: string, year: string) {
    if (this.authService.GetUserId() === null) {
      return;
    }

    this.transactionService
      .GetCurrentTransactionByUserID(month, year, this.authService.GetUserId()!)
      .subscribe({
        next: (res) => {
          this.transactions = res.data;
          console.log(
            '🚀 ~ file: home.component.ts:102 ~ HomeComponent ~ getUserTransactions ~ res:',
            res
          );
        },
        error: (err) => {
          console.log(
            '🚀 ~ file: home.component.ts:95 ~ HomeComponent ~ getUserTransactions ~ err:',
            err
          );
        },
      });
  }

  getMonthandYear() {
    this.date = new Date(this.date);
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    localStorage.setItem('month', month.toString());
    localStorage.setItem('year', year.toString());
    this.getUserTransactions(month.toString(), year.toString());
  }
}
