import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { SelectModule } from 'primeng/select';
import { AvatarModule } from 'primeng/avatar';

interface City {
    name: string;
    code: string;
}
@Component({
  selector: 'app-teste',
  imports: [Menu,ButtonModule, AvatarModule],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.css'
})
export class TesteComponent {
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
