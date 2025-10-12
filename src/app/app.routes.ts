import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { HomeComponent } from './components/home/home.component';
import { DenunciasListComponent } from './denuncias/denuncias-list/denuncias-list.component';

export const routes: Routes = [
    {path:"", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    {path:"cadastro-denuncia", component:DenunciasComponent},
    {path:"lista-denuncias", component:DenunciasListComponent},
    {path:"home", component:HomeComponent},
];
