import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from '../../servicios/inventario.service';
import { TercerosService } from '../../servicios/terceros.service';
import { PedidosService } from '../../servicios/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidoinsertar',
  templateUrl: './pedidoinsertar.component.html',
  styleUrl: './pedidoinsertar.component.scss'
})
export class PedidoinsertarComponent {

  productos:any;
  cliente:any; 
  ident_cliente = "";
  nombre_cliente = "";

  matriz_productos: any = [];
  arreglo_productos: any = [];
  total:any = 0;

    pedido = {
  fecha_pedido: "",
  productos: [],
  total_pedido: 0,
  foidtercero: 0,
  foidusuario: 0,
 }
 //Actualizar stok en tabla productos 
 ident_producto = 0;
 cantidad_agregar = 0;



 constructor(private router:Router, private sproductos: InventarioService, private sclientes: TercerosService, private spedido: PedidosService){}


  ngOnInit(): void{
  this.consulta_productos();
  }

  consulta_productos(){
    this.sproductos.consultar().subscribe((resultado:any) => {
      this.productos=resultado; 
      //console.log(resultado);
    })

  }

    consulta_cliente(){
    this.sclientes.filtro_cliente(this.ident_cliente).subscribe((resultado:any) => {
      this.cliente=resultado; 
      //console.log(this.cliente);
      this.nombre_cliente=this.cliente[0].nombre;

    })
  }

  seleccionar(valores:any, id: number){

    if (this.nombre_cliente == "") {
      Swal.fire("Debe Seleccionar primero el Nit del Cliente");
      
    } else {
      
      let cantidad =  Number(prompt("Ingrese la cantidad a llevar"))
      this.arreglo_productos = [valores.id_producto, valores.nombre, Number(valores.valor_unitario), cantidad, cantidad * Number(valores.valor_unitario)];
      
      this.matriz_productos.push(this.arreglo_productos);
      //console.log(this.matriz_productos);

      let largo = this.matriz_productos.length;
      this.total = 0;
      for(let i=0; i<largo; i++){
        this.total=this.total + this.matriz_productos[i][4];

      }
    } 
  }

  quitar_productos(id_producto_quitar:number){
    
    let largo = this.matriz_productos.length;

    // for(let i=0; i<largo; i++){

    //   if (this.matriz_productos[i][0] == id_producto_quitar) {
    //     this.matriz_productos[i] = [];
    //     i=largo;
    //     console.log('borradoooo')
      
    //   } 
    // }

    for(let i=0; i<largo; i++){

      if (this.matriz_productos[i][0] == id_producto_quitar) {
        this.matriz_productos[i][0]= "";
        this.matriz_productos[i][1]= "";
        this.matriz_productos[i][2]= 0;
        this.matriz_productos[i][3]= 0;
        this.matriz_productos[i][4]= 0;
        i=largo;
        //console.log('hechooooooo')
      
      } 
    }

    this.total = 0;
    for(let i=0; i<largo; i++){
      this.total=this.total + this.matriz_productos[i][4];

    }

  }

  guardar(){

    if (this.nombre_cliente == "") {
      Swal.fire("Debe Seleccionar primero el Nit del Cliente");

    } else if (this.matriz_productos.length == 0){
      Swal.fire("Debe seleccionar almenos un producto");

    } else  {

      let fecha = new Date();
      this.pedido.fecha_pedido = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
      this.pedido.productos = this.matriz_productos;
      this.pedido.total_pedido = this.total;
      this.pedido.foidtercero = Number(this.cliente[0].id_tercero);
      this.pedido.foidusuario = Number(sessionStorage.getItem('id'));
      //console.log(this.pedido);

      this.spedido.insertar(this.pedido).subscribe((datos:any) => {
        if (datos['resultado']=='OK'){
        
          
          let largo = this.matriz_productos.length;

          for(let i=0; i<largo; i++){
            this.ident_producto = this.matriz_productos[i][0];
            this.cantidad_agregar = this.matriz_productos[i][3];
            
            this.sproductos.restar_productosp(this.ident_producto, this.cantidad_agregar).subscribe((datos:any) => {
              if (datos['resultado']=='OK'){
      
                this.router.navigate(['pedidos']);
              }
            });

      
          }

        }
      });

    }

  }



}
