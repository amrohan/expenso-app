import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../components/layout.component';
import { Router, RouterLink } from '@angular/router';
import { Transaction } from '../../models/transactions.model';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    RouterLink,
    AccountPipe,
    CategoryPipe,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  isMenu: boolean = false;
  categoryList: Category[] = [];

  accountList: Account[] = [];

  private readonly router = inject(Router);
  private readonly transactionService = inject(TransactionService);
  private readonly categoryService = inject(CategoryService);
  private readonly accountService = inject(AccountService);
  private readonly authService = inject(AuthService);

  data: Transaction[] = [];
  transaction$: Observable<ApiResponse<Transaction[]>>;
  ngOnInit(): void {
    this.transaction$ = this.transactionService.GetCurrentTransactionByUserID(
      '12',
      '2023',
      this.authService.GetUserId()!
    );

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
}
