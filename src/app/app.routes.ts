import { Routes } from '@angular/router';
import { AuthGuard } from '../app/guard/auth.guard';
import { SignupComponent } from './components/cliente/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/cliente/home/home.component';
import { HomeStaffComponent } from './components/funcionario/home-staff/home-staff.component';
import { VerSolicitacoesComponent } from './components/funcionario/ver-solicitacoes/ver-solicitacoes.component';
import { FinalizarSolicitacaoComponent } from './components/funcionario/finalizar-solicitacao/finalizar-solicitacao.component';
import { EfetuarManutencaoComponent } from './components/funcionario/efetuar-manutencao/efetuar-manutencao.component';
import { EfetuarOrcamentoComponent } from './components/funcionario/efetuar-orcamento/efetuar-orcamento.component';
import { NovaSolicitacaoComponent } from './components/cliente/nova-solicitacao/nova-solicitacao.component';
import { ManterSolicitacaoComponent } from './components/cliente/manter-solicitacao/manter-solicitacao.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ManterFuncionarioComponent } from './components/funcionario/manter-funcionario/manter-funcionario.component';
import { ListarCatergoriaComponent } from './components/categoria/listar-catergoria/listar-catergoria.component';
import { ManterCatergoriaComponent } from './components/categoria/manter-catergoria/manter-catergoria.component';
import { NovaCatergoriaComponent } from './components/categoria/nova-catergoria/nova-catergoria.component';
import { InserirFuncionarioComponent } from './components/funcionario/inserir-funcionario/inserir-funcionario.component';
import { EditarFuncionarioComponent } from './components/funcionario/editar-funcionario/editar-funcionario.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'home-staff',
        component: HomeStaffComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'ver-solicitacoes',
        component: VerSolicitacoesComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'finalizar-solicitacao/:idSolicitacao',
        component: FinalizarSolicitacaoComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'efetuar-orcamento/:idSolicitacao',
        component: EfetuarOrcamentoComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'efetuar-manutencao/:idSolicitacao',
        component: EfetuarManutencaoComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'manter-funcionario',
        component: ManterFuncionarioComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'inserir-funcionario',
        component: InserirFuncionarioComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'editar-funcionario/:idFuncionario',
        component: EditarFuncionarioComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'solicitacao',
        component: NovaSolicitacaoComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'solicitacao/:idSolicitacao',
        component: ManterSolicitacaoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categoria/:idCategoria',
        component: ManterCatergoriaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categoria',
        component: NovaCatergoriaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categorias',
        component: ListarCatergoriaComponent,
        canActivate: [AuthGuard]
    }
];