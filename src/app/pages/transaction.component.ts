import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../components/layout.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../components/dialog.component';
import { Category } from '../models/category.model';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transactions.model';
import { TransactionService } from '../services/transaction.service';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { AccountService } from '../services/account.service';
import date from 'date-and-time';
import { CategoryPipe } from '../category.pipe';
import { AccountPipe } from '../account.pipe';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    DialogComponent,
    RouterLink,
    FormsModule,
    CategoryPipe,
    AccountPipe,
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

  categoryList: Category[] = [];

  accountList: Account[] = [];

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
    id: '',
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
  private readonly authService = inject(AuthService);
  private readonly transactionService = inject(TransactionService);
  private readonly categoryService = inject(CategoryService);
  private readonly accountService = inject(AccountService);

  ngOnInit(): void {
    const data = this.route.snapshot.paramMap.get('id');
    const transactionType = this.route.snapshot.queryParams['type'];
    if (!data) {
      this.showMoneyDialogue = true;
      this.isAdd.set(true);
    } else {
      this.getTransactionById(data);
    }

    // checking type type
    switch (transactionType) {
      case 'income':
        this.transaction.type = 'Income';
        break;
      case 'expense':
        this.transaction.type = 'Expense';
        break;
      default:
        break;
    }
    this.transaction.userId = this.authService.GetUserId()!;

    this.getAllCategoryAndAccount(this.transaction.userId);
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

  onSave() {
    const transactionType = this.route.snapshot.queryParams['type'];

    if (/^\d{4}-\d{2}-\d{2}$/.test(String(this.transaction.date))) {
      let ldate = date.parse(String(this.transaction.date), 'YYYY-MM-DD');
      this.transaction.date = ldate;
    } else {
      console.log('The date string is not in the format YYYY-MM-DD.');
    }

    if (transactionType) {
      this.transactionService.CreateTransaction(this.transaction).subscribe({
        next: (res) => {},
        error: (err) => {},
      });
    } else {
      this.transactionService.UpdateTransaction(this.transaction).subscribe({
        next: (res) => {},
        error: (err) => {},
      });
    }
  }

  deleteTransaction(id: string) {
    this.transactionService.DeleteTransaction(id).subscribe({
      next: (res) => {},
      error: (err) => {},
    });
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
        const defaultAccount = this.accountList.find(
          (item) => item.isDefault === true
        );
        this.transaction.accountId = defaultAccount!.id;
      },
      error: (err) => {},
    });
  }

  getTransactionById(id: string) {
    this.transactionService.GetTransactionByID(id).subscribe({
      next: (res) => {
        this.transaction = res.data;
      },
      error: (err) => {},
    });
  }
}
