import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  
  register(user:any){
    this.http.post(`${this.apiUrl}/usuarios`,user).subscribe(r =>{
      console.log(r)
    })
  }
  constructor() { }
}
