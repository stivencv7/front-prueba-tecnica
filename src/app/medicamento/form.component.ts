import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medicamento } from './medicamento';
import { MedicamentoService } from './medicamento.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  
  @Output()
  outputVisible=new EventEmitter<boolean>();
  
  @Input()
  medicamento:Medicamento=new Medicamento();
 
  constructor(private service:MedicamentoService,private router:Router){}
  
  registrar(){
    this.service.guardar(this.medicamento).subscribe(
      response=>{
        this.visible();
        this.router.navigate[("/medicamento")]
        swal("Registro","Exito al registrar el medicamento","success")
        this.medicamento=new Medicamento()
      }
    );
  }

  actualizar(id:number){
    this.service.actualizar(id,this.medicamento).subscribe( response=>{
      this.visible()
      swal("Succes","Se actualizaron correctamente los datos","success")
    })
  }
  
  /*mandamos este valor para al componente padre
  /*para cerra la p-sidebar
  */
  visible(){
    this.outputVisible.emit(false);
  }

}
