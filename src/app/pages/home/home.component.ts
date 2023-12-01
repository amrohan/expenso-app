import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../components/layout.component';
import { RouterLink } from '@angular/router';

export class transaction {
  _id: string
  title: string
  categoryId: string
  amount: number;
  date: Date | string
  userId: string
  type: string
  accountId: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LayoutComponent, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  data: transaction[] = [
    {
      _id: "1",
      title: 'Salary',
      categoryId: 'Food',
      amount: 269,
      date: new Date(),
      userId: '1',
      type: 'income',
      accountId: 'Kotak'
    },
    {
      _id: "2",
      title: 'Pizza',
      categoryId: 'Food',
      amount: 100,
      date: new Date(),
      userId: '1',
      type: 'expense',
      accountId: 'Paytm'
    }, {
      _id: "3",
      title: 'Shawrma',
      categoryId: 'Food',
      amount: 100,
      date: new Date(),
      userId: '1',
      type: 'expense',
      accountId: 'Paytm'
    },
    {
      _id: "4",
      title: 'Metro',
      categoryId: 'Transportation',
      amount: 30,
      date: new Date(),
      userId: '1',
      type: 'expense',
      accountId: 'Paytm'
    },


  ]

}

