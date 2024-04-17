import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CiudadDptoService {

  url = 'http://localhost/EAGLE/backend/controlador/ciudad.php';

  constructor(private http: HttpClient) { }

  consultar_dpto(){
    return this.http.get(`${this.url}?control=dpto`);
  }

  consultar_ciudad(iddpto: number){
    return this.http.get(`${this.url}?control=ciudad&dpto=${iddpto}`);
  }


}
