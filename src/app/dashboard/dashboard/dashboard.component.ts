import { HeaderComponent } from '../../components/header/header.component';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';


interface StatusData {
  total_novas: number;
  total_em_andamento: number;
  total_concluidas: number;
}
@Component({
  selector: 'app-dashboard',
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
basicData: any;

    basicOptions: any;
    dashboardService = inject(DashboardService);
    platformId = inject(PLATFORM_ID);


    constructor(private cd: ChangeDetectorRef) {}

    

    ngOnInit() {
        this.initChart();
        this.dashboardService.showDenunciasAtendidas().subscribe(d =>{
          console.log(d)
        })
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');


            this.dashboardService.showTotalStatus().subscribe((d: StatusData) =>{
                          
                       
            this.basicData = {
                labels: ['Total Novas', 'Total Em andamento', 'Total Concluidas'],
                datasets: [
                    {
                        label: 'Denuncias',
                        data: [d.total_novas,  d.total_em_andamento, d.total_concluidas],
                        backgroundColor: [
                          '#f87171', 
                          '#facc15',
                          '#4ade80'  
                        ],
                        borderColor: [
        '#dc2626', 
        '#ca8a04', 
        '#16a34a' 
      ],
      borderWidth: 1    
                    },
                ],
            };
 });
            this.basicOptions = {
                cutout: '60%',
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                }
            };
            this.cd.markForCheck()
        }
    }
}
