import { Component } from '@angular/core';
import { InventarioService } from '../../servicios/inventario.service';
import { CategoriasService } from '../../servicios/categorias.service';
import { MarcasService } from '../../servicios/marcas.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent {


  //CONSULTA: Objeto para consulta
  producto:any;

  //INSERTAR: objeto consulta categorias para insertar
  categoria:any;

  //INSERTAR: objeto consulta marcas para insertar
  marca:any;

  //INSERTAR: objeto consulta usuarios para insertar
  usuario:any;

  //EDITAR: variable global para editar
  id_producto: any

  //INSERTAR: Objeto inicial para insertar
  obj_producto= {
    //id_producto: 0,
    nombre: "",
    fecha_creacion: "",
    valor_unitario: 0,
    valor_compra: 0,
    cantidad: 0,
    foidcategoria: 0,
    foidmarca: 0,
    foidusuario: 0,

  }

  //INSERTAR: Variables globales para validacion para insertar
  validar_nombre=true;
  validar_fecha_creacion=true;
  validar_valor_unitario=true;
  validar_valor_compra=true;
  validar_cantidad=true;
  validar_foidcategoria=true;
  validar_foidmarca=true;
  validar_foidusuario=true;
  mform=false;
  botones_form=false;


  //GENERAL Constructor, se agregan los servicios que intervienen
  constructor(private sinventario: InventarioService, private scategoria: CategoriasService, private smarca: MarcasService, private susuario: UsuariosService) {}

  //CONSULTA: Metodos Consulta
  ngOnInit(): void{
    this.consulta();
    this.consulta_categoria();
    this.consulta_marca();
    this.consulta_usuario();

  }

  consulta(){
    this.sinventario.consultar().subscribe((resultado:any) => {
      this.producto=resultado; 
      //console.log(resultado);
    })
  }

  consulta_categoria(){
    this.scategoria.consultar().subscribe((resultado:any) => {
      this.categoria=resultado; 
    })
  }

  consulta_marca(){
    this.smarca.consultar().subscribe((resultado:any) => {
      this.marca=resultado; 
    })
  }

  consulta_usuario(){
    this.susuario.consultar().subscribe((resultado:any) => {
      this.usuario=resultado; 
    })
  }

  // fin metodos Consulta




  //INSERTAR: Mostrar Formulario Insertar
  mostar_form(dato:any){
    switch(dato){
      case 'mostrar':
      this.mform = true;
      break

      case 'no mostrar':
        this,this.mform = false;
        this.botones_form = false;
      break

    }
  }

  //INSERTAR:  limpiar formulario despues de insertar
  limpiar(){
    this.obj_producto= {
    //id_producto: 0,
    nombre: "",
    fecha_creacion: "",
    valor_unitario: 0,
    valor_compra: 0,
    cantidad: 0,
    foidcategoria: 0,
    foidmarca: 0,
    foidusuario: 0,

  }
  }


  //INSERTAR: validar bjeto para insertar
  validar(funcion: any){
    if(this.obj_producto.nombre == ""){
      this.validar_nombre=false;
    } else{
      this.validar_nombre=true;
    }

    if(this.obj_producto.fecha_creacion == ""){
      this.validar_fecha_creacion=false;
    } else{
      this.validar_fecha_creacion=true;
    }

    if(this.obj_producto.valor_unitario == 0){
      this.validar_valor_unitario=false;
    } else{
      this.validar_valor_unitario=true;
    }

    if(this.obj_producto.valor_compra == 0){
      this.validar_valor_compra=false;
    } else{
      this.validar_valor_compra=true;
    }

    if(this.obj_producto.cantidad == 0){
      this.validar_cantidad=false;
    } else{
      this.validar_cantidad=true;
    }

    if(this.obj_producto.foidcategoria == 0){
      this.validar_foidcategoria=false;
    } else{
      this.validar_foidcategoria=true;
    }

    if(this.obj_producto.foidmarca == 0){
      this.validar_foidmarca=false;
    } else{
      this.validar_foidmarca=true;
    }

    if(this.obj_producto.foidusuario == 0){
      this.validar_foidusuario=false;
    } else{
      this.validar_foidusuario=true;
    }


    if(this.validar_nombre==true && this.validar_fecha_creacion==true && this.validar_valor_unitario==true && this.validar_valor_compra==true && this.validar_cantidad==true && this.validar_foidcategoria==true && this.validar_foidmarca==true && this.validar_foidusuario==true && funcion =='guardar'){
      //console.log(this.obj_compra);
      this.guardar();
    } 

    if(this.validar_nombre==true && this.validar_fecha_creacion==true && this.validar_valor_unitario==true && this.validar_valor_compra==true && this.validar_cantidad==true && this.validar_foidcategoria==true && this.validar_foidmarca==true && this.validar_foidusuario==true && funcion =='editar'){
      //console.log(this.obj_compra);
      this.editar();
    } 

  }


  //INSERTAR: funcion para insertar los datos del formulario
  guardar(){
    this.sinventario.insertar(this.obj_producto).subscribe((datos:any) => {
      if (datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostar_form('no mostrar');
  
  }

  //ELIMINAR:  funcion eliminar
  eliminar(id:number){

    //Alerta antes de eliminar
    Swal.fire({
      title: "Esta seguro de eliminar el producto?",
      text: "El proceso no se podra reversar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

      ///////// Ejecuta funcion eliminar
      this.sinventario.eliminar(id).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          this.consulta();
        }
      });
      ///////////

        Swal.fire({
          title: "Producto Eliminado!",
          text: "El producto ha sido eliminado",
          icon: "success"
        });
      }
    });

  }

  //EDITAR: cargar los datos al formulario para editarlos
  cargar_datos(items: any, id: number){
    
    this.obj_producto = {

      nombre: items.nombre,
      fecha_creacion: items.fecha_creacion,
      valor_unitario: items.valor_unitario,
      valor_compra: items.valor_compra,
      cantidad: items.cantidad,
      foidcategoria: items.foidcategoria,
      foidmarca: items.foidmarca,
      foidusuario: items.foidusuario,
  
    }
    this.id_producto=id;

    this.botones_form=true;
    this.mostar_form('mostrar')
  }

  //EDITAR:  editar datos,  ejecuta funcion editar
  editar(){
    this.sinventario.editar(this.id_producto, this.obj_producto).subscribe((datos:any) => {
      if (datos['resultado']=='OK'){
        this.consulta();
      }
    })
    this.limpiar();
    this.mostar_form('no mostrar');
  }





}
