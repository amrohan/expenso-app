import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './models/category.model';
import { Account } from './models/account.model';

@Pipe({
  name: 'idtoicon',
  standalone: true,
})
export class IdtoiconPipe implements PipeTransform {
  transform(Id: string, list: Account[] | Category[]) {
    const listItem = list.find((item) => item.id === Id);
    return listItem ? listItem.imageUrl : '';
  }
}
