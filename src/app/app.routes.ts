import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FazerTransacaoComponent } from './pages/fazer-transacao/fazer-transacao.component';
import { MinhaContaComponent } from './pages/minha-conta/minha-conta.component';

export const routes: Routes = [

    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'nova-transacao',
        component: FazerTransacaoComponent
    },
    {
        path: 'minha-conta',
        component: MinhaContaComponent
    }

];
