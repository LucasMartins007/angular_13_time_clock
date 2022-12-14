import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {

  constructor() { }

  obterIdUsuario(): string {
    const dadosUsuario = this.obterDadosUsuario();
    
    return dadosUsuario ? dadosUsuario.id : '';
  }
  
  obterIdEmpresa(): string {
    const dadosUsuario = this.obterDadosUsuario();

    return dadosUsuario ? dadosUsuario.empresaId : '';
  }

  obterDadosUsuario() {
    if (!localStorage['token']) {
      return null;
    }
    return JSON.parse(atob(localStorage['token'].split('.')[1]));
  }

  obterPerfil() {
    const dadosUsuario = this.obterDadosUsuario();
    
    return dadosUsuario ? dadosUsuario.role : '';
  }
}
