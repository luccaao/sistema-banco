import { Component } from '@angular/core';
import  {jsPDF} from 'jspdf';
import { TransacoesComponent } from '../../shared/transacoes/transacoes.component';
import { TransacoesService } from '../../services/transacoes.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-faturapdf',
  standalone: true,
  imports: [],
  templateUrl: './faturapdf.component.html',
  styleUrl: './faturapdf.component.css'
})
export class FaturapdfComponent {

  fatura!: any[];
  user$!: any;

  constructor(private transacaoService: TransacoesService, private userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userService.decodificaJWT();
    this.userService.getUserId(this.user$.id).subscribe((response: any) => {
      this.transacaoService.getAllTransacoes(response.conta.id).subscribe((response: any) => {
        this.fatura = response.data.attributes.transacaos.data;
        console.log(this.fatura);
        

      });
    });
  }

  gerarPDF(): void {
    const fatura = document.getElementById('fatura');
    const pdf = new jsPDF();
    pdf.html(fatura ? fatura.outerHTML : '', {
      callback: function (pdf) {
        pdf.save('fatura.pdf');
      }
    });
  }

}
