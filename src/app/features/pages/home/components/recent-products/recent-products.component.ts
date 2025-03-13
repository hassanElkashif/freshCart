import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { product } from '../../../../../shared/interfaces/product';
import { ProductItemComponent } from "../../../../../shared/components/ui/product-item/product-item.component";
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../../../shared/services/wishList/wish-list.service';

@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent],
  templateUrl: './recent-products.component.html',
  styleUrls: ['./recent-products.component.scss']
})
export class RecentProductsComponent implements OnInit {

  products!:product[]
  wishlistIds: string[] = [];

  private readonly _provideService = inject(ProductService)
  private readonly _cartService = inject(CartService)
  private readonly _wishListService = inject(WishListService)
  private readonly _toastr  = inject(ToastrService)

  ngOnInit(): void {
    this.gerProducts()
  }

  gerProducts () {
    this._provideService.getProducts().subscribe({
      next : (res) => {
        console.log(res.data)
        this.products = res.data
      },
      error :  (err)  =>{
        console.error(err)
      },
      complete: ()  =>{
        console.log('completed')
      }
    })
  }

  addToCart (id:string) {
    this._cartService.addProductToCart(id).subscribe({
      next : (res) => {
        console.log(res)
        this._toastr.success(res.message)
      }
    })
  }

  addToWishList(id: string) {
    console.log('addToWishList() called with ID:', id);
  
    this._wishListService.addProductToWishList(id).subscribe({
      next: (res) => {
        console.log('API Response:', res);
        this.wishlistIds.push(id);
        this._toastr.success(res.message);
      },
      error: (err) => {
        console.error('Error adding to wishlist:', err);
      }
    });
  }
  

}
