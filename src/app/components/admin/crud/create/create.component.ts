//*Imports
import { Component, OnInit } from '@angular/core';

//*Importar clase para utilizarla en el componente
import { Client } from '../client';

//*Rutas de los archivos css y html para del component
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit 
{
  /**
   **Creacion de objecto Client.
   **Se crea un objecto Client de tipo array por que en el se contendran todos los clients.
   **Se crea dentro del array un Json con los datos de acuerdo a los atributos de Client
   */
  private client: Client = new Client();
  
  //*Constructor
  constructor() { }

  //*Main
  ngOnInit() 
  {
  
  }
  public createClient(): void{
    console.log('Clicked');
    console.log(this.client);
  }

}
