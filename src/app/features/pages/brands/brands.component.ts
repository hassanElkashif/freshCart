import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandsService } from '../../../shared/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
    private readonly _brandsService = inject(BrandsService)
  
    brands: any[] = [];
  
  
    ngOnInit(): void {
      this.fetchBrands();
    }
  
    fetchBrands(): void {
      this._brandsService.getAllCategories().subscribe({
        next: (data) => {
          this.brands = data.data;
          console.log('brands:', this.brands);
        },
        error: (error) => {
          console.error('Error fetching brands:', error);
        }
      });
    }
}
