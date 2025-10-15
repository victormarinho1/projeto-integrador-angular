import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-usuarios-list',
  imports: [TableModule, ToggleSwitchModule,FormsModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent implements OnInit{
  usuarios:any[] = [];
  private usuariosService = inject(UsuarioService)
  
  ngOnInit(): void {
     this.usuariosService.findAll().subscribe(data=>{
        this.usuarios = data
        console.log(data)
    });
  }

}
