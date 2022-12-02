import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CnpjValidator, CpfValidator } from 'src/app/shared/validators';
import { CadastroPf } from '../../models';
import { CadastroPfService } from '../../services';

@Component({
  selector: 'app-cadastrar-pf',
  templateUrl: './cadastrar-pf.component.html',
  styleUrls: ['./cadastrar-pf.component.css']
})
export class CadastrarPfComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private cadastroPfService: CadastroPfService
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
      cnpj: ['', [Validators.required, CnpjValidator]],
    });
  }

  cadastrarPf(): void {
    if (this.form.invalid) {
      return;
    }

    const cadastroPf: CadastroPf = this.form.value;

    this.cadastroPfService.cadastrar(cadastroPf)
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
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      });
  }

}
