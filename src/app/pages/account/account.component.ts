import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../components/layout.component';
import { DialogComponent } from '../../components/dialog.component';
import { FormsModule } from '@angular/forms';
import { Account } from '../../models/account.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/response.model';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, LayoutComponent, DialogComponent, FormsModule],
  templateUrl: './account.component.html',
  styles: ``,
})
export class AccountComponent {
  date = new Date();
  isMenu = '';

  // category
  isIconOpen: boolean = false;
  isCreateAccount: boolean = false;
  selectedIcon: string = 'category';
  selectedAccount: Account | null = null;
  showAccount: boolean = false;
  titleName = '';
  // checking where state is create or update
  state: boolean = true;

  account: Account = {
    id: '',
    title: '',
    imageUrl: '',
    userId: '',
  };

  accountList: Account[] = [];
  accountList$: Observable<ApiResponse<Account[]>>;

  private accountService = inject(AccountService);
  private authService = inject(AuthService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    this.getUserAccounts();
  }

  onDialogClose(value: boolean) {
    value ? (this.isCreateAccount = false) : (this.isCreateAccount = true);
  }

  onDialogConfirm(value: boolean) {
    this.isCreateAccount = !this.isCreateAccount;
    if (this.state) {
      this.updateAccount();
    } else {
      this.createAccount();
    }
  }

  onIconSelect(value: string) {
    this.selectedIcon = value;
    this.account.imageUrl = value;
  }

  onIconOpen(value: string) {
    this.isIconOpen = true;
  }
  onIconClose(value: boolean) {
    this.isIconOpen = !this.isIconOpen;
  }

  chooseCategory(account: Account) {
    this.selectedAccount = account;
    this.showAccount = !this.showAccount;
  }
  removeCategory(category: Account) {
    this.selectedAccount = {
      id: '',
      title: '',
      imageUrl: '',
      userId: '',
    };
  }

  onIconEdit(item: Account) {
    this.isCreateAccount = !this.isCreateAccount;
    this.isMenu = '';
    this.selectedAccount = item;
    this.account = item;
    this.selectedIcon = item.imageUrl;
    this.titleName = 'Update account';
    this.state = true;
  }

  onAdd() {
    this.isCreateAccount = !this.isCreateAccount;
    this.titleName = 'Create account';
    this.selectedIcon = 'category';
    this.state = false;
  }

  updateAccount() {
    this.accountService.UpdateAccount(this.account).subscribe({
      next: (res) => {
        this.toast.Success('Account updated');
      },
      error: (err) => {
        this.toast.Error('Error updating account');
      },
    });
  }

  createAccount() {
    this.account.userId = this.authService.GetUserId()!;
    if (this.account.userId) {
      this.accountService.CreateAccount(this.account).subscribe({
        next: (res) => {
          this.accountList.push(res.data);
          this.toast.Success('Account created');
        },
        error: (err) => {
          this.toast.Error('Error creating account');
        },
      });
    }
  }

  accountDelete(id: string) {
    if (id) {
      this.accountService.DeleteAccount(id).subscribe({
        next: (res) => {
          this.accountList = this.accountList.filter((item) => item.id !== id);
          this.toast.Success('Account deleted');
        },
        error: (err) => {
          this.toast.Error('Error deleting account');
        },
      });
    }
  }

  getUserAccounts() {
    this.accountList$ = this.accountService.GetAccountByUserId(
      this.authService.GetUserId()!
    );
    this.accountService
      .GetAccountByUserId(this.authService.GetUserId()!)
      .subscribe({
        next: (res) => {
          this.accountList = res.data;
        },
        error: (err) => {
          this.toast.Error('Error fetching accounts');
        },
      });
  }

  showMenu(id: string) {
    if (this.isMenu === '') {
      this.isMenu = id;
      this.state = true;
    } else {
      this.isMenu = '';
      this.state = true;
    }
  }
}
