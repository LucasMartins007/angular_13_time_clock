import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./components/admin.component";
import { AtualizacaoComponent } from "./components/atualizacao";
import { CadastroComponent } from "./components/cadastro";
import { ListagemComponent } from "./components/listagem";
import { AdminGuard } from "./services";

export const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [ AdminGuard ],
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