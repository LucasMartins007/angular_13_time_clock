import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CpfValidator, CnpjValidator } from 'src/app/shared/validators';
import { CadastroPJ } from '../../models';
import { CadastroPjService } from '../../services';

@Component({
  selector: 'app-cadastrar-pj',
  templateUrl: './cadastrar-pj.component.html',
  styleUrls: ['./cadastrar-pj.component.css']
})
export class CadastrarPjComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private cadastroPjService: CadastroPjService
  ) { }

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
      cnpj: ['', [Validators.required, CnpjValidator]]
    })
  }

  cadastrarPj(): void {
    if (this.form.invalid) {
      return;
    }

    const cadastroPj: CadastroPJ = this.form.value;
    this.cadastroPjService.cadastrar(cadastroPj)
      .subscribe({
        next: (data) => {
          console.log(JSON.stringify(data));
          const msg: string = "Realize o login para acessar o sistema";

          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(JSON.stringify(err));
          let msg: string = "Realize o login para acessar o sistema";
          
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 })
        }
      });
  }
}
