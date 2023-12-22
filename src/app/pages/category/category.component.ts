import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../components/layout.component';
import { DialogComponent } from '../../components/dialog.component';
import { Category } from '../../models/category.model';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/response.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, LayoutComponent, DialogComponent, FormsModule],
  templateUrl: './category.component.html',
  styles: ``,
})
export class CategoryComponent implements OnInit {
  date = new Date();
  isMenu = '';

  // category
  isIconOpen: boolean = false;
  isCreateCategory: boolean = false;
  selectedIcon: string = 'category';
  selectedCategory: Category | null = null;
  showCategory: boolean = false;
  titleName = '';
  // checking where state is create or update
  state: boolean = true;

  category: Category = {
    id: '',
    title: '',
    imageUrl: '',
    userId: '',
  };

  categoryList$: Observable<ApiResponse<Category[]>>;

  private catService = inject(CategoryService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.getUserCategories();
  }

  onDialogClose(value: boolean) {
    value ? (this.isCreateCategory = false) : (this.isCreateCategory = true);
  }

  onDialogConfirm(value: boolean) {
    this.isCreateCategory = !this.isCreateCategory;
    if (this.state) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }

  onIconSelect(value: string) {
    this.selectedIcon = value;
    this.category.imageUrl = value;
  }

  onIconOpen(value: string) {
    this.isIconOpen = true;
  }
  onIconClose(value: boolean) {
    this.isIconOpen = !this.isIconOpen;
  }

  chooseCategory(category: Category) {
    this.selectedCategory = category;
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

  onIconEdit(item: Category) {
    this.isCreateCategory = !this.isCreateCategory;
    this.isMenu = '';
    this.selectedCategory = item;
    this.category = item;
    this.selectedIcon = item.imageUrl;
    this.titleName = 'Update ategory';
    this.state = true;
  }

  onAdd() {
    this.isCreateCategory = !this.isCreateCategory;
    this.titleName = 'Create category';
    this.selectedIcon = 'category';
    this.state = false;
  }

  updateCategory() {
    this.catService.UpdateCategory(this.category).subscribe({
      next: (res) => {
        this.getUserCategories();

        console.log(
          '🚀 ~ file: category.component.ts:109 ~ CategoryComponent ~ this.catService.UpdateCategory ~ i got called'
        );
      },
      error: (err) => {
        console.log(
          '🚀 ~ file: category.component.ts:59 ~ CategoryComponent ~ this.catService.UpdateCategory ~ err:',
          err
        );
      },
    });
  }

  createCategory() {
    this.category.userId = this.authService.GetUserId()!;
    if (this.category.userId) {
      this.catService.CreateCategory(this.category).subscribe({
        next: (res) => {
          this.getUserCategories();
          console.log(
            '🚀 ~ file: category.component.ts:109 ~ CategoryComponent ~ this.catService.Create ~ i got called'
          );
        },
        error: (err) => {
          console.log(
            '🚀 ~ file: category.component.ts:86 ~ CategoryComponent ~ this.catService.CreateCategory ~ err:',
            err
          );
        },
      });
    }
  }

  categoryDelete(id: string) {
    if (id) {
      this.catService.DeleteCategory(id).subscribe({
        next: (res) => {
          this.getUserCategories();
        },
        error: (err) => {
          console.log(
            '🚀 ~ file: category.component.ts:114 ~ CategoryComponent ~ this.catService.DeleteCategory ~ err:',
            err
          );
        },
      });
    }
  }

  getUserCategories() {
    this.categoryList$ = this.catService.GetCategoryByUserId(
      this.authService.GetUserId()!
    );
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
