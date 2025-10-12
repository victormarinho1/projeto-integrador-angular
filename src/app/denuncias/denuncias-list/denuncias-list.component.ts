import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DenunciaService } from '../../services/denuncia/denuncia.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-denuncias-list',
  standalone: true,
  imports: [TableModule, CommonModule,ButtonModule],
  templateUrl: './denuncias-list.component.html',
  styleUrl: './denuncias-list.component.css'
})
export class DenunciasListComponent implements OnInit {
  denuncias: any[] = [];
  private denunciaService = inject(DenunciaService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.denunciaService.findAll().subscribe(data => {
      this.denuncias = data;
      this.cdr.detectChanges();
    });
  }
}
