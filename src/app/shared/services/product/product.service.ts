import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  env = environment.baseURL;

  private readonly _httpClient = inject(HttpClient)
  constructor() { }

  getProducts(categoryId?:string): Observable<any> {
    let url = categoryId ? `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}` : `https://ecommerce.routemisr.com/api/v1/products`
    return this._httpClient.get(url)
  }
  getProductById(id:string): Observable<any> {
    return this._httpClient.get(`${this.env}/products/${id}`)
  }
}
