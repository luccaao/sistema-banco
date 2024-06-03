import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  user$!: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {

    if (!this.userService.isLogged()) {
      this.router.navigate(['']);
    }

    this.user$ = this.userService.decodificaJWT();
    this.userService.getUserId(this.user$.id).subscribe((response: any) => {
      this.user$ = response; 
    });
  }
}
