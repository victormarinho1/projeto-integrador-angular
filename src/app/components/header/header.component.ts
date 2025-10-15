import { Component, inject, OnInit } from '@angular/core';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { Menubar } from 'primeng/menubar';
import { Button } from "primeng/button";
import { TokenModel } from '../../models/token';
import { SharedService } from '../../services/shared/shared.service';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-header',
    imports: [Menubar, AvatarModule, Menu, Button, CommonModule],
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    private sharedService = inject(SharedService)

    items: MenuItem[] | undefined;
    itemsAvatar: MenuItem[] | undefined;
    userToken: TokenModel | null = null;
    darkMode:boolean = false;

    ngOnInit() {
        this.userToken = this.sharedService.decodeToken();
        if (this.userToken?.role === 'ADMIN') {
            this.items = [
                {
                    label: 'Inicio',
                    icon: 'pi pi-home'
                },
                {
                    label: 'Denuncias',
                    icon: 'pi pi-exclamation-circle',
                    items: [
                        { label: 'Criar', icon: 'pi pi-plus' },
                        { label: 'Lista de denúncias', icon: 'pi pi-list-check' }
                    ]
                },
                {
                    label: 'Gerenciar Usuários',
                    icon: 'pi pi-users',
                    items: [
                        { label: 'Adicionar Usuário', icon: 'pi pi-user-plus' },
                        { label: 'Listar Usuários', icon: 'pi pi-users' }
                    ]
                },
                {
                    label: 'Dashboard',
                    icon: 'pi pi-chart-line'
                }
            ];
        } else if (this.userToken?.role === 'CONSELHEIRO') {
            this.items = [
                {
                    label: 'Inicio',
                    icon: 'pi pi-home'
                },
                {
                    label: 'Denuncias',
                    icon: 'pi pi-exclamation-circle',
                    items: [
                        { label: 'Criar', icon: 'pi pi-plus' },
                        { label: 'Minhas Denúncias', icon: 'pi pi-list-check' }
                    ]
                }
            ];
        }
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

    toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
    this.darkMode = !this.darkMode;
}
}
