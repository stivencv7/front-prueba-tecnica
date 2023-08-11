import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Medicamento } from './medicamento';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  /**
   * clase servicio para manejar los service
  */
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }
  
  getMedicamentos():Observable<Medicamento[]>{
    return this.http.get<Medicamento[]>("http://localhost:8080/api/medicamentos");
  }

  guardar(medicamento:Medicamento):Observable<Medicamento>{
    return this.http.post<Medicamento>("http://localhost:8080/api/medicamento",medicamento,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error,'error')
        return throwError(e)
      }))    
  }
  
  getMedicamento(id:number):Observable<Medicamento>{
    return this.http.get<Medicamento>("http://localhost:8080/api/medicamento/"+id,{headers:this.httpHeaders})
  }

  actualizar(id:number,medicamento:Medicamento):Observable<Medicamento>{
    return this.http.put<Medicamento>("http://localhost:8080/api/medicamento/"+id,medicamento,{headers:this.httpHeaders})

  }

  buscarPorNombre(nombre:string):Observable<Medicamento[]>{
    return this.http.get<Medicamento[]>("http://localhost:8080/api/medicamentos/"+nombre,{headers:this.httpHeaders})
  }


  delete(id:number):Observable<Medicamento>{
    return this.http.delete<Medicamento>("http://localhost:8080/api/medicamento/"+id,{headers:this.httpHeaders});
  }

  
}
