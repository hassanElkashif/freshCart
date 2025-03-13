import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product } from '../../../interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product!: product

  @Output() fireAddToCart: EventEmitter<string> = new EventEmitter<string>()

  handleAddToCart (id:string) {
    this.fireAddToCart.emit(id)
  }
}
