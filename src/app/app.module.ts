import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { LayoutComponent } from './layout/layout.component';

//////////
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from './header/header.component';
import { BarcodeLeitorComponent } from './barcode-leitor/barcode-leitor.component';

import { MatDividerModule } from '@angular/material/divider';

import { MatInputModule } from '@angular/material/input';
import { CosmosBluesoftService } from './servicos/cosmos-bluesoft.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    BarcodeLeitorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ZXingScannerModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    MatInputModule
  ],
  providers: [
    CosmosBluesoftService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
