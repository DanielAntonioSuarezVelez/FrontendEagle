import { Component } from '@angular/core';
import { DashboardService } from '../../servicios/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  //CONSULTA: Objeto para consulta
  pedidos:any;
  compras:any;
  productos:any;
  clientes:any;


  //GENERAL Constructor, se agregan los servicios que intervienen
  constructor(private sdashboard: DashboardService) {}

  //CONSULTA: Metodos Consulta
  ngOnInit(): void{
    this.contarPedidos();
    this.contarcompras();
    this.contarproductos();
    this.contarclientes();

  }

  contarPedidos(){
    this.sdashboard.consultapedido().subscribe((resultado:any) => {
      this.pedidos=resultado; 
      //console.log(this.pedidos);
    })
  }

  contarcompras(){
    this.sdashboard.consultacompra().subscribe((resultado:any) => {
      this.compras=resultado; 
    })
  }

  contarproductos(){
    this.sdashboard.consultaproducto().subscribe((resultado:any) => {
      this.productos=resultado; 
    })
  }

  contarclientes(){
    this.sdashboard.consultacliente().subscribe((resultado:any) => {
      this.clientes=resultado; 
    })
  }

  

}
