import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [Menubar, AvatarModule],
  standalone:true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
 items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-home'
            },
            {
                label: 'Denuncias',
                icon: 'pi pi-exclamation-circle',
                items: [
                    {
                        label: 'Criar',
                        icon: 'pi pi-plus'
                    },
                    {
                        label: 'Lista de denuncias',
                        icon: 'pi pi-list-check'
                    }
                ]
            }

        ]
    }
}
