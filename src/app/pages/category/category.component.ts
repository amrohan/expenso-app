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
  isMenu = false;

  // category
  isIconOpen: boolean = false;
  isCreateCategory: boolean = false;
  selectedIcon: string = 'category';
  selectedCategory: Category | null = null;
  showCategory: boolean = false;

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
    this.categoryList$ = this.catService.GetCategoryByUserId(
      this.authService.GetUserId()!
    );
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

  //
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
    this.isMenu = !this.isMenu;
    this.selectedCategory = item;
    this.category = item;
    this.selectedIcon = item.imageUrl;
  }
}
