import { Component, inject, OnInit } from '@angular/core';
import { DenunciaService } from '../../services/denuncia/denuncia.service';

@Component({
  selector: 'app-denuncias-list',
  imports: [],
  templateUrl: './denuncias-list.component.html',
  styleUrl: './denuncias-list.component.css'
})
export class DenunciasListComponent implements OnInit{

  private denunciaService = inject(DenunciaService)
  ngOnInit(): void {
    let r = this.denunciaService.findAll()
    console.log(r)
  }

}
