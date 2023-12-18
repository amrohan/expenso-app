import { Pipe, PipeTransform } from '@angular/core';
import { Account } from './models/account.model';

@Pipe({
  name: 'account',
  standalone: true,
})
export class AccountPipe implements PipeTransform {
  transform(accountId: string, categories: Account[]): string {
    const category = categories.find((category) => category.id === accountId);
    return category ? category.title : '';
  }
}
