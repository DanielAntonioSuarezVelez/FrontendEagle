import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {

  nombre:any;
  rol:any;

  constructor(private router:Router){}
  
  ngOnInit(): void{
    this.nombre = sessionStorage.getItem('nombre');
    this.rol = sessionStorage.getItem('foidrol');
    //console.log('holaaaaaaa', this.rol);
    //console.log(this.rol);

  }


}
