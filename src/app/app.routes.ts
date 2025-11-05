import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { HomeComponent } from './components/home/home.component';
import { DenunciasListComponent } from './denuncias/denuncias-list/denuncias-list.component';
import { TesteComponent } from './components/teste/teste.component';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

export const routes: Routes = [
    {path:"", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    {path:"cadastro-denuncia", component:DenunciasComponent},
    {path:"lista-denuncias", component:DenunciasListComponent},
    {path:"home", component:HomeComponent},
    {path:"admin", component:HomeComponent},
    {path:"teste", component:TesteComponent},
    {path:"usuario-form", component:UsuariosFormComponent},
    {path:"dashboard", component:DashboardComponent}

];
