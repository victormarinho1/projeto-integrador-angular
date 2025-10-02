import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {
  private http = inject(HttpClient);
  private readonly apiUrl= environment.apiUrl;

  create(denuncia:any){
    this.http.post(`${this.apiUrl}/denuncias`,denuncia).subscribe(r =>{
      console.log(require)
    })
  }
  constructor() { }
}
