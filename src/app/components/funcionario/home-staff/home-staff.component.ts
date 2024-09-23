import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import mockSolicitacoes from './mockSolicitacoes.json';
import { Router, RouterModule } from '@angular/router';

export interface Solicitacao {
  id: number;
  datetime: string;
  client: string;
  productDescription: string;
  status: string;
}

@Component({
  selector: 'app-home-staff',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-staff.component.html',
  styleUrl: './home-staff.component.scss',
})
export class HomeStaffComponent {
  solicitacoes = mockSolicitacoes;

}
