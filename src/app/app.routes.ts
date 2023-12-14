import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionComponent } from './pages/transaction.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'transaction/:id', component: TransactionComponent },
  { path: 'add', component: TransactionComponent },
];
