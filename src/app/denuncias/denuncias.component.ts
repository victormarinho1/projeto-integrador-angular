import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DenunciaService } from '../services/denuncia/denuncia.service';

@Component({
  selector: 'app-denuncias',
  imports: [ReactiveFormsModule],
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.css'
})

export class DenunciasComponent implements OnInit{  
  private http = inject(HttpClient);
  private denunciaService = inject(DenunciaService);

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
    this.denunciaService.create(this.denunciaForm.value)
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
              this.denunciaForm.get('estado')?.setValue(endereco.address.state);
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
    
    }
    getEnderecoOSM(lat: number|null, lng: number|null) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=-22.9191&lon=-47.0659&format=json&accept-language=pt-BR`;
  return this.http.get(url);
}
}
