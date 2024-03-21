import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { CardTestimonyComponent } from './components/card-mini-usuario/card-mini-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlagPaisByTelefoneCodePipe } from './pipes/flag-pais-by-telefone-code.pipe';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    FormUsuarioComponent,
    CardTestimonyComponent,
    FlagPaisByTelefoneCodePipe,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgSelectModule,
  ],
  exports: [CardTestimonyComponent, FlagPaisByTelefoneCodePipe],
  providers: [provideNgxMask()],
})
export class SharedModule { }
