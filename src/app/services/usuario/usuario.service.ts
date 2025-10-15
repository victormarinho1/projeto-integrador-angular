import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl

  findAll(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }
}
