import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascaraDirective } from './directives/mascara.directive';
import { CpfValidator } from './validators';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';
import { TipoMarcacaoPipe } from './pipes/tipo-marcacao.pipe';
import { DataPipe } from './pipes/data.pipe';

@NgModule({
  declarations: [
    MascaraDirective,
    TipoMarcacaoPipe,
    DataPipe
  ],
  imports: [
    CommonModule
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
