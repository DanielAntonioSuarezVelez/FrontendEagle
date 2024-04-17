import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost/EAGLE/backend/controlador/login.php';

  constructor(private http: HttpClient ) { }

  consultar(email:any, clave:any){
    //console.log(`${this.url}?email=${email}&clave=${clave}`);
    return this.http.get(`${this.url}?email=${email}&clave=${clave}`);
  }

}
