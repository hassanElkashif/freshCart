import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { cart } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

export const renderMode = 'server';

export function getPrerenderParams() {
  return [];
}

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartDetails!:cart
  isLoading:boolean = true
  emptyCart:boolean = false
  private readonly _cartService = inject(CartService)

  ngOnInit(): void {
    this.getCart()
  }

  getCart() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        console.log(res)
        this.cartDetails = res
        this.isLoading = false
      }
    })
  }
  removeItem(id:string){
    this.isLoading = true
    this._cartService.removeSpecificItem(id).subscribe({
      next: (res) => {
        console.log(res)
        this.cartDetails = res
        this.isLoading = false
      }
    })
  }

  updateCount(id:string,count:number){
    this.isLoading = true

    this._cartService.updateProductQuantity(id, `${count}`).subscribe({
      next: (res) => {
        console.log(res)
        this.cartDetails = res
        this.isLoading = false

      }
    })
  }

  clearCart(){
    this.isLoading = true

    this._cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res.message)
        this.isLoading = false
        if (res.message == "success") {
          this.cartDetails = {} as cart
          this.emptyCart = true
        }
        }  
      })
  }
}
