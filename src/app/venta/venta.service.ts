import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from './venta';
import { Observable, catchError, throwError } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  
  /*
    se maneja las peticiones http 
  */

  private httpHeaders:HttpHeaders;
  constructor(private http:HttpClient ) { }

  registrarVenta(venta:Venta):Observable<Venta>{
    return this.http.post<Venta>("http://localhost:8080/api/venta",venta,({headers:this.httpHeaders})).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error,'error')
        return throwError(e)
      })) 
  }

  actualizar(id:number,venta:Venta):Observable<Venta>{
    console.log("hola")
    return this.http.put<Venta>("http://localhost:8080/api/medicamento/"+id,venta,{headers:this.httpHeaders})

  }
  getVenta(id:number):Observable<Venta>{
    return this.http.get<Venta>("http://localhost:8080/api/venta/"+id,{headers:this.httpHeaders})
  }
  
  getVentas():Observable<Venta[]>{
    return this.http.get<Venta[]>("http://localhost:8080/api/ventas");
  }

  getBetween(desde:Date,hasta:Date):Observable<Venta[]>{
    let cero=desde.getMonth()>9?"":0;
    let cero2=hasta.getMonth()>9?"":0;

    let day=desde.getDate()>9?"":0;
    let dayhasta=hasta.getDate()>9?"":0;

    let fechaDesd=desde.getFullYear()+"-"+cero+(desde.getMonth()+1)+"-"+day+desde.getDate();
    let fechaHasta=hasta.getFullYear()+"-"+cero2+(hasta.getMonth()+1)+"-"+dayhasta+hasta.getDate();
   
  
    console.log("fechadesde "+fechaDesd.toString())
    console.log("fechahatas "+fechaHasta.toString())
    
    return this.http.get<Venta[]>("http://localhost:8080/api/ventas/ventasfiltradas?desde="+fechaDesd+"&hasta="+fechaHasta);
  }
}
