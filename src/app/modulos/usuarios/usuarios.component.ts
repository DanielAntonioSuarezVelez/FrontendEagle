import { Component } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {


  //CONSULTA: Objeto para consulta
  usuario:any;

  //INSERTAR: variable global para listar roles
  roles: any

  //EDITAR: variable global para editar
  id_usuario: any

  //INSERTAR: Objeto inicial para insertar
  obj_usuario= {
    nombre: "",
    cedula: "",
    telefono: "",
    direccion: "",
    correo: "",
    password: "",
    foidrol: 0,

  }

  //INSERTAR: Variables globales para validacion para insertar
  validar_nombre=true;
  validar_cedula=true;
  validar_telefono=true;
  validar_direccion=true;
  validar_correo=true;
  validar_password=true;
  validar_foidrol=true;
  mform=false;
  botones_form=false;


  //GENERAL Constructor, se agregan los servicios que intervienen
  constructor(private susuario: UsuariosService) {}

  //CONSULTA: Metodos Consulta
  ngOnInit(): void{
    this.consulta();
    this.consulta_roles();


  }

  consulta(){
    this.susuario.consultar().subscribe((resultado:any) => {
      this.usuario=resultado; 
    })
  }

  consulta_roles(){
    this.susuario.consultar_roles().subscribe((resultado:any) => {
      this.roles=resultado; 
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
    this.obj_usuario= {
      nombre: "",
      cedula: "",
      telefono: "",
      direccion: "",
      correo: "",
      password: "",
      foidrol: 0,
  
    }
  }


  //INSERTAR: validar bjeto para insertar
  validar(funcion: any){
    if(this.obj_usuario.nombre == ""){
      this.validar_nombre=false;
    } else{
      this.validar_nombre=true;
    }

    if(this.obj_usuario.cedula == ""){
      this.validar_cedula=false;
    } else{
      this.validar_cedula=true;
    }

    if(this.obj_usuario.telefono == ""){
      this.validar_telefono=false;
    } else{
      this.validar_telefono=true;
    }

    if(this.obj_usuario.direccion == ""){
      this.validar_direccion=false;
    } else{
      this.validar_direccion=true;
    }

    if(this.obj_usuario.correo == ""){
      this.validar_correo=false;
    } else{
      this.validar_correo=true;
    }

    if(this.obj_usuario.password == ""){
      this.validar_password=false;
    } else{
      this.validar_password=true;
    }

    if(this.obj_usuario.foidrol == 0){
      this.validar_foidrol=false;
    } else{
      this.validar_foidrol=true;
    }

    if(this.validar_nombre==true && this.validar_cedula==true && this.validar_telefono==true && this.validar_direccion==true && this.validar_correo==true && this.validar_password==true && this.validar_foidrol==true && funcion =='guardar'){
      //console.log(this.obj_compra);
      this.guardar();
    } 

    if(this.validar_nombre==true && this.validar_cedula==true && this.validar_telefono==true && this.validar_direccion==true && this.validar_correo==true && this.validar_password==true && this.validar_foidrol==true && funcion =='editar'){
      //console.log(this.obj_compra);
      this.editar();
    } 

  }


  //INSERTAR: funcion para insertar los datos del formulario
  guardar(){
    this.susuario.insertar(this.obj_usuario).subscribe((datos:any) => {
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
      title: "Esta seguro de eliminar el usuario?",
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
      this.susuario.eliminar(id).subscribe((datos:any) => {
        if (datos['resultado']=='OK') {
          this.consulta();
        }
      });
      ///////////

        Swal.fire({
          title: "Usuario Eliminado!",
          text: "El usuario ha sido eliminado",
          icon: "success"
        });
      }
    });

  }

  //EDITAR: cargar los datos al formulario para editarlos
  cargar_datos(items: any, id: number){
    
    this.obj_usuario = {

      nombre: items.nombre,
      cedula: items.cedula,
      telefono: items.telefono,
      direccion: items.direccion,
      correo: items.correo,
      password:items.password,
      foidrol: items.foidrol,
  
    }
    this.id_usuario=id;

    this.botones_form=true;
    this.mostar_form('mostrar')
  }

  //EDITAR:  editar datos,  ejecuta funcion editar
  editar(){
    this.susuario.editar(this.id_usuario, this.obj_usuario).subscribe((datos:any) => {
      if (datos['resultado']=='OK'){
        this.consulta();
      }
    })
    this.limpiar();
    this.mostar_form('no mostrar');
  }





}
