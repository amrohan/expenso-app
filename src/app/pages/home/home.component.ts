import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../components/layout.component';
import { Router, RouterLink } from '@angular/router';
import { Transaction } from '../../models/transactions.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LayoutComponent, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  isMenu: boolean = false;

  private readonly router = inject(Router);

  data: Transaction[] = [
    {
      id: '1',
      title: 'Salary',
      categoryId: 'Food',
      amount: 269,
      date: new Date(),
      userId: '1',
      type: 'Income',
      accountId: 'Kotak',
    },
    {
      id: '2',
      title: 'Pizza',
      categoryId: 'Food',
      amount: 100,
      date: new Date(),
      userId: '1',
      type: 'Expense',
      accountId: 'Paytm',
    },
    {
      id: '3',
      title: 'Shawrma',
      categoryId: 'Food',
      amount: 100,
      date: new Date(),
      userId: '1',
      type: 'Expense',
      accountId: 'Paytm',
    },
    {
      id: '4',
      title: 'Metro',
      categoryId: 'Transportation',
      amount: 30,
      date: new Date(),
      userId: '1',
      type: 'Expense',
      accountId: 'Paytm',
    },
    {
      id: '5',
      title: 'Rent',
      categoryId: 'Rent',
      amount: 1000,
      date: new Date(),
      userId: '1',
      type: 'Expense',
      accountId: 'Paytm',
    },
    {
      id: '6',
      title: 'Rent',
      categoryId: 'Rent',
      amount: 1000,
      date: new Date(),
      userId: '1',
      type: 'Expense',
      accountId: 'Paytm',
    },
    {
      id: '7',
      title: 'Rent',
      categoryId: 'Rent',
      amount: 1000,
      date: new Date(),
      userId: '1',
      type: 'Expense',
      accountId: 'Paytm',
    },
    {
      id: '8',
      title: 'Rent',
      categoryId: 'Rent',
      amount: 1000,
      date: new Date(),
      userId: '1',
      type: 'Expense',
      accountId: 'Paytm',
    },
  ];

  // Functions

  navigateUser(value: number) {
    this.isMenu = !this.isMenu;

    const type = value === 1 ? 'expense' : 'income';
    this.router.navigate(['/add'], { queryParams: { type: type } });
  }
}
