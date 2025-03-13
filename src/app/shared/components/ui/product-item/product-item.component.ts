import { Component, ChangeDetectorRef, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../../../interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product!: product;
  @Input() isWishlisted: boolean = false;

  @Output() fireAddToCart: EventEmitter<string> = new EventEmitter<string>();
  @Output() fireAddToWishlist: EventEmitter<string> = new EventEmitter<string>();

  constructor(private cd: ChangeDetectorRef) {} 

  handleAddToCart(id: string) {
    this.fireAddToCart.emit(id);
  }
  
  handleAddToWishlist(id: string) {
    console.log('Product added to wishlist:', id);
    this.fireAddToWishlist.emit(id);
    this.isWishlisted = true;
  }
  
}
