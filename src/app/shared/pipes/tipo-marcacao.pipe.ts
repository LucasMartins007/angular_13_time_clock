import { Pipe, PipeTransform } from '@angular/core';
import { TipoMarcacao } from '../models';

@Pipe({
  name: 'tipoMarcacao'
})
export class TipoMarcacaoPipe implements PipeTransform {

  transform(tipoMarcacao: TipoMarcacao, args?: any): string {
    return this.obterTexto(tipoMarcacao);
  }

  obterTexto(tipoMarcacao: TipoMarcacao): string {
    switch (tipoMarcacao) {
      case TipoMarcacao.INICIO_TRABALHO:
        return 'Início do trabalho';

      case TipoMarcacao.INICIO_ALMOCO:
        return 'Início do almoço';

      case TipoMarcacao.TERMINO_ALMOCO:
        return 'Término do trabalho';

      case TipoMarcacao.TERMINO_TRABALHO:
        return 'Término do almoço';

      default:
        return tipoMarcacao;
    }
  }

}
