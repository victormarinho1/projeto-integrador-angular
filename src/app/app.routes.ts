import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { DenunciasListComponent } from './pages/denuncias-list/denuncias-list.component';

export const routes: Routes = [
    {path:"", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    {path:"cadastro-denuncia", component:DenunciasComponent},
    {path:"lista-denuncias", component:DenunciasListComponent}
];
