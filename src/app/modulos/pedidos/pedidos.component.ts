import { Component } from '@angular/core';
import { PedidosService } from '../../servicios/pedidos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatCurrency } from '@angular/common';



@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {


  //CONSULTA: Objeto para consulta
  pedido:any;

  //VER PRODUCTOS EN MODAL: para cargar los profuctos al modal
  productos:any;

  //Totalizar en el modal
  total:any;

  //EDITAR: variable global para editar
  //id_pedido: any

   botones_form=false;


  //GENERAL Constructor, se agregan los servicios que intervienen
  constructor(private spedido: PedidosService, private router:Router) {}

  //CONSULTA: Metodos Consulta
  ngOnInit(): void{
    this.consulta();

  }

  consulta(){
    this.spedido.consultar().subscribe((resultado:any) => {
      this.pedido=resultado; 
      //console.log(resultado);
    })
  }

  consultap(id:number){
    this.spedido.consultarp(id).subscribe((resultado:any) => {
      this.productos=resultado; 

      this.total=0;
      for(let i=0; i<this.productos.length; i++){
        this.total = this.total + this.productos[i][4];
      }

    })
  }

  // fin metodos Consulta



  insertar(){
    this.router.navigate(['pedidoinsertar']);
  }


  mostrar_modal(id:number){
    this.consultap(id);
  }


  //ELIMINAR:  funcion eliminar
  anular(id:number){

    //Alerta antes de eliminar
    Swal.fire({
      title: "Esta seguro que desa Anular el pedido?",
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
      this.spedido.anular(id).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          this.consulta();
        }
      });
      ///////////

        Swal.fire({
          title: "Pedido Anulado!",
          text: "El pedido ha sido anulado",
          icon: "success"
        });
      }
    });

  }

}
