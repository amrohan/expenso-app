import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionComponent } from './pages/transaction.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './pages/login.component';
import { SignupComponent } from './pages/signup.component';
import { CategoryComponent } from './pages/category/category.component';
import { AccountComponent } from './pages/account/account.component';
import { ProfileComponent } from './pages/profile.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    component: TransactionComponent,
    canActivate: [authGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'add', component: TransactionComponent, canActivate: [authGuard] },
  { path: 'category', component: CategoryComponent, canActivate: [authGuard] },
  { path: 'account', component: AccountComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
