import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../components/layout.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../components/dialog.component';
import { Category } from '../models/category.model';
import { Account } from '../models/account.model';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    DialogComponent,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './transaction.component.html',
})
export class TransactionComponent {
  showCategory: boolean = false;
  date: Date = new Date();
  showMoneyDialogue: boolean = false;
  isCreateCategory: boolean = false;
  isCreateAcccount: boolean = false;
  isIconOpen: boolean = false;
  selectedIcon: string = 'category';

  category: Category = {
    id: '',
    title: '',
    imageUrl: '',
    userId: '',
  };

  account: Account = {
    id: '',
    title: '',
    imageUrl: '',
    userId: '',
  };

  selectedCategory: Category = {
    id: '2',
    title: ' Transportation',
    imageUrl: 'train',
    userId: '1',
  };

  selectedAccount: Category = {
    id: '1',
    title: 'Kotak',
    imageUrl: 'account_balance',
    userId: '1',
  };

  transactionAmount: number = 69.0;

  // Calculater number
  countNumber = signal('');

  updateNumber(number: string) {
    if (number === '.' && this.countNumber().includes('.')) {
      console.log('i ran');
      return; // prevent entering decimal point twice
    }
    if (number === '0' && this.countNumber() === '') {
      return;
    }
    this.countNumber.update((num) => num + number);
  }

  clearInput() {
    this.countNumber.update((num) => num.slice(0, -1));
  }

  onMoneyDialogue() {
    this.showMoneyDialogue = !this.showMoneyDialogue;
    this.transactionAmount === 0
      ? this.countNumber.set('')
      : this.countNumber.set(String(this.transactionAmount));
  }

  onMoneyEnter() {
    this.transactionAmount = Number(this.countNumber());
    this.showMoneyDialogue = !this.showMoneyDialogue;
  }

  onSubmit() {}

  // Acccount
  onAccountDialogClose(value: boolean) {
    value ? (this.isCreateAcccount = false) : (this.isCreateAcccount = true);
  }

  onAccountDialogConfirm(value: boolean) {
    // React to the dialog being confirmed
    console.log('Dialog confirmed with value: ', value);
    console.log(this.account);
    this.isCreateAcccount = !this.isCreateAcccount;
  }

  onAccountIconOpen(value: string) {
    this.isIconOpen = true;
  }
  onAccountIconClose(value: boolean) {
    this.isIconOpen = !this.isIconOpen;
  }

  onDialogClose(value: boolean) {
    value ? (this.isCreateCategory = false) : (this.isCreateCategory = true);
  }

  onDialogConfirm(value: boolean) {
    // React to the dialog being confirmed
    console.log('Dialog confirmed with value: ', value);
    console.log(this.category);
    this.isCreateCategory = !this.isCreateCategory;
  }

  // Icons Emitters

  onIconSelect(value: string) {
    this.selectedIcon = value;
    this.category.imageUrl = value;
    this.account.imageUrl = value;
  }

  onIconOpen(value: string) {
    this.isIconOpen = true;
  }
  onIconClose(value: boolean) {
    this.isIconOpen = !this.isIconOpen;
  }

  // categoryList: category[] = []
  categoryList: Category[] = [
    {
      id: '1',
      title: ' Food & Drinks',
      imageUrl: 'restaurant_menu',
      userId: '1',
    },
    {
      id: '2',
      title: ' Transportation',
      imageUrl: 'train',
      userId: '1',
    },
    {
      id: '3',
      title: ' Entertainment',
      imageUrl: 'movie',
      userId: '1',
    },
    {
      id: '4',
      title: 'Bills & Fees',
      imageUrl: 'receipt',
      userId: '1',
    },
    {
      id: '5',
      title: 'Shopping',
      imageUrl: 'shopping_cart',
      userId: '1',
    },
    {
      id: '6',
      title: 'Gifts',
      imageUrl: 'featured_seasonal_and_gifts',
      userId: '1',
    },
    {
      id: '7',
      title: 'Health',
      imageUrl: 'local_hospital',
      userId: '1',
    },
    {
      id: '8',
      title: 'Others',
      imageUrl: 'unknown_document',
      userId: '1',
    },
  ];

  accountList: Account[] = [
    {
      id: '1',
      title: 'Kotak',
      imageUrl: 'account_balance',
      userId: '1',
    },
    {
      id: '2',
      title: 'Paytm',
      imageUrl: 'account_balance',
      userId: '1',
    },
    {
      id: '3',
      title: 'Cash',
      imageUrl: 'account_balance_wallet',
      userId: '1',
    },
  ];

  //
  chooseCategory(category: Category) {
    this.selectedCategory = category;
    this.showCategory = !this.showCategory;
  }
  removeCategory(category: Category) {
    this.selectedCategory = {
      id: '',
      title: '',
      imageUrl: '',
      userId: '',
    };
  }
  chooseAccount(account: Account) {
    this.selectedAccount = account;
  }
}
