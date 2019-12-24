import { Component, OnInit } from '@angular/core';

//*Importar clase para utilizarla en el componente
import { Client } from '../client';
//*Importar Router, este hace que te puedas mover a otra ruta, es decir otra pagina.
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  /**
   **Creacion de objecto Client.
   **Se crea un objecto Client de tipo array por que en el se contendran todos los clients.
   **Se crea dentro del array un Json con los datos de acuerdo a los atributos de Client
   */
  clients: Client[] = [
    {id: 1, name: 'Jorge', lastname: 'Gonzalez', email: 'jorge@email.com', age: 25, gender: 'male'},
    {id: 2, name: 'Jorge', lastname: 'Gonzalez', email: 'jorge@email.com', age: 25, gender: 'male'},
    {id: 3, name: 'Jorge', lastname: 'Gonzalez', email: 'jorge@email.com', age: 25, gender: 'male'},
    {id: 4, name: 'Jorge', lastname: 'Gonzalez', email: 'jorge@email.com', age: 25, gender: 'male'},
    {id: 5, name: 'Jorge', lastname: 'Gonzalez', email: 'jorge@email.com', age: 25, gender: 'male'},
    {id: 6, name: 'Jorge', lastname: 'Gonzalez', email: 'jorge@email.com', age: 25, gender: 'male'},
    {id: 8, name: 'Jorge', lastname: 'Gonzalez', email: 'jorge@email.com', age: 25, gender: 'male'},
    {id: 9, name: 'Jorge', lastname: 'Gonzalez', email: 'jorge@email.com', age: 25, gender: 'male'},
    {id: 10, name: 'Jorge', lastname: 'Gonzalez', email: 'jorge@email.com', age: 25, gender: 'male'}
  ];
  
  /**
   **Constructor
   **Se declara el objecto Router en el constructor para poder utilizarlo.
   */
  constructor(private router: Router) { }

  //*Main
  ngOnInit() 
  {
  
  }
  
  /**
   */
  editClient(id: number):void
  {

  }
  deleteClient(id: number):void
  {

  }

}
