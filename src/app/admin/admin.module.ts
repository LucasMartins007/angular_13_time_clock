import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { RouterModule } from '@angular/router';

import { AdminComponent, AtualizacaoComponent, CadastroComponent, ListagemComponent } from './components';
import { HttpUtilService, LancamentoService, PtBrMatPaginatorIntl } from '../shared';


@NgModule({
  declarations: [
    ListagemComponent,
    CadastroComponent,
    AtualizacaoComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule, 
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    LancamentoService,
    HttpUtilService,
    MatPaginatorIntl,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl }
  ]
})
export class AdminModule { }
