import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  env = environment.baseURL;
  
    _httpClient = inject(HttpClient)
    
  
    constructor() { }
  
    getAllCategories():Observable<any> {
  
      return this._httpClient.get(`${this.env}/brands`);
  
    }
}
