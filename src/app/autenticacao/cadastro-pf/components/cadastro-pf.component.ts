import { Component } from '@angular/core';

@Component({
    template: `
        <h2 [ngStyle]="{'text-align': 'center', 'position': 'relative', 'width': '100%'}"> Cadastro de pessoa física </h2>
        <router-outlet></router-outlet>
    `
})
export class CadastroPfComponent {

}