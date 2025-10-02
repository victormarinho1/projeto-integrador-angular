import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  findAll(){
    this.http.get<any>('localhost:3000/usuarios/').subscribe(user =>{
      console.log(user)
    })
  }

  login(email:string, senha:string):Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/usuarios?email=${email}&senha=${senha}`)
  
  }
}
