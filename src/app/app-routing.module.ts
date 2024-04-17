import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { TercerosComponent } from './modulos/terceros/terceros.component';
import { InventarioComponent } from './modulos/inventario/inventario.component';
import { PedidosComponent } from './modulos/pedidos/pedidos.component';
import { ComprasComponent } from './modulos/compras/compras.component';
import { CategoriasComponent } from './modulos/categorias/categorias.component';
import { MarcasComponent } from './modulos/marcas/marcas.component';
import { LoginComponent } from './modulos/login/login.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';
import { validaruserGuard } from './guard/validaruser.guard';
import { PedidoinsertarComponent } from './modulos/pedidoinsertar/pedidoinsertar.component';
import { ComprainsertarComponent } from './modulos/comprainsertar/comprainsertar.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
    children:
    [
      {path: 'categorias', component: CategoriasComponent, canActivate: [validaruserGuard]},
      {path: 'compras', component: ComprasComponent, canActivate: [validaruserGuard]},
      {path: 'comprainsertar', component: ComprainsertarComponent, canActivate: [validaruserGuard]},
      {path: 'dashboard', component: DashboardComponent, canActivate: [validaruserGuard]},
      {path: 'inventario', component: InventarioComponent, canActivate: [validaruserGuard]},
      {path: 'marcas', component: MarcasComponent, canActivate: [validaruserGuard]},
      {path: 'pedidos', component: PedidosComponent, canActivate: [validaruserGuard]},
      {path: 'pedidoinsertar', component: PedidoinsertarComponent, canActivate: [validaruserGuard]},
      {path: 'terceros', component: TercerosComponent, canActivate: [validaruserGuard]},
      {path: 'usuarios', component: UsuariosComponent, canActivate: [validaruserGuard]},

      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },

  {path: 'login', component: LoginComponent},
  {path: '**', component: NoEncontroComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
