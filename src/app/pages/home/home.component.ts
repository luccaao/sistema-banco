import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ShoppingComponent } from '../../components/shopping/shopping.component';
import { MatIconModule } from '@angular/material/icon';
import { ProdutosComponent } from '../../components/produtos/produtos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShoppingComponent, MatIconModule, ProdutosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

 
  user$!: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {

    localStorage.setItem('currentUrl', this.router.url);

    if (!this.userService.isLogged()) {
      this.router.navigate(['']);
    }

    this.user$ = this.userService.decodificaJWT();
    this.userService.getUserId(this.user$.id).subscribe((response: any) => {
      this.user$ = response; 
    });
  }
}
