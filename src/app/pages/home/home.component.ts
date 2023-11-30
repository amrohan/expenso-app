import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../components/layout.component';

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
  imports: [CommonModule, LayoutComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  data: transaction[] = [
    {
      _id: "abc9012",
      title: 'Burger',
      categoryId: 'Food',
      amount: 100,
      date: new Date(),
      userId: '1',
      type: 'income',
      accountId: 'Kotak'
    },
    {
      _id: "abc9022",
      title: 'Pizza',
      categoryId: 'Food',
      amount: 100,
      date: new Date(),
      userId: '1',
      type: 'income',
      accountId: 'Paytm'
    }

  ]

}

