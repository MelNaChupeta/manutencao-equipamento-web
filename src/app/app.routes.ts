import { Routes } from '@angular/router';
import { AuthGuard } from '../app/guard/auth.guard';
import { SignupComponent } from './components/cliente/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/cliente/home/home.component';
import { NovaSolicitacaoComponent } from './components/cliente/nova-solicitacao/nova-solicitacao.component';
import { ManterSolicitacaoComponent } from './components/cliente/manter-solicitacao/manter-solicitacao.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
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
    }
];