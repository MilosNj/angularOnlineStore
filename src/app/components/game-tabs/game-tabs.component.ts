import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Game } from 'src/app/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit {

  @Input() game!: Game;
  @Output() newItemEvent = new EventEmitter<string>();
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

  addNewEmitterItem(value: string) {
    this.newItemEvent.emit(value);
  }

  addItemToCart(gameName: string): void {
    let cartData = [];
    let data = localStorage.getItem('cart');

    if (data !== null) {
      cartData = JSON.parse(data);
    }

    if (this.gameNames.includes(gameName)) {
      Swal.fire({
        icon: 'error',
        title: "Can't do that!",
        text: 'Item already exists in cart'
      });
    }
    else {
      cartData.push(gameName);
      this.gameNames.push(gameName);
      localStorage.setItem('cart', JSON.stringify(cartData));
      this.game.isAdded = true;
      Swal.fire({
        icon: 'success',
        title: 'Awesome!',
        text: 'Item added to cart',
        footer: '<button class="swal2-confirm swal2-styled"><a href="" style="text-decoration: none; color: white;">Go To Home Page</a></button>'
      });
    }

    console.log(this.gameNames);
  }
}
