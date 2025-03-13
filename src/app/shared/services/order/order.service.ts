import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  token = JSON.stringify(localStorage.getItem("userToken"))

  private readonly _httpClient = inject(HttpClient)

  constructor() {}

  cashOrder(id:string, shippingAddress: {details:string, phone:string, city:string}): Observable<any> {

  return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, {shippingAddress}, {
  headers: {
  token: JSON.parse(this.token)
    }
  })
}

  getAllOrders(): Observable<any> {
  return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
  }

  getUserOrders(id:string): Observable<any> {
  return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/${id}`)
  }

  onlinePayment(id:string, shippingAddress: {details:string, phone:string, city:string}): Observable<any> {
    return this._httpClient.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, {shippingAddress},
    )
  }
}
