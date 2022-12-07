import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Lancamento, LancamentoService, TipoMarcacao } from 'src/app/shared';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css']
})
export class AtualizacaoComponent implements OnInit {

  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: string[];

  lancamentoId: string;
  localizacao: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit(): void {
    this.lancamentoId = this.route.snapshot.paramMap.get('lancamentoId');
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.tipos = [
      TipoMarcacao.INICIO_TRABALHO,
      TipoMarcacao.INICIO_ALMOCO,
      TipoMarcacao.TERMINO_ALMOCO,
      TipoMarcacao.TERMINO_TRABALHO,
    ];
    this.gerarForm();
    this.obterDadosLancamento();
  }

  obterLancamento(dados: any): Lancamento {
    const data = moment(dados.data);
    data.set({
      hour: dados.horas,
      minute: dados.minute,
      second: 0
    });

    return new Lancamento(
      data.format('YYYY-MM-DD HH:mm:ss'),
      dados.tipo,
      this.localizacao,
      this.funcionarioId,
      this.lancamentoId
    );
  }

  get funcionarioId(): string {
    return sessionStorage['funcionarioId'];
  }


  atualizar() {
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.lancamentoService.atualizar(this.obterLancamento(dados))
      .subscribe({
        next: (data) => {
          const msg: string = "Lancamento atualizado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      })
  }

  obterDadosLancamento(): void {
    this.lancamentoService.buscarPorId(this.lancamentoId)
      .subscribe({
        next: (data) => {
          const date = data.data.data;
          this.form.get('data').setValue(date.substr(0, 10));
          this.form.get('horas').setValue(date.substr(11, 2));
          this.form.get('minutos').setValue(date.substr(14, 2));
          this.form.get('tipo').setValue(data.data.tipo);
          this.localizacao = data.data.localizacao;
        },
        error: (err) => {
          let msg: string = "Erro obtendo lançamento";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin']);
        }
      })
  }


  gerarForm(): void {
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]],
    });
  }

  gerarListaNumeros(inicio: number, termino: number): string[] {
    const numeros: string[] = Array();
    for (let i = inicio; i <= termino; i++) {
      let numero: string = i.toString();
      if (i < 10) {
        numero = "0" + numero;
      }
      numeros.push(numero);
    }
    return numeros;
  }

}
