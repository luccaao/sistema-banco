import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxPrintModule, NgxPrintService, PrintOptions } from 'ngx-print';
import { BancoService } from '../../services/banco.service';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import jsPDF from 'jspdf';
import { HeaderComponent } from '../../shared/header/header.component';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { format } from 'date-fns';

interface Transacao {
  createdAt: string;
  tipo: string;
  valor: number;
  day?: number;
}

declare const html2pdf: any;

@Component({
  selector: 'app-fatura',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxPrintModule,
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.css'],
})
export class FaturaComponent {
  user$!: any;
  transacao$!: Transacao[];
  totalValue: number = 0;

  constructor(
    private bancoService: BancoService,
    private userService: UserService,
    private printService: NgxPrintService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.decodificaJWT();
    this.bancoService.fatura(this.user$.id).subscribe((response: any) => {
      this.transacao$ = response.transacaos;
      this.transacao$.forEach((transacao) => {
        let date = new Date(transacao.createdAt);
        transacao.day = date.getDate();
      });
    });
  }

  filterTransactions(selectedDay: number) {
    this.bancoService.fatura(this.user$.id).subscribe((response: any) => {
      this.transacao$ = response.transacaos;
      this.transacao$.forEach((transacao) => {
        let date = new Date(transacao.createdAt);
        transacao.day = date.getDate();
      });
      let filteredTransactions = this.transacao$.filter(
        (transacao) => transacao.day === selectedDay
      );

      this.totalValue = filteredTransactions.reduce((sum, transacao) => {
        return sum + Number(transacao.valor);
      }, 0);

      this.transacao$ = filteredTransactions;
    });
  }

  // gerarPDF(): void {
  //   const tabela = document.getElementById('fatura');

  //   const opt = {
  //     margin: [10,10,10,10],
  //     filename: 'meubanco.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  //   };

  //   // New Promise-based usage:
  //   html2pdf().set(opt).from(tabela).save();
  // }

  public export(): void {

    
    // Mapeie a transação para um formato que a tabela possa usar
    const body = this.transacao$.map((t) => [
      format(new Date(t.createdAt), 'dd/MM/yyyy'), // Formatar data para o padrão brasileiro
      t.tipo,
      this.formatarMoeda(t.valor),
       // Formatar valor para moeda brasileira
    ]);
  
    // Adicione os cabeçalhos à primeira linha
    body.unshift(['Data de Transação', 'Tipo de Transação', 'Valor']);
  
    const docDefinition = {
      content: [
        {
          columns: [
            {
              text: [
                { text: 'Meu', style: 'normalText' }, // Parte normal do texto
                { text: 'Banco', style: ['header', 'redText', 'lineThrough'] }, // Parte estilizada
              ],
              alignment: 'start',
            },
            {
              text: '', // Coluna invisível
              width: 280, // Preenchendo o restante do espaço
              alignment: 'end',
            },
            {
              qr: 'Fatura meuBanco',
              fit: '70', // Tamanho do QR code
              alignment: 'end', // Alinha o QR code com o texto à direita
            },
          ],
        },
        {
          text: 'Fatura',
          style: 'subheader',
          alignment: 'start',
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', 20], // Adicionando uma coluna invisível para o QR code
            body: body,
          },
          layout: {
            fillColor: function (rowIndex: any, node: any, columnIndex: any) {
              return rowIndex % 2 === 0 ? '#CCCCCC' : null;
            },
          },
        },
      ],
      styles: {
        normalText: {
          fontSize: 23,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        header: {
          fontSize: 23,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        redText: {
          color: 'tomato',
        },
        lineThrough: {
          decoration: 'lineThrough',
        },
      },
      footer: {
        columns: [
          { text: '', width: '*', alignment: 'start' },
          { text: 'meubanco.com.br', color: 'tomato', alignment: 'center', bold: true},
          { text: '', width: '*', alignment: 'end' },
        ],
      },
    };
  
    pdfMake.createPdf(docDefinition as any).open();
  }
  
  private formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  
  
}