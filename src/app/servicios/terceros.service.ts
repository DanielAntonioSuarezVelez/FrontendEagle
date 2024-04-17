import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TercerosService {

  url = 'http://localhost/EAGLE/backend/controlador/tercero.php';

  constructor(private http: HttpClient) { }

  consultar(){
    return this.http.get(`${this.url}?control=consulta`);
  }

  eliminar(id:number){
    return this.http.get(`${this.url}?control=eliminar&id=${id}`);
  }
  
  insertar(params:any){
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(params));
  }

  editar(id:number, params:any){
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify(params));
  }

  filtro(dato:any){
    return this.http.get(`${this.url}?control=filtro&dato=${dato}`);
  }

  filtro_cliente(dato:any){
    return this.http.get(`${this.url}?control=filtro_cliente&dato=${dato}`);
  }

  filtro_proveedor(dato:any){
    return this.http.get(`${this.url}?control=filtro_proveedor&dato=${dato}`);
  }


  consultar_proveedor(){
    return this.http.get(`${this.url}?control=consultaproveedor`);
  }

  consultar_cliente(){
    return this.http.get(`${this.url}?control=consultacliente`);
  }


}
