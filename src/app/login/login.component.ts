import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor(private messageService: MessageService) {}

  showPassword = false;


  isMobile:any = false;
  loginForm = new FormGroup({
    email: new FormControl('admin@example.com', [Validators.required, Validators.email]),
    senha: new FormControl('admin', [Validators.required])
  });

  onSubmit() {
    const email = this.loginForm.get('email')?.value ?? '';
    const senha = this.loginForm.get('senha')?.value ?? '';

    this.authService.login(email, senha).subscribe({
      next: user => {
        console.log('Usuário logado:', user);
        this.router.navigate(['/home']);
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'E-mail ou senha incorretos', life: 3000 });

      } 
    });
  }

  togglePassword() {
  this.showPassword = !this.showPassword;
}
}
