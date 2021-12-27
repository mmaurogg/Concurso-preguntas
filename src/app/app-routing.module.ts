import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './pages/formulario/formulario.component';

const routes: Routes = [

  {path: 'formulario', component: FormularioComponent },
  {path: '**', pathMatch:'full', redirectTo: 'formulario' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
