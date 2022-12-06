import { Component } from '@angular/core';

@Component({
    template: `
    <h2 [ngStyle]="{'text-align': 'center', 'position': 'relative', 'width': '100%'}" > Controle de ponto - Administração </h2>
    <router-outlet></router-outlet>
    `
})
export class AdminComponent {

}