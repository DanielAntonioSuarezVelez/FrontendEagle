import { Component } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  //Variables Globales para confultas
  email: any;
  clave: any;
  error=false;
  usuario:any;

  //Objeto usuario
    obj_usuario= {
    nombre: "",
    cedula: "",
    telefono: "",
    direccion: "",
    correo: "",
    password: "",
    foidrol:0,
  };

  constructor(private slogin: LoginService, private router: Router){}


    //CONSULTA: Metodos Consulta
    ngOnInit(): void{
      sessionStorage.setItem("id", "");
      sessionStorage.setItem("email", "");
      sessionStorage.setItem("nombre", "");
      sessionStorage.setItem("foidrol", "");

    }

    consulta(tecla:any){
      if(tecla == 13 || tecla==""){
        
        this.slogin.consultar(this.email,this.clave).subscribe((resultado:any)=>{
          this.usuario = resultado;
          //console.log(this.usuario);

            if (this.usuario[0].validar=='valida') {
              sessionStorage.setItem("id", this.usuario[0]['id_usuario']);
              sessionStorage.setItem("email", this.usuario[0]['correo']);
              sessionStorage.setItem("nombre", this.usuario[0]['nombre']);
              sessionStorage.setItem("foidrol", this.usuario[0]['foidrol']);
              this.router.navigate(['dashboard']);

            } else {
              this.error=true;
              //console.log("No ingreso", this.error);
              
            }

        })
      };
    };

}
