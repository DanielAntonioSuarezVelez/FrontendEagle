import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComprasService } from '../../servicios/compras.service';
import { InventarioService } from '../../servicios/inventario.service';
import { TercerosService } from '../../servicios/terceros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comprainsertar',
  templateUrl: './comprainsertar.component.html',
  styleUrl: './comprainsertar.component.scss'
})
export class ComprainsertarComponent {

  productos:any;
  proveedor:any; 
  ident_prov = "";
  nombre_prov = "";

  matriz_productos: any = [];
  arreglo_productos: any = [];
  total:any = 0;

    compra = {
  fecha_compra: "",
  productos: [],
  total_compra: 0,
  foidtercero: 0,
  foidusuario: 0,
 }
 //Actualizar stok en tabla productos 
 ident_producto = 0;
 cantidad_agregar = 0;



 constructor(private router: Router, private sproductos: InventarioService, private sproveedor: TercerosService, private scompra: ComprasService){}


  ngOnInit(): void{
  this.consulta_productos();
  }

  consulta_productos(){
    this.sproductos.consultar().subscribe((resultado:any) => {
      this.productos=resultado; 
      //console.log(resultado);
    })

  }

    consulta_proveedor(){
    this.sproveedor.filtro_proveedor(this.ident_prov).subscribe((resultado:any) => {
      this.proveedor=resultado; 
      //console.log(this.cliente);
      this.nombre_prov=this.proveedor[0].nombre;

    })
  }

  seleccionar(valores:any, id: number){

    if (this.nombre_prov == "") {
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

    if (this.nombre_prov == "") {
      Swal.fire("Debe Seleccionar primero el Nit del Cliente");

    } else if (this.matriz_productos.length == 0){
      Swal.fire("Debe seleccionar almenos un producto");

    } else  {

      let fecha = new Date();
      this.compra.fecha_compra = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
      this.compra.productos = this.matriz_productos;
      this.compra.total_compra = this.total;
      this.compra.foidtercero = Number(this.proveedor[0].id_tercero);
      this.compra.foidusuario = Number(sessionStorage.getItem('id'));
      //console.log(this.pedido);

      this.scompra.insertar(this.compra).subscribe((datos:any) => {
        if (datos['resultado']=='OK'){
        
          
          let largo = this.matriz_productos.length;

          for(let i=0; i<largo; i++){
            this.ident_producto = this.matriz_productos[i][0];
            this.cantidad_agregar = this.matriz_productos[i][3];
            
            this.sproductos.agregar_productosp(this.ident_producto, this.cantidad_agregar).subscribe((datos:any) => {
              if (datos['resultado']=='OK'){
      
                this.router.navigate(['compras']);
              }
            });

      
          }

        }
      });

    }

  }

}
