import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importe seu serviço de denúncias
// import { DenunciaService } from 'src/app/services/denuncia.service';

// --- Imports (se for standalone) ---
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { DenunciaService } from '../services/denuncia/denuncia.service';

@Component({
  selector: 'app-atender-denuncia',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    GalleriaModule,
    SelectButtonModule,
    TagModule,
    MessageModule,
  ],
  templateUrl: './atender-denuncia.component.html',
})
export class AtenderDenunciaComponent implements OnInit {
  denuncia: any; // Armazena os dados da denúncia
  atendimentoForm: FormGroup;
  prioridadeOptions: any[];
  isLoading = true;
  denunciaService = inject(DenunciaService);
  cdr = inject(ChangeDetectorRef);


  // Imagens de exemplo para a galeria (substitua pelo seu array de imagens)
  images: any[] = [
    {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg',
      alt: 'Imagem 1',
    },
    {
      itemImageSrc: 'https://primefaces.org/cdn/primeng/images/demo/product/blue-band.jpg',
      thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/demo/product/blue-band.jpg',
      alt: 'Imagem 2',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder // private denunciaService: DenunciaService
  ) {
    this.prioridadeOptions = [
      { label: 'Baixa', value: 'BAIXA', icon: 'pi pi-arrow-down' },
      { label: 'Média', value: 'MEDIA', icon: 'pi pi-equals' },
      { label: 'Alta', value: 'ALTA', icon: 'pi pi-arrow-up' },
    ];

    this.atendimentoForm = this.fb.group({
      prioridade: ['MEDIA', Validators.required],
      status: ['EM_ANDAMENTO'],
    });
  }

  ngOnInit(): void {
    // 1. Pega o 'id' da URL
    const protocolo:string | null = this.route.snapshot.paramMap.get('id');
    if(protocolo){
      this.denunciaService.buscarDenunciaPorProtocolo(protocolo).subscribe(data => {
        this.denuncia = data;
        this.images = data.imagens;
        this.atendimentoForm.patchValue({
          prioridade: data.prioridade,
          status: data.status
        });
        this.isLoading = false;
        console.log(this.images )
        this.cdr.detectChanges();
      });
    }
  }


 // CÓDIGO CORRIGIDO
getSeverity(
  status: string
): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | null | undefined { // <-- A MUDANÇA ESTÁ AQUI
  if (status === 'NOVA') return 'info';
  if (status === 'EM_ANDAMENTO') return 'warn';
  if (status === 'CONCLUIDA') return 'success';
  return 'secondary';
}

  salvarAlteracoes() {
    if (this.atendimentoForm.invalid) return;

    console.log('Salvando dados...', this.atendimentoForm.value);
    // Lógica para enviar o formulário (ex: mudar status para 'EM_ANDAMENTO' e salvar prioridade)
    // this.denunciaService.atualizarDenuncia(this.denuncia.id, this.atendimentoForm.value).subscribe(() => {
    //   ...
    // });
  }

  finalizarDenuncia() {
    console.log('Finalizando denúncia...');
    // Lógica para marcar como "CONCLUIDA"
    // this.denunciaService.atualizarDenuncia(this.denuncia.id, { status: 'CONCLUIDA' }).subscribe(() => {
    //   this.router.navigate(['/conselheiro/dashboard']); // Volta para a lista
    // });
  }
}
