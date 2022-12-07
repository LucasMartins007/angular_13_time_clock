import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'confirm-dialog',
    template: `
    <h1 mat-dialog-title> {{ title }} </h1>
    <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="false" tabindex="-1">
            Não
        </button>
        <button mat-button [mat-dialog-close]="true" tabindex="1">
            Sim
        </button>
    </div>
    `,
  })
  export class ConfirmarDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public title: string) {}
  }