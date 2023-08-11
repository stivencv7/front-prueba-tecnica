import { Time } from "@angular/common";

export class Medicamento{

    
	public id:number;
	public nombre:string;
	public laboratorioFabrica:string;
	public fechaFabricacion:Date;
	public fechaVencimiento:Date;
	public cantidad:number;
    public valorUnitario:number;

}