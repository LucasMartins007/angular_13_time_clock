import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HttpUtilService, Lancamento, LancamentoService, TipoMarcacao } from 'src/app/shared';

declare var navigator: any;

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  private dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService,
    private httpUtilService: HttpUtilService
  ) { };

  ngOnInit(): void {
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
    this.obterGeoLocation();
    this.ultimoTipoLancado = '';
    this.obterUltimoLancamento();
  }

  iniciarTrabalho(): void {
    this.cadastrar(TipoMarcacao.INICIO_TRABALHO);
  }

  iniciarAlmoco(): void {
    this.cadastrar(TipoMarcacao.INICIO_ALMOCO);
  }

  terminarAlmoco(): void {
    this.cadastrar(TipoMarcacao.TERMINO_ALMOCO);
  }

  terminarTrabalho(): void {
    this.cadastrar(TipoMarcacao.TERMINO_TRABALHO);
  }

  cadastrar(tipoMarcacao: TipoMarcacao): void {
    const lancamento: Lancamento = new Lancamento(
      this.dataAtualEn,
      tipoMarcacao,
      this.geoLocation ?? '',
      this.httpUtilService.obterIdUsuario()
    );

    this.lancamentoService.cadastrar(lancamento)
      .subscribe({
        next: (data) => {
          const msg: string = "Lancamento realizado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/funcionario/listagem']);
        },
        error: (err) => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      });
  }

  obterUltimoLancamento(): void {
    this.lancamentoService.buscarUltimoTipoLancado()
      .subscribe({
        next: (data) => {
          this.ultimoTipoLancado = data.data ? data.data.tipo : '';
        },
        error: (error) => {
          const msg: string = "Erro obtendo o último lançamento.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      });
  }

  obterUrlMapa(): string {
    return `https://www.google.com/maps/search/?api=1&query=${this.geoLocation}`;
  }

  obterGeoLocation(): void {
    if (navigator.geoLocation) {
      navigator.geoLocation.getCurrentPosition(position => this.geoLocation = `${position.coords.latitude}, ${position.coords.longitude}`);
    }
    this.geoLocation = null;
  }

  exibirInicioTrabalho(): boolean {
    return this.ultimoTipoLancado == '' || this.ultimoTipoLancado == TipoMarcacao.TERMINO_TRABALHO;
  }

  exibirInicioAlmoco(): boolean {
    return this.ultimoTipoLancado == TipoMarcacao.INICIO_TRABALHO;
  }

  exibirTerminoAlmoco(): boolean {
    return this.ultimoTipoLancado == TipoMarcacao.INICIO_ALMOCO;
  }

  exibirTerminoTrabalho(): boolean {
    return this.ultimoTipoLancado == TipoMarcacao.INICIO_TRABALHO || this.ultimoTipoLancado == TipoMarcacao.TERMINO_ALMOCO;
  }


}
