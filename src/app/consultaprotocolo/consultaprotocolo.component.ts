import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// Importe os módulos necessários se o componente for STANDALONE
// (Se não for, importe no app.module.ts)
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-consulta-protocolo',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,InputMaskModule
  ],
  templateUrl: './consultaprotocolo.component.html',
})
export class ConsultaProtocoloComponent {

 consultaForm = new FormGroup({
    protocolo: new FormControl('', [Validators.required])
  });



  onSubmit() {
  alert('teste')
  }
}