import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { PrimeNGConfig } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';

import { AppComponent } from './app.component';
import { MedicamentoComponent } from './medicamento/medicamento.component';
import { FormComponent } from './medicamento/form.component';
import { VentaComponent } from './venta/venta.component';
import { VentaTableComponent } from './venta/venta.table.component';


const routes:Routes=[
  {path:'',redirectTo:'/medicamento',pathMatch:'full'},
  {path:'medicamento',component:MedicamentoComponent},
  {path:'venta',component:VentaTableComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MedicamentoComponent,
    FormComponent,
    VentaComponent,
    VentaTableComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    SidebarModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PrimeNGConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
