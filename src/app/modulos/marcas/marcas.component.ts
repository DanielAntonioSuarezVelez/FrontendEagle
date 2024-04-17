import { Component } from '@angular/core';
import { MarcasService } from '../../servicios/marcas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss'
})
export class MarcasComponent {

  //CONSULTA: Objeto para consulta
  marca:any;

  //EDITAR: variable global para editar
  id_marca: any

  //INSERTAR: Objeto inicial para insertar
  obj_marca = {
    nombre: "",

  }

  //INSERTAR: Variables globales para validacion para insertar
  validar_nombre=true;
  mform=false;
  botones_form=false;


  //GENERAL Constructor, se agregan los servicios que intervienen
  constructor(private smarca: MarcasService) {}

  //CONSULTA: Metodos Consulta
  ngOnInit(): void{
    this.consulta();

  }

  consulta(){
    this.smarca.consultar().subscribe((resultado:any) => {
      this.marca=resultado; 
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
    this.obj_marca = {
      nombre: "",
    }
  }


  //INSERTAR: validar bjeto para insertar
  validar(funcion: any){

    if(this.obj_marca.nombre == ""){
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
    this.smarca.insertar(this.obj_marca).subscribe((datos:any) => {
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
      title: "Esta seguro de eliminar esta Marca?",
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
      this.smarca.eliminar(id).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          this.consulta();
        }
      });
      ///////////

        Swal.fire({
          title: "Marca Eliminada!",
          text: "La Marca ha sido eliminada",
          icon: "success"
        });
      }
    });

  }

  //EDITAR: cargar los datos al formulario para editarlos
  cargar_datos(items: any, id: number){
    
    this.obj_marca = {
      nombre: items.nombre,
    }
    this.id_marca=id;

    this.botones_form=true;
    this.mostar_form('mostrar')
  }

  //EDITAR:  editar datos,  ejecuta funcion editar
  editar(){
    this.smarca.editar(this.id_marca, this.obj_marca).subscribe((datos:any) => {
      if (datos['resultado']=='OK'){
        this.consulta();
      }
    })
    this.limpiar();
    this.mostar_form('no mostrar');
  }



}
