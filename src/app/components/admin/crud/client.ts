/**
 *Creacion de Modolelo para manipular los datos del cliente.
 *@export: se utiliza para poder exportar la clase en los componentes, 
 *si no se le agrega export la clase no podra ser exportada.
 *@number: es el tipo de dato para un int.
 *@string: es tipo de dato string.
 *@any: es el tipo de dato para cualquier tipo de dato sin espesificar.
 *@Declaracion de variables:     nombre_de_variable : tipo de variable (number, string, boolean, any).
 */

 //*Creacion de clase
export class Client{
    id: number;
    name: string;
    lastname: string;
    email: string;
    age: number;
    gender: string
}