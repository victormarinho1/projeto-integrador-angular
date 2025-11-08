import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// Importe os módulos necessários se o componente for STANDALONE
// (Se não for, importe no app.module.ts)
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// REMOVEMOS InputMaskModule e adicionamos InputTextModule
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-consulta-protocolo',
  imports: [
   CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    TimelineModule,
    CardModule,
    MessageModule,
    ProgressSpinnerModule,
    InputTextModule, // <-- ADICIONADO
  ],
  templateUrl: './consultaprotocolo.component.html',
})
export class ConsultaProtocoloComponent {

 consultaForm = new FormGroup({
    protocolo: new FormControl('', [Validators.required])
  });




  isLoading = false;
  errorMessage: string | null = null;
  denuncia: any = null;
  submitted = false; // Para controlar quando exibir erros de validação

  // Regex para validar o formato: DEN-14digitos-8alfanumericos
  protocolRegex = /^DEN-\d{14}-[A-Z0-9]{8}$/;

  // Getter para facilitar o acesso ao controle no HTML
  get f() {
    return this.consultaForm.controls;
  }

  onSubmit() {
    this.submitted = true; // Marca que o form foi submetido
    if (this.consultaForm.invalid) {
      return; // Para se o formulário for inválido
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.denuncia = null;

    const protocolo = this.consultaForm.value.protocolo?.toUpperCase(); // Converte para maiúsculo

    console.log(`Consultando API para o protocolo: ${protocolo}`);

    // --- SIMULAÇÃO DE CHAMADA DE API ---

      this.isLoading = false;

      // SIMULAÇÃO DE SUCESSO (usando seu exemplo)
      if (protocolo === 'DEN-20251106213406-DC6B76DD') {
        this.denuncia = {
          protocolo: 'DEN-20251106213406-DC6B76DD', // <-- ATUALIZADO
          statusAtual: 'Em Verificação de Campo',
          dataAbertura: '06/11/2025', // Data de hoje
          historico: [
            {
              status: 'Denúncia Recebida',
              descricao: 'A denúncia foi registrada em nosso sistema.',
              data: '06/11/2025 21:34',
              icon: 'pi pi-check',
              color: '#60a5fa', // blue-400
            },
            {
              status: 'Análise Preliminar',
              descricao: 'A denúncia foi analisada e classificada como "Alta Prioridade".',
              data: '06/11/2025 21:50',
              icon: 'pi pi-eye',
              color: '#fbbf24', // amber-400
            },
            // Este evento ainda não teria acontecido, mas mantendo para o exemplo
            {
              status: 'Em Verificação de Campo',
              descricao: 'Uma equipe foi encaminhada ao local para apuração.',
              data: 'Aguardando agendamento',
              icon: 'pi pi-users',
              color: '#f97316', // orange-500
            },
          ],
        };
      }
      // SIMULAÇÃO DE NÃO ENCONTRADO
      else {
        this.errorMessage =
          'Protocolo não encontrado. Verifique o número e tente novamente.';
      }

  }

  resetConsulta() {
    this.denuncia = null;
    this.errorMessage = null;
    this.submitted = false;
    this.consultaForm.reset();
  }
}
