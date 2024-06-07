import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentUrl!: string;
  fatura$: boolean = false;
  isLogged$!: boolean;
  isAuthenticated$!: boolean;
  auth!: string;

  constructor(private userService: UserService, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        localStorage.setItem('currentUrl', event.url);
        
      }
    });
  }

  user$!: any;

  ngOnInit(): void {
    this.isLogged$ = this.userService.isLogged();
    this.currentUrl = localStorage.getItem('currentUrl')!;

    if (this.isLogged$) {
      this.user$ = this.userService.decodificaJWT();
      this.userService.getUserId(this.user$.id).subscribe((response: any) => {
        this.auth = response.role.name;

        if (this.auth === 'Authenticated') {
          this.isAuthenticated$ = true;
        } else {
          this.isAuthenticated$ = false;
        }

        this.user$ = response;
      });
    }
  }

  logout() {
    this.userService.onLogout();
    window.location.reload();
  }
}
