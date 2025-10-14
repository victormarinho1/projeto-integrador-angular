import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface City {
    name: string;
    code: string;
}
@Component({
  selector: 'app-teste',
  imports: [Menu,ButtonModule, AvatarModule, FontAwesomeModule, PasswordModule, CommonModule,FormsModule],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.css'
})
export class TesteComponent {
    faCoffee = faCoffee;
        value!: string;

items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                items: [
                    {
                        label: 'Logout',
                        icon: 'pi pi-refresh'
                    },
                    {
                        label: 'Perfil',
                        icon: 'pi pi-upload'
                    }
                ]
            }
        ];
    }
}
