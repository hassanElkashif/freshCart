import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, ProductItemComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  isLoading: boolean = false;
  private readonly  _activatedRoute = inject(ActivatedRoute);
  private readonly  _productService = inject(ProductService);
  private readonly  _cartService = inject(CartService);
  private readonly  _toastr = inject(ToastrService);

  productDetails:product = {} as product;
  recentProducts!:product []

  customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        }
      },
      nav: true
    }

  ngOnInit():void {
    this.getId()
  }

  getId() {
    this._activatedRoute.paramMap.subscribe({
      next: (res:any) => {
        
        console.log(res?.params);
        this.getDetails(res?.params.id)
      }
    })
  }

  getDetails(id:string) {
    this._productService.getProductById(id).subscribe({
      next:(res:any) => {
        console.log(res);
        this.productDetails = res.data
        this.getRelatedProducts(this.productDetails.category._id)
      }
    })
  }

  getRelatedProducts(categoryId: string) {
    this._productService.getProducts(categoryId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.recentProducts = res.data;
      }
    })
  }

  addToCart(id:string){
    this.isLoading = true;
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this._toastr.success(res.message)
      }
    })
  }
}
