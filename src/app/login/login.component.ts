import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

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
      error: err => console.error(err)
    });
  }

  togglePassword() {
  this.showPassword = !this.showPassword;
}
}
