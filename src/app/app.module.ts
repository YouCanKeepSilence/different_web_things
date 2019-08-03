import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainterComponent } from './painter/painter.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MzButtonModule} from 'ngx-materialize';
import { SorterComponent } from './sorter/sorter.component';
import { FirebaseCallerComponent } from './firebase-caller/firebase-caller.component';

@NgModule({
  declarations: [
    AppComponent,
    PainterComponent,
    SorterComponent,
    FirebaseCallerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MzButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
