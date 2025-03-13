// wishlist.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './whish-list.component.html',
  styleUrls: ['./whish-list.component.scss']
})
export class WishListComponent implements OnInit {
  wishListDetails: any; 
  isLoading: boolean = true;
  emptyWishList: boolean = false;

  private readonly _wishListService = inject(WishListService);

  ngOnInit(): void {
    this.getWishList();
  }

  getWishList() {
    this._wishListService.getWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.wishListDetails = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  removeItem(id: string) {
    if (this.wishListDetails && this.wishListDetails.data) {
      this.wishListDetails.data = this.wishListDetails.data.filter((item: { _id: string; }) => item._id !== id);
      this.wishListDetails.count = this.wishListDetails.data.length;
    }
  
    this._wishListService.removeSpecificItem(id).subscribe({
      next: (res) => {
        console.log('Removed from API:', res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  clearWishList() {
    this.isLoading = true;
    this._wishListService.clearWhishList().subscribe({
      next: (res) => {
        console.log(res.message);
        this.isLoading = false;
        if (res.message === 'success') {
          this.wishListDetails = [];
          this.emptyWishList = true;
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
