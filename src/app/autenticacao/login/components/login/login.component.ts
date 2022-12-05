import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { raceWith } from 'rxjs';
import { Login } from '../../models';
import { LoginService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  logar(): void {
    if (this.form.invalid) {
      alert("Formulário inválido.");
      return;
    }
    const login: Login = this.form.value;
    this.loginService.logar(login)
      .subscribe({
        next: (data) => this.doLogin(data),
        error: (error) => this.errorLogin(error),
      })
  }

  errorLogin(error): void {
    let msg: string = "Tente novamente em instantes.";
    if (error['status'] == 401) {
      msg = "Email/senha inválidos";
    }
    this.snackBar.open(msg, "Erro", { duration: 5000 })
  }

  doLogin(data): void {
    localStorage['token'] = data['data']['token'];
    const usuarioData = JSON.parse(atob(data['data']['token'].split('.')[1]));

    this.router.navigate([this.isAdmin(usuarioData) ? '/admin' : '/funcionario']);
  }

  isAdmin(usuarioData): boolean {
    return usuarioData['role'] == 'ROLE_ADMIN';
  }

}
