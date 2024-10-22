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
import { ListarCategoriaComponent } from './components/categoria/listar-categoria/listar-categoria.component';
import { ManterCategoriaComponent } from './components/categoria/manter-categoria/manter-categoria.component';
import { NovaCategoriaComponent } from './components/categoria/nova-categoria/nova-categoria.component';
import { InserirFuncionarioComponent } from './components/funcionario/inserir-funcionario/inserir-funcionario.component';
import { EditarFuncionarioComponent } from './components/funcionario/editar-funcionario/editar-funcionario.component';
import { RelatorioReceitaComponent } from './components/funcionario/relatorio-receita/relatorio-receita.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserRole } from './models/userRole';

export const routes: Routes = [
    {
        path: 'inicio/clientes',
        component: HomeComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'inicio/funcionarios',
        component: HomeStaffComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'solicitacoes/listar',
        component: VerSolicitacoesComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'solicitacao/finalizar/:idSolicitacao',
        component: FinalizarSolicitacaoComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'solicitacao/orcar/:idSolicitacao',
        component: EfetuarOrcamentoComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'solicitacao/resolver/:idSolicitacao',
        component: EfetuarManutencaoComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'funcionario/manter',
        component: ManterFuncionarioComponent,
        canActivate: [AuthGuard],
        data: {
            role: UserRole.funcionario
        } 
    },
    {
        path: 'funcionario/cadastrar',
        component: InserirFuncionarioComponent,
        canActivate: [AuthGuard] ,
        data: {
            role: UserRole.funcionario
        }
    },
    {
        path: 'funcionario/editar/:idFuncionario',
        component: EditarFuncionarioComponent,
        canActivate: [AuthGuard] ,
        data: {
            role: UserRole.funcionario
        }
    },
    {
        path: 'cadastro',
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
        path: 'solicitacao/cadastrar',
        component: NovaSolicitacaoComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'solicitacao/:idSolicitacao',
        component: ManterSolicitacaoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categoria/editar/:idCategoria',
        component: ManterCategoriaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categoria/cadastrar',
        component: NovaCategoriaComponent,
        canActivate: [AuthGuard],
        data: {
            role: UserRole.funcionario
        }
    },
    {
        path: 'categorias/listar',
        component: ListarCategoriaComponent,
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