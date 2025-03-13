import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  _httpClient = inject(HttpClient);
    token:string = localStorage.getItem('token') || '';
  
  
    constructor() { 
  
      
    }
  
    addProductToWishList(productId:string):Observable<any>{
      return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId}, {
        headers: {
          token: this.token
        }
  
      })
    }
  
    removeSpecificItem(productId:string):Observable<any>{
      return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        headers: {
          token: this.token
        }
      })
    }
  
    clearWhishList():Observable<any>{
      return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        headers: {
          token: this.token
        }
      })
    }
  
    getWishList():Observable<any>{
      return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token: this.token
        }
      })
    }
}
