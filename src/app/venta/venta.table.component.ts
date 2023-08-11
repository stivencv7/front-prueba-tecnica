import { Component, OnInit } from '@angular/core';
import { Venta } from './venta';
import { VentaService } from './venta.service';

@Component({
  selector: 'app-venta.table',
  templateUrl: './venta.table.component.html',
  styleUrls: ['./venta.table.component.css']
})
export class VentaTableComponent implements OnInit {
  
  ventas:Venta[];
  rangeDates: Date[];
  desde:Date;
  hasta:Date;
  constructor(private service:VentaService){
    
  }

  ngOnInit(): void {
    this.service.getVentas().subscribe(ventas=>{
      this.ventas=ventas;
      
    })
  }

  filtrarBeteewen(){
      console.log("desde: "+this.desde+'\n'+
      "hasta: "+this.hasta)
      
      this.service.getBetween(this.desde,this.hasta).subscribe(ventas=>{
        this.ventas=ventas
        console.log(ventas)
      })
  }
  
  
}
