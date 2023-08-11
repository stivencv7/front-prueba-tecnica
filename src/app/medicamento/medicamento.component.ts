import { Component, OnInit } from '@angular/core';
import { MedicamentoService } from './medicamento.service';
import { Medicamento } from './medicamento';
import swal from 'sweetalert2';
import { Venta } from '../venta/venta';


@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css']
})
export class MedicamentoComponent implements OnInit {
/**se utilisa swal para los mensaje de alert */

  public medicamentos: Medicamento[];
  public visible = false;
  public visibleDialog=false
  public disable=true;
  public medicamento:Medicamento=new Medicamento()
  public Venta:Venta=new Venta();
  constructor(
    private service: MedicamentoService,
    ) { }
  
  ngOnInit(): void {
    this.service.getMedicamentos().subscribe(medicamentos => {
      this.medicamentos = medicamentos;
      console.log(this.medicamentos)
    })
  }

  delete(medicamento: Medicamento) {
    swal({
      title: 'Seguro que deseas eliminar',
      text: `Eliminar Producto`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    },).then((result) => {
      if (result.value) {
        this.service.delete(medicamento.id).subscribe(
          response => {
            this.medicamentos = this.medicamentos.filter(medic => medic !== medicamento)
            swal(
              'Producto eliminado!',
              `producto ${medicamento.nombre} Eliminado con éxito.`,
              'success'
            )
          }

        )
      }
    })
  }
  //
  show() {
    if (!this.visible) {
      this.visible = true;
    } else {
      this.visible = false
    }
  }

  /** */
  getVisible(visible: boolean) {
    this.visible = visible;
    this.ngOnInit()
  }

  showVisibleDialog() {
    if (!this.visibleDialog) {
      this.visibleDialog = true;
    } else {
      this.visibleDialog = false
    }
  }

  getVisibleDialog(visible: boolean) {
    this.visibleDialog = visible;
    this.ngOnInit()
  }

  getMedicamento(id:number){
    this.show() 
    this.service.getMedicamento(id).subscribe(medicamento=>{
      this.medicamento=medicamento    
      console.log("medicamento: "+medicamento.fechaFabricacion)
    })
  }

  hide(){
    this.medicamento=new Medicamento()
    this.visible=false;
  }

  buscarProNombre(){
    let letra=document.querySelector("input").value;
    
    if(letra.length>0){
      this.service.buscarPorNombre(letra).subscribe(medicamentos=>{
        this.medicamentos=medicamentos;
      })
    }else{
      this.service.getMedicamentos().subscribe(
        (productos)=>this.medicamentos=productos
      )
      console.log(letra)
    }
  }

  getMedicamentoVenta(id:number){
    this.showVisibleDialog() 
    this.service.getMedicamento(id).subscribe(medicamento=>{
      this.medicamento=medicamento    
    })
  }

  onHide(){
    this.medicamento=new Medicamento()
  }

}

