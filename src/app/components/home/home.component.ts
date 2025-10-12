import { DenunciasListComponent } from './../../denuncias/denuncias-list/denuncias-list.component';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [HeaderComponent,DenunciasListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{


}
