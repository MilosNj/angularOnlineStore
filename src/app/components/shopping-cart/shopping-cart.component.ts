import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @ViewChild('price') price!: string;

  gameNames!: Array<string>;
  displayedColumns: string[] = ['name', 'price'];

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
    location.reload();
    console.log(this.gameNames);
  }

  buyCart(): void {
    (async () => {
      const { value: email } = await Swal.fire({
        title: 'Input email address to receive game codes',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address'
      })

      if (email) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Thanks for buying games from us!'
        })
        setTimeout(this.emptyCart, 2000);
      }
    })()
  }
}
