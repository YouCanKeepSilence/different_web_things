import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PainterComponent} from './painter/painter.component';
import {AppComponent} from './app.component';


const routes: Routes = [
  {path: 'painter', component: PainterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
