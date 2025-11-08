import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DenunciaService } from '../services/denuncia/denuncia.service';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-denuncias',
  standalone:true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, ToastModule, ButtonModule, Dialog, FormsModule],
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.css',
  providers:[MessageService]

})

export class DenunciasComponent implements OnInit{
  private http = inject(HttpClient);
  private denunciaService = inject(DenunciaService);
  constructor(private messageService: MessageService) {}

  modalVisible: boolean = false;
  protocolo:String = '';
  files: File[] = [];


  denunciaForm = new FormGroup({
    descricao: new FormControl('', [Validators.required]),
    imagens: new FormControl(null),
    cep: new FormControl('', []),
    enderecoCompleto: new FormControl('', []),
    cidade: new FormControl('', []),
    estado: new FormControl('', []),
    rua: new FormControl('', []),
    bairro: new FormControl('', []),
    latitude: new FormControl(null),
    longitude: new FormControl(null),
    prioridade: new FormControl('MEDIA', [Validators.required])
  });

  onSubmit(){
    this.denunciaService.uploadImage(this.files)?.subscribe();
    this.denunciaForm.setControl('imagens', new FormControl(null));  // if imagens is an array
    this.denunciaService.create(this.denunciaForm.value).subscribe({
      next: denuncia => {
      this.protocolo = denuncia.body.protocolo;
      this.denunciaForm.reset();
      this.modalVisible = true;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sua denuncia foi cadastrada e numero de protocolo gerado é ' + this.protocolo, life: 3000 });
      },
      error: err =>{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Não foi possivel cadastrar sua denuncia', life: 3000 });

      }
    });

  }


  onFilesSelected(event: any): void {
    this.files = Array.from(event.target.files);
  }


  localizacaoAtual(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
          (position) =>{
            if(position){
              let lat:number|null = position.coords.latitude;
              let long:number|null = position.coords.longitude;
              const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json&accept-language=pt-BR`;
              this.http.get(url).subscribe((endereco:any)=>{
              this.denunciaForm.get('cidade')?.setValue(endereco.address.city);
              this.denunciaForm.get('cep')?.setValue(endereco.address.postcode);
              this.denunciaForm.get('estado')?.setValue(this.buscarSigla(endereco.address.state));
              this.denunciaForm.get('enderecoCompleto')?.setValue(endereco.display_name);
              this.denunciaForm.get('rua')?.setValue(endereco.address.road);
              this.denunciaForm.get('bairro')?.setValue(endereco.address.suburb);
            })
            }
          }
        )
      }
    }

    ngOnInit(): void {
    console.log(this.buscarSigla('São Paulo'))

    }

    getEnderecoOSM(lat: number|null, lng: number|null) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=-22.9191&lon=-47.0659&format=json&accept-language=pt-BR`;
  return this.http.get(url);
}

copiarTexto(inputElement: HTMLInputElement) {
  inputElement.select();
  document.execCommand('copy');

  console.log('Texto copiado:', inputElement.value);
}

buscarSigla(nomeEstado: string): string | null {
  const estados: Record<string, string> = {
    "acre": "AC",
    "alagoas": "AL",
    "amapá": "AP",
    "amazonas": "AM",
    "bahia": "BA",
    "ceará": "CE",
    "distrito federal": "DF",
    "espírito santo": "ES",
    "goiás": "GO",
    "maranhão": "MA",
    "mato grosso": "MT",
    "mato grosso do sul": "MS",
    "minas gerais": "MG",
    "pará": "PA",
    "paraíba": "PB",
    "paraná": "PR",
    "pernambuco": "PE",
    "piauí": "PI",
    "rio de janeiro": "RJ",
    "rio grande do norte": "RN",
    "rio grande do sul": "RS",
    "rondônia": "RO",
    "roraima": "RR",
    "santa catarina": "SC",
    "são paulo": "SP",
    "sergipe": "SE",
    "tocantins": "TO",
  };

  const nomeNormalizado = nomeEstado.trim().toLowerCase();

  return estados[nomeNormalizado] || null;
};

}
