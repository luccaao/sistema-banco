import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BancoService } from '../../services/banco.service';
import { UserService } from '../../services/user.service';
import { TransacoesComponent } from '../../shared/transacoes/transacoes.component';
import {  MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fazer-transacao',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    TransacoesComponent,
    MatCardModule
  ],
  templateUrl: './fazer-transacao.component.html',
  styleUrl: './fazer-transacao.component.css',
})
export class FazerTransacaoComponent {



  

  constructor(private bancoService: BancoService,private userService: UserService, private router: Router) {}

  selectedCategoria: string = '';
  user$! : any;

  formTransacao = new FormGroup({
    valor: new FormControl(''),
    categoria: new FormControl(''),
    numeroConta: new FormControl(''),
  });

  categorias = [
    { value: 'DEPÓSITO', viewValue: 'Depósito' },
    { value: 'SAQUE', viewValue: 'Saque' },
    { value: 'TRANSFERÊNCIA', viewValue: 'Transferência' },
  ];


  ngOnInit(): void {
    if(this.userService.isLogged()) {
      this.user$ = this.userService.decodificaJWT();
      
      
    }else {
      this.router.navigate(['']);
    }
    
  }

  onCategoriaChange($event: any) {
    this.selectedCategoria = $event.target.value;
  }

  fazerTransacao() {
  console.log(this.formTransacao.value);
  
    this.bancoService.getSaldo(this.formTransacao.value,)

 
}
}
