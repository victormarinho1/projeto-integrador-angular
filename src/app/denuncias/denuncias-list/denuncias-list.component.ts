import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DenunciaService } from '../../services/denuncia/denuncia.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Status {
  name: string;
  value: string;
}
@Component({
  selector: 'app-denuncias-list',
  standalone: true,
  imports: [TableModule, TagModule, CommonModule, ButtonModule, SelectModule, TagModule, FormsModule, RouterLink],
  templateUrl: './denuncias-list.component.html',
  styleUrl: './denuncias-list.component.css'
})
export class DenunciasListComponent implements OnInit {
  denuncias: any[] = [];
  loading: boolean = false;
  private denunciaService = inject(DenunciaService);
  private cdr = inject(ChangeDetectorRef);
  statuses: Status[] | undefined;
  selectedStatus: String = "teste";


  ngOnInit() {
    this.statuses = [
      { name: 'Nova', value: 'NOVA' },
      { name: 'Em andamento', value: 'EM_ANDAMENTO' },
      { name: 'Concluída', value: 'CONCLUIDA' }
    ];

  }


  ngAfterViewInit() {
    this.denunciaService.findAll().subscribe(data => {
      this.denuncias = data;
      this.cdr.detectChanges();
    });
  }
  getSeverity(status: string) {
    switch (status) {
      case 'NOVA':
        return 'success';
      case 'EM_ANDAMENTO':
        return 'warn';
      case 'CONCLUIDA':
        return 'secondary';
      default: return null;
    }
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/image.png';
  }

  atenderDenuncia(id:number) {
   this.denunciaService.atenderDenuncia(id).subscribe(d =>{
    console.log(d)
   })
  }

}
