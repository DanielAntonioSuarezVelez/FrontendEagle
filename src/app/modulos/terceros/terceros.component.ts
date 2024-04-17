import { Component } from '@angular/core';
import { TercerosService } from '../../servicios/terceros.service';
import Swal from 'sweetalert2';
import { CiudadDptoService } from '../../servicios/ciudad-dpto.service';


@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.scss'
})

export class TercerosComponent {

  //CONSULTA: Objeto para consulta
  tercero:any;
  dpto: any;
  ciudad: any;



  //INSERTAR: objeto consulta para insertar
  tercerociudad:any;

  //EDITAR: variable global para editar
  id_tercero: any;


  //INSERTAR: Objeto inicial para insertar
  obj_tercero = {
    //id_tercero: "",
    nit: "",
    nombre: "",
    telefono: "",
    direccion: "",
    correo: "",
    descripcion: "",
    tipo_tercero: "",
    foidciudad: 0,
    fodpto: 0
  }

  //INSERTAR: Variables globales para validacion para insertar
  validar_nit=true;
  validar_nombre=true;
  validar_telefono=true;
  validar_direccion=true;
  validar_correo=true;
  validar_descripcion=true;
  validar_tipo_tercero=true;
  validar_foidciudad=true;
  validar_fodpto=true;
  mform=false;
  botones_form=false;


  //GENERAL Constructor, se agregan los servicios que intervienen
  constructor(private sterce: TercerosService, private sciudad: CiudadDptoService) {}

  //CONSULTA: Metodos Consulta
  ngOnInit(): void{
    this.consulta();
    this.condpto();
    
  }

  consulta(){
    this.sterce.consultar().subscribe((resultado:any) => {
      this.tercero=resultado; 
    })
  }

  condpto(){
    this.sciudad.consultar_dpto().subscribe((resultado:any) => {
      this.dpto=resultado; 
    })
  }

  consultaciudad(iddpto: number){
    this.sciudad.consultar_ciudad(iddpto).subscribe((resultadociudad:any) => {
      this.ciudad=resultadociudad;
    })
    //console.log(this.ciudad);
  }


  // fin metodos Consulta


  //INSERTAR: Mostrar Formulario Insertar
  mostar_form(dato:any){
    switch(dato){
      case 'mostrar':
      this.mform = true;
      break

      case 'no mostrar':
        this.mform = false;
        this.botones_form = false;
      break

    }
  }

  //INSERTAR:  limpiar formulario despues de insertar
  limpiar(){
    this.obj_tercero = {
      //id_tercero: "",
      nit: "",
      nombre: "",
      telefono: "",
      direccion: "",
      correo: "",
      descripcion: "",
      tipo_tercero: "",
      foidciudad: 0,
      fodpto: 0
    }
  }


  //INSERTAR: validar bjeto para insertar
  validar(funcion: any){
    if(this.obj_tercero.nit == ""){
      this.validar_nit=false;
    } else{
      this.validar_nit=true;
    }

    if(this.obj_tercero.nombre == ""){
      this.validar_nombre=false;
    } else{
      this.validar_nombre=true;
    }

    if(this.obj_tercero.telefono == ""){
      this.validar_telefono=false;
    } else{
      this.validar_telefono=true;
    }

    if(this.obj_tercero.direccion == ""){
      this.validar_direccion=false;
    } else{
      this.validar_direccion=true;
    }

    if(this.obj_tercero.correo == ""){
      this.validar_correo=false;
    } else{
      this.validar_correo=true;
    }

    if(this.obj_tercero.descripcion == ""){
      this.validar_descripcion=false;
    } else{
      this.validar_descripcion=true;
    }

    if(this.obj_tercero.tipo_tercero == ""){
      this.validar_tipo_tercero=false;
    } else{
      this.validar_tipo_tercero=true;
    }

    if(this.obj_tercero.foidciudad == 0){
      this.validar_foidciudad=false;
    } else{
      this.validar_foidciudad=true;
    }

    if(this.obj_tercero.fodpto == 0){
      this.validar_fodpto=false;
    } else{
      this.validar_fodpto=true;
    }
   

    if(this.validar_nit==true && this.validar_nombre==true && this.validar_telefono==true && this.validar_direccion==true && this.validar_correo==true && this.validar_descripcion==true && this.validar_tipo_tercero==true && this.validar_foidciudad==true && this.validar_fodpto==true && funcion =='guardar'){
      //console.log(this.obj_tercero);
      this.guardar();
      
    }

    if(this.validar_nit==true && this.validar_nombre==true && this.validar_telefono==true && this.validar_direccion==true && this.validar_correo==true && this.validar_descripcion==true && this.validar_tipo_tercero==true && this.validar_foidciudad==true && this.validar_fodpto==true && funcion =='editar'){
      this.editar();
    }


  }


  //INSERTAR: funcion para insertar los datos del formulario
  guardar(){
    this.sterce.insertar(this.obj_tercero).subscribe((datos:any) => {
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
      title: "Esta seguro de eliminar el Tercero?",
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
      this.sterce.eliminar(id).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          this.consulta();
        }
      });
      ///////////

        Swal.fire({
          title: "Tercero Eliminado!",
          text: "El tercero ha sido eliminado",
          icon: "success"
        });
      }
    });

  }

  //EDITAR: cargar los datos al formulario para editarlos
  cargar_datos(items: any, id: number){
    
    //this.consultaciudad(items.fodpto);
    
    this.obj_tercero = {
      //id_tercero: ,
      nit: items.nit,
      nombre: items.nombre,
      telefono: items.telefono,
      direccion: items.direccion,
      correo: items.correo,
      descripcion: items.descripcion,
      tipo_tercero: items.tipo_tercero,
      foidciudad: items.foidciudad,
      fodpto: items.fodpto
    }
    this.id_tercero=id;
  

 
    console.log(this.ciudad);
    //console.log(this.obj_tercero);
    //console.log("holaaaaaaaa");
    //console.log(this.ciudadeditar);
 
   // console.log(this.validar_foidciudad);
    //console.log(this.id_pdto);

    this.botones_form=true;
    this.mostar_form('mostrar')
  }

  //EDITAR:  editar datos,  ejecuta funcion editar
  editar(){
    this.sterce.editar(this.id_tercero, this.obj_tercero).subscribe((datos:any) => {
      if (datos['resultado']=='OK'){
        this.consulta();
      }
    })
    this.limpiar();
    this.mostar_form('no mostrar');
  }


}