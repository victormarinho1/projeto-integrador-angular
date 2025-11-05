import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;



  create(denuncia: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/denuncias`, denuncia,{
      observe: 'response'
    });
  }

 findAll(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/denuncias`);
}

  atenderDenuncia(id:number){
    return this.http.patch(`${this.apiUrl}/denuncias/${id}/atender`,{});
  }

}
