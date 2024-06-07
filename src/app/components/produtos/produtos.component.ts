import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../services/produtos.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatSidenavModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  user$!: any;
  showFiller = false;
  totalCarrinho = 0
  cartItems!  : any[];
  produtos! : any[];

  constructor(private produtosService: ProdutosService, private userService: UserService) { }

  ngOnInit() {

    this.user$ =  this.userService.decodificaJWT()

    this.userService.getUserId(this.user$.id).subscribe((res : any) => {
      
     
      this.cartItems = res.produtos;
      this.getTotalPrice()
    });


    this.produtosService.getProdutos().subscribe((res : any) => {
      this.produtos = res.data

      
    });

    
    
  }

  getTotalPrice() {
    this.totalCarrinho = this.cartItems.reduce((total, item) => total + item.valor, 0);
  }

  removeItem(item: any) {

  }

  finalizarCompra() {
    
  }

}
