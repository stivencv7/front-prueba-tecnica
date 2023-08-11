import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Medicamento } from '../medicamento/medicamento';
//import { MedicamentoService } from '../medicamento/medicamento.service';
import { Venta } from './venta';
import { VentaService } from './venta.service';
import { MedicamentoService } from '../medicamento/medicamento.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit  {

  @Input()
  medicamento:Medicamento=new Medicamento();

 
  

  @Output()
  OutputVisibleDialog=new EventEmitter<boolean>();
 
  
  venta:Venta=new Venta();


  cantida:number=0;
 
  constructor(private service:VentaService,private serviceMedicamento:MedicamentoService){}
  ngOnInit(): void {
    this.cantida=0;
    this.venta=new Venta()
  }
  textoPadre:string;

  verTotal(numero:number){
    this.cantida=numero;
    this.venta.cantidad=numero;
    
  }

  confirmar(){
    
    if(this.cantida>this.medicamento.cantidad){
        swal("!!Cantidad Superada!!","Lo sentimos a superado la cantidad",'error');
    }else if(this.cantida<=0){
      swal("!!Cantidad Nula!!","Registre una cantidad",'error');
    }else{
    this.venta.nombreMedicamento=this.medicamento.nombre;
    this.venta.valorTotal=this.medicamento.valorUnitario*this.cantida;
    this.venta.valorUnitario=this.medicamento.valorUnitario;
    this.medicamento.cantidad=this.medicamento.cantidad-this.cantida;
    this.service.registrarVenta(this.venta).subscribe(response=>{
      this.OutputVisibleDialog.emit(false)
    })
    this.serviceMedicamento.actualizar(this.medicamento.id,this.medicamento).subscribe(medicamento=>{
      this.medicamento=medicamento;
      swal("Exito","Se realizó la transacción con exito",'success')
    })
    }

  }
}
