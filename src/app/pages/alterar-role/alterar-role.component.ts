import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alterar-role',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatSelectModule, CommonModule],
  templateUrl: './alterar-role.component.html',
  styleUrl: './alterar-role.component.css',
})
export class AlterarRoleComponent {
  id!: any;

  user$: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    console.log(this.id);

    this.userService.getUserId(this.id).subscribe((response: any) => {
      this.user$ = response;
      console.log(this.user$);
    });
  }
}
