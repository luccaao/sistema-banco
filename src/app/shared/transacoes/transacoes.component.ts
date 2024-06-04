import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TransacoesService } from '../../services/transacoes.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-transacoes',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.css',
})
export class TransacoesComponent {
  user$!: any;
  conta$!: any;

  transacoes: {
    attributes: {
    valor: string;
    tipo: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
    id: number;
  }[] = [];
  

  constructor(
    private transacaoService: TransacoesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
     if (this.userService.isLogged()) {
       this.user$ = this.userService.decodificaJWT();

       this.userService.getUserId(this.user$.id).subscribe((response: any) => {
          this.conta$ = response.conta.id;
                 
          
          this.transacaoService
            .getAllTransacoes(this.conta$)
            .subscribe((response: any) => {
           
              this.transacoes = response.data.attributes.transacaos.data.reverse()
             
             
            });
        });

     }
  }
}
