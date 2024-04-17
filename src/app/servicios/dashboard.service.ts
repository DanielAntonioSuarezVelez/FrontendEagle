import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = 'http://localhost/EAGLE/backend/controlador/dashboard.php';

  constructor(private http: HttpClient) { }

  consultapedido(){
    return this.http.get(`${this.url}?control=consultapedido`);
  }

  consultacompra(){
    return this.http.get(`${this.url}?control=consultacompra`);
  }

  consultaproducto(){
    return this.http.get(`${this.url}?control=consultaproducto`);
  }

  consultacliente(){
    return this.http.get(`${this.url}?control=consultacliente`);
  }


}
