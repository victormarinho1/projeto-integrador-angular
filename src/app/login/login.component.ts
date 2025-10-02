import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isMobile:any = false;
  router: any;
  ngOnInit(): void {
    this.isMobile = window.innerWidth < 380;
  }
    private userService = inject(UsuariosService);
   
 
    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required]) 
    })

   
    onSubmit(){
      const email = this.loginForm.get('email')?.value ?? '';
      const senha = this.loginForm.get('senha')?.value ?? '';
      this.userService.login(email, senha).subscribe({
        next: (r) =>{
          this.router.navigate(['/denuncias'])
        }
      })
     }

      onResize(event: Event) {
      this.isMobile = (event.target as Window).innerWidth < 700;
  }
}
