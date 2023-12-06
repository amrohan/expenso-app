import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../components/layout.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../components/dialog.component';


export class Category {
  _id: string;
  name: string;
  icon: string
  userId: string;
}
export class account {
  _id: string;
  name: string;
  icon: string;
  userId: string;

}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, LayoutComponent, DialogComponent, RouterLink, FormsModule],
  templateUrl: './transaction.component.html',
  styles: ``
})
export class TransactionComponent {
  showCategory: boolean = false
  date: Date = new Date();
  showMoneyDialogue: boolean = false
  isCreateCategory: boolean = false
  isCreateAcccount: boolean = false
  isIconOpen: boolean = false;
  selectedIcon: string = 'category';

  category: Category = new Category()
  account: account = new account()


  selectedCategory: Category | null = {
    _id: '2',
    name: ' Transportation',
    icon: 'train',
    userId: '1'
  }
  selectedAccount: Category | null = {
    _id: '1',
    name: 'Kotak',
    icon: 'account_balance',
    userId: '1'
  }
  transactionAmount: number = 69.00

  // Calculater number
  countNumber = signal('')


  updateNumber(number: string) {
    if (number === '.' && this.countNumber().includes('.')) {
      console.log('i ran');
      return; // prevent entering decimal point twice
    }
    if (number === '0' && this.countNumber() === '') {
      return
    }
    this.countNumber.update(num => num + number)

  }

  clearInput() {
    this.countNumber.update(num => num.slice(0, -1))
  }

  onMoneyDialogue() {
    this.showMoneyDialogue = !this.showMoneyDialogue;
    this.transactionAmount === 0 ? this.countNumber.set('') : this.countNumber.set(String(this.transactionAmount));
  }

  onMoneyEnter() {
    this.transactionAmount = Number(this.countNumber());
    this.showMoneyDialogue = !this.showMoneyDialogue;
  }

  onSubmit() {
  }


  // Acccount
  onAccountDialogClose(value: boolean) {
    value ? this.isCreateAcccount = false : this.isCreateAcccount = true;
  }

  onAccountDialogConfirm(value: boolean) {
    // React to the dialog being confirmed
    console.log('Dialog confirmed with value: ', value);
    console.log(this.account);
    this.isCreateAcccount = !this.isCreateAcccount
  }

  onAccountIconOpen(value: string) {
    this.isIconOpen = true;
  }
  onAccountIconClose(value: boolean) {
    this.isIconOpen = !this.isIconOpen;
  }


  onDialogClose(value: boolean) {
    value ? this.isCreateCategory = false : this.isCreateCategory = true;
  }

  onDialogConfirm(value: boolean) {
    // React to the dialog being confirmed
    console.log('Dialog confirmed with value: ', value);
    console.log(this.category);
    this.isCreateCategory = !this.isCreateCategory
  }



  // Icons Emitters

  onIconSelect(value: string) {
    this.selectedIcon = value;
    console.log("🚀 ~ file: transaction.component.ts:132 ~ TransactionComponent ~ onIconSelect ~ this.selectedIcon:", this.selectedIcon)
    this.category.icon = value
    this.account.icon = value
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
      _id: '1',
      name: ' Food & Drinks',
      icon: 'restaurant_menu',
      userId: '1'
    }, {
      _id: '2',
      name: ' Transportation',
      icon: 'train',
      userId: '1'
    },
    {
      _id: '3',
      name: ' Entertainment',
      icon: 'movie',
      userId: '1'
    }, {
      _id: '4',
      name: 'Bills & Fees',
      icon: 'receipt',
      userId: '1'
    }, {
      _id: '5',
      name: 'Shopping',
      icon: 'shopping_cart',
      userId: '1'
    }, {
      _id: '6',
      name: 'Gifts',
      icon: 'featured_seasonal_and_gifts',
      userId: '1'
    }, {
      _id: '7',
      name: 'Health',
      icon: 'local_hospital',
      userId: '1'
    },
    {
      _id: '8',
      name: 'Others',
      icon: 'unknown_document',
      userId: '1'
    }
  ]

  accountList: account[] = [
    {
      _id: '1',
      name: 'Kotak',
      icon: 'account_balance',
      userId: '1'
    },
    {
      _id: '2',
      name: 'Paytm',
      icon: 'account_balance',
      userId: '1'
    },
    {
      _id: '3',
      name: 'Cash',
      icon: 'account_balance_wallet',
      userId: '1'
    }
  ]



}
