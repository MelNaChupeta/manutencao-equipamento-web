import { Component } from '@angular/core';
// // RF004 - Solicitação de Manutenção: O cliente registra uma solicitação de manutenção
// // que deve conter:
// Descrição do equipamento,
// Categoria do equipamento,
// Descrição do defeito.
// // Esta solicitação é armazenada contendo
// data e hora e também o estado
// ABERTA, que vai para a empresa apresentar um
// // orçamento.
@Component({
  selector: 'home',
  template: `
    <div class="main-content-container">
      <h1>Nova solicitação de manutenção</h1>
      <!-- <form (ngSubmit)="onSubmit()" #form="ngForm"> -->
      <form class="flex flex-col gap-5 mt-7">
        <div class="flex flex-col gap-2">
          <label for="message">Descrição do equipamento:</label>
          <textarea
            class="input"
            id="description"
            name="Descrição"
            required
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <label for="category">Categoria do equipamento:</label>
          <select class="input" id="category" name="category" required>
            <option value="" disabled selected hidden>Selecione</option>
            <option>ei</option>
          </select>
        </div>

        <div class="flex flex-col gap-2">
          <label for="message">Descrição do defeito:</label>
          <textarea
            class="input"
            id="description"
            name="Descrição"
            required
          ></textarea>
        </div>

        <button class="btn-primary mt-7" type="submit">Solicitar</button>
      </form>
    </div>
  `,
  standalone: true,
})
export class NovaSolicitacaoComponent {}
