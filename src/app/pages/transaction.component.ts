import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../components/layout.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../components/dialog.component';
import { Category } from '../models/category.model';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transactions.model';

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
export class TransactionComponent implements OnInit {
  showCategory: boolean = false;
  date: Date = new Date();
  isCreateCategory: boolean = false;
  isCreateAcccount: boolean = false;
  isIconOpen: boolean = false;
  selectedIcon: string = 'category';
  showMoneyDialogue: boolean = false;

  showType: boolean = false;

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

  transaction: Transaction = {
    id: 'id11',
    title: '',
    amount: 0,
    date: this.date || new Date(),
    type: '',
    imageUrl: '',
    categoryId: '',
    accountId: '',
    userId: '',
  };

  selectedCategory: Category | null = null;

  selectedAccount: Category | null = null;

  isAdd = signal(false);

  // Injection
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    const data = this.route.snapshot.paramMap.get('id');
    if (!data) {
      this.showMoneyDialogue = true;
      this.isAdd.set(true);
    }
  }

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
    this.transaction.amount === 0
      ? this.countNumber.set('')
      : this.countNumber.set(String(this.transaction.amount));
  }

  onMoneyEnter() {
    this.transaction.amount = Number(this.countNumber());
    this.showMoneyDialogue = !this.showMoneyDialogue;

    this.isAdd()
      ? (this.showCategory = !this.showCategory)
      : (this.showCategory = this.showCategory);
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
      isDefault: true,
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
    this.transaction.categoryId = category.id;
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
    this.transaction.accountId = account.id;
  }

  // Expense Type

  selectType(type: string) {
    this.transaction.type = type;
    this.showType = !this.showType;
  }

  onSave() {}
}
