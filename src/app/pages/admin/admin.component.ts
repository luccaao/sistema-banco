import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatCardModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  user$!: any;


 

  users$: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.userService.isLogged()) {
      this.user$ = this.userService.decodificaJWT();

      this.userService.getAllUsers().subscribe((response: any) => {
        console.log(response);

        this.users$ = response;

        console.log(this.users$);
      });

      this.userService.getUserId(this.user$.id).subscribe((response: any) => {
        this.user$ = response;
      });
    } else {
      this.router.navigate(['']);
    }
  }

  teste(id:string) {
    //criar id no local storage
    localStorage.setItem('id', id);
    this.router.navigate(['alterar-role']);
  }

  
}
