import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { CardTestimonyComponent } from './components/card-mini-usuario/card-mini-usuario.component';

@NgModule({
  declarations: [
    ModalComponent,
    FormUsuarioComponent,
    CardTestimonyComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  exports: [ModalComponent, CardTestimonyComponent]
})
export class SharedModule { }
