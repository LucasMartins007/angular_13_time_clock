import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/enviroment';
import { HttpUtilService } from './http-util.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly PATH: string = 'funcionarios';
  private readonly PATH_FUNC_POR_EMPRESA: string = `${this.PATH}/empresa/{empresaId}`;


  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  listarFuncionariosPorEmpresa(): Observable<any> {
    return this.http.get(env.baseApiUrl + this.PATH_FUNC_POR_EMPRESA.replace('{empresaId}', this.httpUtil.obterIdEmpresa()),
      this.httpUtil.getHeaders());
  }
}
