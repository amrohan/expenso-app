import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './models/category.model';

@Pipe({
  name: 'category',
  standalone: true,
})
export class CategoryPipe implements PipeTransform {
  transform(categoryId: string, categories: Category[]): string {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.title : '';
  }
}
