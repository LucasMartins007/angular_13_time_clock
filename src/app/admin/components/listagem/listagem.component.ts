
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuncionarioService, HttpUtilService, Lancamento, LancamentoService } from 'src/app/shared';
import { ConfirmarDialog } from 'src/app/shared/components/alert-dialog-simple.component';
import { Funcionario } from 'src/app/shared/models/funcionario.model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao', 'acao'];
  funcionarioId: string;
  totalLancamento: number;
  funcionarios: Funcionario[];
  form: FormGroup;

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;

  pagina: number;
  ordem: string;
  direcao: string;

  constructor(
    private lancamentoService: LancamentoService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private dialog: MatDialog
  ) { };

  ngOnInit(): void {
    this.pagina = 0;
    this.gerarForm();
    this.ordemPadrao();
    this.obterFuncionarios();
  }

  gerarForm(): void {
    this.form = this.fb.group({
      funcs: ['', []]
    });
  }

  get funcId(): string {
    return sessionStorage['funcionarioId'] || false;
  }

  ordemPadrao(): void {
    this.ordem = "data";
    this.direcao = "DESC";
  }

  obterFuncionarios(): void {
    this.funcionarioService.listarFuncionariosPorEmpresa()
      .subscribe({
        next: (data) => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          this.funcionarios = (data.data as Funcionario[])
            .filter(func => func.id != usuarioId);

          if (this.funcId) {
            this.form.get('funcs').setValue(parseInt(this.funcId, 10));
            this.exibirLancamentos();
          }
        },
        error: (error) => {
          const msg: string = "Erro obtendo funcionários";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      })
  }

  exibirLancamentos(): void {
    this.funcionarioId = this.resolverFuncionarioId();
    if (!this.funcionarioId) {
      return;
    }
    sessionStorage['funcionarioId'] = this.funcionarioId;
    this.lancamentoService.listarLancamentosPorFuncionario(this.funcionarioId, this.pagina, this.ordem, this.direcao)
      .subscribe({
        next: (data) => {
          this.totalLancamento = data['data'].totalElements;
          const lancamentos = data['data'].content as Lancamento[];
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
        },
        error: (err) => {
          const msg: string = "Erro obtendo lançamentos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      })
  }

  resolverFuncionarioId(): string {
    if (this.matSelect.selected) {
      return this.matSelect.selected['value'];
    }
    if (this.funcId) {
      return this.funcId;
    }
    return null;
  }

  removerDialog(lancamentoId: string) {
    const dialog = this.dialog.open(ConfirmarDialog, { data: "Deseja realmente excluir esse lançamento? "});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(lancamentoId);
      }
    })
  }

  remover(lancamentoId: string): void {
    this.lancamentoService.remover(lancamentoId)
      .subscribe({
        next: (data) => {
          const msg: string = "Lançamnto removido com sucesso";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.exibirLancamentos();
        },
        error: (err) => {
          let msg: string = "Tente novamente em instantes";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      })
  }

  paginar(pageEvent: PageEvent): void {
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort: Sort): void {
    if (sort.direction == '') {
      this.ordemPadrao();

    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirLancamentos();
  }

}