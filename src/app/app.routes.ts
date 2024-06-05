import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FazerTransacaoComponent } from './pages/fazer-transacao/fazer-transacao.component';
import { MinhaContaComponent } from './pages/minha-conta/minha-conta.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { EsqueciSenhaComponent } from './pages/esqueci-senha/esqueci-senha.component';
import { AlterarRoleComponent } from './pages/alterar-role/alterar-role.component';
import { FaturaComponent } from './pages/fatura/fatura.component';

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
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'cadastro',
        component: CadastroComponent
    },
    {
        path: 'esqueci-senha',
        component: EsqueciSenhaComponent
    },
    {
        path: 'alterar-role',
        component: AlterarRoleComponent
    },
    {
        path: "fatura",
        component: FaturaComponent
    }

];
