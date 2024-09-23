import { Component } from '@angular/core';
import mockOrcamento from './mockOrcamento.json';


@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrl: './efetuar-orcamento.component.scss'
})
export class EfetuarOrcamentoComponent {

  data = mockOrcamento

}
