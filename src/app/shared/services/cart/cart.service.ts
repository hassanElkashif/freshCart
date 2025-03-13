import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  _httpClient = inject(HttpClient);
  token:string = localStorage.getItem('token') || '';


  constructor() { 

    
  }

  addProductToCart(productId:string):Observable<any>{
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{productId}, {
      headers: {
        token: this.token
      }

    })
  }

  removeSpecificItem(productId:string):Observable<any>{
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
      headers: {
        token: this.token
      }
    })
  }

  clearCart():Observable<any>{
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers: {
        token: this.token
      }
    })
  }

  updateProductQuantity(productId:string,count:string):Observable<any>{
    return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count}, {
      headers: {
        token: this.token
      }
    })
  }

  getCart():Observable<any>{
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: {
        token: this.token
      }
    })
  }
}
