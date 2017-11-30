import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ContatoService } from './service/contato.service';

import { NavbarComponent } from './navbar/navbar.component';
import { ContatoCadastroComponent } from './contato-cadastro/contato-cadastro.component';

import {
  ButtonModule,
  InputTextModule,
  InputMaskModule,
  DataTableModule,
  DialogModule,
  ConfirmDialogModule,
  ConfirmationService
} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContatoCadastroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    HttpClientModule,
    DataTableModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [
    ContatoService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }