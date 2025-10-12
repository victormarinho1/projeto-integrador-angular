import { AuthService } from './../services/auth/auth.service';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isMobile:any = false;
  ngOnInit(): void {
    this.isMobile = window.innerWidth < 380;
  }
    private authService = inject(AuthService);
    private router = inject(Router);


    loginForm = new FormGroup({
      email: new FormControl('admin@example.com', [Validators.required, Validators.email]),
      senha: new FormControl('admin', [Validators.required])
    })


    onSubmit(){
      const email = this.loginForm.get('email')?.value ?? '';
      const senha = this.loginForm.get('senha')?.value ?? '';
      this.authService.login(email, senha).subscribe({
        next: (r) =>{
          this.router.navigate(['/home'])
        }
      })
     }

      onResize(event: Event) {
      this.isMobile = (event.target as Window).innerWidth < 700;
  }
}
