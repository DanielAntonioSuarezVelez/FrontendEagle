import { Component } from '@angular/core';
import { ComprasService } from '../../servicios/compras.service';
import { TercerosService } from '../../servicios/terceros.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export class ComprasComponent {


  //CONSULTA: Objeto para consulta
  compra:any;

  //VER PRODUCTOS EN MODAL: para cargar los profuctos al modal
  productos:any;

  //Totalizar en el modal
  total:any;
  
  //EDITAR: variable global para editar
  //id_pedido: any
  
  botones_form=false;


  //GENERAL Constructor, se agregan los servicios que intervienen
  constructor(private scompra: ComprasService, private router: Router) {}

 //CONSULTA: Metodos Consulta
 ngOnInit(): void{
  this.consulta();

}

consulta(){
  this.scompra.consultar().subscribe((resultado:any) => {
    this.compra=resultado; 
    //console.log(resultado);
  })
}

consultap(id:number){
  this.scompra.consultarp(id).subscribe((resultado:any) => {
    this.productos=resultado; 

    this.total=0;
    for(let i=0; i<this.productos.length; i++){
      this.total = this.total + this.productos[i][4];
    }

  })
}

// fin metodos Consulta



insertar(){
  this.router.navigate(['comprainsertar']);
}


mostrar_modal(id:number){
  this.consultap(id);
}


//ELIMINAR:  funcion eliminar
anular(id:number){

  //Alerta antes de eliminar
  Swal.fire({
    title: "Esta seguro que desa anular la compra?",
    text: "El proceso no se podra reversar",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Anular",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {

    ///////// Ejecuta funcion eliminar
    this.scompra.anular(id).subscribe((datos:any) => {
      if (datos['resultado']=='OK') {
        this.consulta();
      }
    });
    ///////////

      Swal.fire({
        title: "Compra Anulada!",
        text: "Esta compra ha sido anulada",
        icon: "success"
      });
    }
  });

}


}
