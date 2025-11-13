import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AvatarModule } from 'primeng/avatar';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Chart } from 'chart.js';

interface StatusData {
  total_novas: number;
  total_em_andamento: number;
  total_concluidas: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule, AvatarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  basicData: any;
  basicData2: any;
  basicOptions: any;
  basicOptions2: any;

  dashboardService = inject(DashboardService);
  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);

  realizadas = 0;
  novas = 0;
  andamento = 0;
  concluidas = 0;

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    // registra plugin customizado
    Chart.register({
      id: 'centerText',
      afterDraw: (chart) => {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;

        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.font = 'bold 22px sans-serif';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('150', centerX, centerY - 10); // valor fixo
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#666';
        ctx.fillText('Total', centerX, centerY + 15);
        ctx.restore();
      }
    });

    this.initChart();
  }
}


  /** 🔹 Inicializa os gráficos */
  initChart() {
    if (!isPlatformBrowser(this.platformId)) return;

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const primaryColor = documentStyle.getPropertyValue('--p-primary-color');

    // 📊 Gráfico de status
    this.dashboardService.showTotalStatus().subscribe((d: StatusData) => {
      this.novas = d.total_novas;
      this.andamento = d.total_em_andamento;
      this.concluidas = d.total_concluidas;

      this.basicData = {
        labels: ['Novas', 'Em andamento', 'Concluídas'],
        datasets: [
          {
            label: 'Denúncias',
            data: [d.total_novas, d.total_em_andamento, d.total_concluidas],
            backgroundColor: ['#f87171', '#facc15', '#4ade80'],
            borderColor: ['#dc2626', '#ca8a04', '#16a34a'],
            borderWidth: 1,
          },
        ],
      };
    });

    // 📈 Gráfico mensal
    this.basicData2 = {
      labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
      datasets: [
        {
          label: 'Denúncias',
          data: [540, 325, 702, 620, 400, 550, 670, 720, 830, 500, 650, 710],
          backgroundColor: Array(12).fill(primaryColor),
        },
      ],
    };

    // ⚙️ Opções Doughnut
    this.basicOptions = {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
    };

    // ⚙️ Opções Bar
    this.basicOptions2 = {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
        centerText: {}

      },
      scales: {
        x: {
          ticks: { color: textColorSecondary },
          grid: { display: false },
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: 'rgba(0,0,0,0.05)' },
        },
      },
      onHover: (event: any, chartElement: any) => {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      },
    };

    this.cd.markForCheck();
  }
}
