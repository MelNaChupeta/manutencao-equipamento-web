import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { faCircleNotch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EstiloTabelaComponent } from "../../estilo-tabela/estilo-tabela.component";


@Component({
  selector: 'app-manter-funcionario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    EstiloTabelaComponent
],
  templateUrl: './manter-funcionario.component.html',
  styleUrl: './manter-funcionario.component.scss'
})
export class ManterFuncionarioComponent {
  funcionarioForm: FormGroup;
  isValidating: boolean = false;
  isLoading: boolean = false;
  loadingCep: boolean = false;
  faLoading: IconDefinition = faCircleNotch;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router){
      this.funcionarioForm = this.fb.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dataNascimento: ['', [Validators.required]],
        senha: ['', [Validators.required]]
      })
    }

    get nome(){
      return this.funcionarioForm.get('nome');
    }

    get email(){
      return this.funcionarioForm.get('email');
    }

    get dataNascimento(){
      return this.funcionarioForm.get('dataNascimento');
    }

    get senha(){
      return this.funcionarioForm.get('senha');
    }

    async onSubmit(){
      if (this.funcionarioForm.invalid){
        return;
      }

      this.isValidating = true;
      this.isLoading = true;

      const funcionario = this.funcionarioForm.value;

      this.funcionarioService.funcionario(funcionario).subscribe({
        next: (response) => {
          setTimeout(() => {
            this.isValidating = false;
            this.isLoading = false;
            this.router.navigate(['/']);
          }, 3000);
        },
  
        error: (error) => {
          this.isValidating = false;
          this.isLoading = false;
          this.router.navigate(['/']);
  
          let message = 'Ocorreu um erro ao processar a requisi&ccedil;%atilde;o.';
  
        }
      });

    }

    @ViewChild('modal') modal!: ElementRef;

    modalOpen(){
      this.modal.nativeElement.showModal();
    }

    modalClose(){
      this.modal.nativeElement.close();
    }

    onSubmitModal(){
      this.modalClose();
    }

}