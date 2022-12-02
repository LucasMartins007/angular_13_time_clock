import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';

import { CadastrarPjComponent, CadastroPjComponent } from "./components";


export const CadastroPjRoutes: Routes = [
    {
        path: 'cadastro-pj',
        component: CadastroPjComponent,
        children: [
            {
                path: '',
                component: CadastrarPjComponent
            }
        ]
    }
]



@NgModule({
    // Concatena a rota criada nesse arquivo como filha da rota raiz
    imports: [
        RouterModule.forChild(CadastroPjRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CadastroPjRoutingModule {

}