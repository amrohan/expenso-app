import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../components/layout.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


export interface category {
  _id: string;
  name: string;
  icon: string

}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, LayoutComponent, RouterLink, FormsModule],
  templateUrl: './transaction.component.html',
  styles: ``
})
export class TransactionComponent {
  showCategory: boolean = false
  onSubmit() {
    console.log('submit');
  }

  // categoryList: category[] = []
  categoryList = [
    {
      _id: '1',
      name: ' Food & Drinks',
      icon: 'restaurant_menu'
    }, {
      _id: '2',
      name: ' Transportation',
      icon: 'train'
    },
    {
      _id: '3',
      name: ' Entertainment',
      icon: 'movie'
    }, {
      _id: '4',
      name: 'Bills & Fees',
      icon: 'receipt'
    }, {
      _id: '5',
      name: 'Shopping',
      icon: 'shopping_cart'
    }, {
      _id: '6',
      name: 'Gifts',
      icon: 'featured_seasonal_and_gifts'
    }, {
      _id: '7',
      name: 'Health',
      icon: 'local_hospital'
    },
    {
      _id: '8',
      name: 'Others',
      icon: 'unknown_document'
    }
  ]

}
