import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  gameNames!: Array<string>;

  constructor() { }

  ngOnInit(): void {
    let data = localStorage.getItem('cart');

    if (data !== null) {
      this.gameNames = JSON.parse(data);
    }
    else {
      this.gameNames = [];
    }
  }

  addGameName(newGameName: string) {
    let cartData = [];
    let data = localStorage.getItem('cart');

    if (data !== null) {
      cartData = JSON.parse(data);
    }

    cartData.push(newGameName);
    this.gameNames.push(newGameName);
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  emptyCart(): void {
    this.gameNames = [];
    localStorage.clear();
    console.log(this.gameNames);
  }
}
