import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PainterComponent} from './painter/painter.component';
import {AppComponent} from './app.component';
import {SorterComponent} from './sorter/sorter.component';
import {FirebaseCallerComponent} from './firebase-caller/firebase-caller.component';


const routes: Routes = [
  {path: 'painter', component: PainterComponent},
  {path: 'sorter', component: SorterComponent},
  {path: 'firebase-caller', component: FirebaseCallerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
