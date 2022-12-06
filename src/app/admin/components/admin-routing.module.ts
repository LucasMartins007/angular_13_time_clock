import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AtualizacaoComponent } from "./atualizacao";
import { CadastroComponent } from "./cadastro";
import { ListagemComponent } from "./listagem";

export const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: ListagemComponent
            },
            {
                path: 'cadastro',
                component: CadastroComponent
            },
            {
                path: 'atualizacao/:lancamentoId',
                component: AtualizacaoComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {

}