import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { CardTestimonyComponent } from './components/card-mini-usuario/card-mini-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlagPaisByTelefoneCodePipe } from './pipes/flag-pais-by-telefone-code.pipe';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmaAcaoComponent } from './components/confirma-acao/confirma-acao.component';
import { NavPaginacaoComponent } from './components/nav-paginacao/nav-paginacao.component';

@NgModule({
  declarations: [
    FormUsuarioComponent,
    CardTestimonyComponent,
    FlagPaisByTelefoneCodePipe,
    ConfirmaAcaoComponent,
    NavPaginacaoComponent
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
  exports: [CardTestimonyComponent, FlagPaisByTelefoneCodePipe, NavPaginacaoComponent],
  providers: [provideNgxMask()],
})
export class SharedModule { }
