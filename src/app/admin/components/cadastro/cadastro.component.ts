import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Lancamento, LancamentoService, TipoMarcacao } from 'src/app/shared';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: string[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit(): void {
    this.gerarForm();
    this.minutos = this.gerarListaNumeros(0, 60);
    this.horas = this.gerarListaNumeros(0, 23);
    this.tipos = [
      TipoMarcacao.INICIO_TRABALHO,
      TipoMarcacao.INICIO_ALMOCO,
      TipoMarcacao.TERMINO_ALMOCO,
      TipoMarcacao.TERMINO_TRABALHO,
    ]
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

  cadastrar(): void {
    if (this.form.invalid) return;

    const dados = this.form.value;
    const lancamento: Lancamento = this.obterLancamento(dados);

    this.lancamentoService.cadastrar(lancamento)
      .subscribe({
        next: (data) => {
          const msg: string = "Lancamento cadastrado com sucesso!";
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
      '',
      this.funcionarioId
    );
  }

  get funcionarioId(): string {
    return sessionStorage['funcionarioId'];
  }


}
