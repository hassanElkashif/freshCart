import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly _categoriesService = inject(CategoriesService)

  categories: any[] = [];


  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this._categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.data;
        console.log('Categories:', this.categories);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
}
