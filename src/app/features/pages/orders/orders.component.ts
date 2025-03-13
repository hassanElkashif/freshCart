import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { OrderService } from '../../../shared/services/order/order.service';
import { CartItem, order } from '../../../shared/interfaces/order';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  
  private readonly _authService = inject(AuthService);
  private readonly _orderService = inject(OrderService);
  cartItems: CartItem[] = [];
  showModel: boolean = false;


  allOrders:order[] = [];

  ngOnInit():void {
    this.getUserId();
  }

  getUserId() {
    this._authService.userData.subscribe({
      next: (res) => {
        console.log(res);
        res.id && this.getAllOrders(res.id);
      }
    })
  }
  getAllOrders(id:string) {
    this._orderService.getUserOrders(id).subscribe({
      next: (res) => {
        console.log(res);
        this.allOrders = res;
      }
  })
  }

  openModel(index:number) {
    this.cartItems = this.allOrders[index].cartItems;
    this.showModel = true;
  }
}
