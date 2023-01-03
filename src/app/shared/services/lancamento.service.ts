import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/enviroment';
import { Lancamento } from '../models';

import { HttpUtilService } from './http-util.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private readonly PATH: string = 'lancamentos';
  private readonly PATH_ULTIMO_LANC: string = `${this.PATH}/funcionario/{funcionarioId}/ultimo`;
  private readonly PATH_LANCAMENTOS: string = `${this.PATH}/funcionario/{funcionarioId}`;
  private readonly PATH_TODOS_LANC: string = `${this.PATH}/funcionario/{funcionarioId}/todos`;

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  buscarUltimoTipoLancado(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH_ULTIMO_LANC.replace('{funcionarioId}', this.httpUtil.obterIdUsuario()));
  }

  cadastrar(lancamento: Lancamento): Observable<any> {
    console.log(JSON.stringify(lancamento));
    return this.http.post(
      env.baseApiUrl + this.PATH,
      lancamento,
    );
  }

  listarTodosLancamentos(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH_TODOS_LANC.replace('{funcionarioId}',
      this.httpUtil.obterIdUsuario())
    );
  }

  listarLancamentosPorFuncionario(funcionarioId: string, pagina: number, ordem: string, direcao: string): Observable<any> {
    const url: string = env.baseApiUrl + this.PATH_LANCAMENTOS.replace("{funcionarioId}", funcionarioId);

    const params: string = `?pag=${pagina}&ord=${ordem}&dir=${direcao}`;

    return this.http.get(url + params);
  }

  remover(lancamentoId: string): Observable<any> {
    return this.http.delete(env.baseApiUrl + this.PATH + "/" + lancamentoId);
  }

  buscarPorId(lancamentoId: string): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH + '/' + lancamentoId);
  }

  atualizar(lancamento: Lancamento): Observable<any> {
    return this.http.put(env.baseApiUrl + this.PATH + '/' + lancamento.id, lancamento);
  }

}
