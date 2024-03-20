import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';



@NgModule({
  declarations: [
    ModalComponent,
    FormUsuarioComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ModalComponent]
})
export class SharedModule { }
