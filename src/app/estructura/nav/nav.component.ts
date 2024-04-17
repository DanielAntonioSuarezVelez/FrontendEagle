import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  nombre:any;
  rol:any

  constructor(private router:Router){}

  ngOnInit(): void{
    this.nombre = sessionStorage.getItem('nombre');
    this.rol = sessionStorage.getItem('foidrol');
    //console.log('este es el rol:',this.rol);

  }

  cerrar(){
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("nombre", "");
    sessionStorage.setItem("foidrol", "");
    this.router.navigate(['login']); 

  }

}
