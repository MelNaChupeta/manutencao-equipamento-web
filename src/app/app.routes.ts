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
import { ManterFuncionarioComponent } from './components/funcionario/manter-funcionario/manter-funcionario.component';
import { ListarCatergoriaComponent } from './components/categoria/listar-catergoria/listar-catergoria.component';
import { ManterCatergoriaComponent } from './components/categoria/manter-catergoria/manter-catergoria.component';
import { NovaCatergoriaComponent } from './components/categoria/nova-catergoria/nova-catergoria.component';
import { InserirFuncionarioComponent } from './components/funcionario/inserir-funcionario/inserir-funcionario.component';
import { EditarFuncionarioComponent } from './components/funcionario/editar-funcionario/editar-funcionario.component';
import { RelatorioReceitaComponent } from './components/funcionario/relatorio-receita/relatorio-receita.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserRole } from './models/userRole';

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
        canActivate: [AuthGuard],
        data: {
            role: UserRole.funcionario
        } 
    },
    {
        path: 'inserir-funcionario',
        component: InserirFuncionarioComponent,
        canActivate: [AuthGuard] ,
        data: {
            role: UserRole.funcionario
        }
    },
    {
        path: 'editar-funcionario/:idFuncionario',
        component: EditarFuncionarioComponent,
        canActivate: [AuthGuard] ,
        data: {
            role: UserRole.funcionario
        }
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
        path: '',
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
        path: 'categorias/:idCategoria',
        component: ManterCatergoriaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categoria/criar',
        component: NovaCatergoriaComponent,
        canActivate: [AuthGuard],
        data: {
            role: UserRole.funcionario
        }
    },
    {
        path: 'categorias',
        component: ListarCatergoriaComponent,
        canActivate: [AuthGuard],
        data: {
            role: UserRole.funcionario
        }
    },
    {
        path: 'relatorio/receitas',
        component: RelatorioReceitaComponent,
        canActivate: [AuthGuard],
        data: {
            role: UserRole.funcionario
        }
    },
    { path: '**', pathMatch: 'full',  
        component: PageNotFoundComponent }, 
];