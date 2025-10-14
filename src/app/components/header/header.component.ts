import { Component, OnInit } from '@angular/core';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { Menubar } from 'primeng/menubar';
import { Button } from "primeng/button";

@Component({
  selector: 'app-header',
  imports: [Menubar, AvatarModule, Menu],
  standalone:true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
 items: MenuItem[] | undefined;
 itemsAvatar: MenuItem[] | undefined;

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

         this.itemsAvatar = [
            {
                items: [
                    {
                        label: 'Logout',
                        icon: 'pi pi-power-off'
                    }
                ]
            }
        ];
    }
}
