import { Time } from "@angular/common";
import { Data } from "@angular/router";
import { Medicamento } from "../medicamento/medicamento";

export class Venta{
    
    nombreMedicamento:string;
    id:number;
    fecha:Data;
    hora:Time;
    cantidad:number;
    valorUnitario:number;
    valorTotal:number;
}