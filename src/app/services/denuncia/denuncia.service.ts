import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private apiUrl = environment.apiUrl;



  create(denuncia: any) {

    this.http.post(`${this.apiUrl}/denuncias`, denuncia).subscribe(r => {
      console.log(r);
    });
  }

  findAll() {

    this.http.get(`${this.apiUrl}/denuncias`).subscribe(r => {
      console.log(r);
    });
  }
}
