import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmarDialog } from './components/alert-dialog-simple.component';
import { MascaraDirective } from './directives/mascara.directive';
import { DataPipe } from './pipes/data.pipe';
import { TipoMarcacaoPipe } from './pipes/tipo-marcacao.pipe';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';

@NgModule({
  declarations: [
    MascaraDirective,
    TipoMarcacaoPipe,
    DataPipe,
    ConfirmarDialog
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    MascaraDirective,
    TipoMarcacaoPipe,
    DataPipe
  ],
  providers: [
    PtBrMatPaginatorIntl
  ]
})
export class SharedModule { }
