import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionComponent } from './pages/transaction.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './pages/login.component';
import { SignupComponent } from './pages/signup.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: TransactionComponent },
  { path: 'add', component: TransactionComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
