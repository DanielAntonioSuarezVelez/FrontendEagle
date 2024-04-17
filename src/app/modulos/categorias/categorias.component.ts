import { Component } from '@angular/core';
import { CategoriasService } from '../../servicios/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {

  //CONSULTA: Objeto para consulta
  categoria:any;

  //EDITAR: variable global para editar
  id_categoria: any

  //INSERTAR: Objeto inicial para insertar
  obj_categoria = {
    nombre: "",

  }

  //INSERTAR: Variables globales para validacion para insertar
  validar_nombre=true;
  mform=false;
  botones_form=false;


  //GENERAL Constructor, se agregan los servicios que intervienen
  constructor(private scategoria: CategoriasService) {}

  //CONSULTA: Metodos Consulta
  ngOnInit(): void{
    this.consulta();

  }

  consulta(){
    this.scategoria.consultar().subscribe((resultado:any) => {
      this.categoria=resultado; 
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
    this.obj_categoria = {
      nombre: "",
    }
  }


  //INSERTAR: validar bjeto para insertar
  validar(funcion: any){

    if(this.obj_categoria.nombre == ""){
      this.validar_nombre=false;
    } else{
      this.validar_nombre=true;
    }


    if(this.validar_nombre==true && funcion =='guardar'){
      this.guardar();
    }

    if(this.validar_nombre==true && funcion =='editar'){
      this.editar();
    }


  }


  //INSERTAR: funcion para insertar los datos del formulario
  guardar(){
    this.scategoria.insertar(this.obj_categoria).subscribe((datos:any) => {
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
      title: "Esta seguro de eliminar esta Categoria?",
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
      this.scategoria.eliminar(id).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          this.consulta();
        }
      });
      ///////////

        Swal.fire({
          title: "Categoria Eliminada!",
          text: "La categoria ha sido eliminada",
          icon: "success"
        });
      }
    });

  }

  //EDITAR: cargar los datos al formulario para editarlos
  cargar_datos(items: any, id: number){
    
    this.obj_categoria = {
      nombre: items.nombre,
    }
    this.id_categoria=id;

    this.botones_form=true;
    this.mostar_form('mostrar')
  }

  //EDITAR:  editar datos,  ejecuta funcion editar
  editar(){
    this.scategoria.editar(this.id_categoria, this.obj_categoria).subscribe((datos:any) => {
      if (datos['resultado']=='OK'){
        this.consulta();
      }
    })
    this.limpiar();
    this.mostar_form('no mostrar');
  }


}
