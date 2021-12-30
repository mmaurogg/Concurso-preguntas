import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Pregunta } from '../interfaces/pregunta.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  // preguntas: Pregunta [] = [
    
    // {
    //   pregunta: "Pregunta 1 del cuestionario",
    //   respuestas: [{ message: "respuesta correcta", value: 1},
    //               { message: "respuesta incorrecta 1.1", value: 0},
    //               { message: "respuesta incorrecta 1.2", value: 0}, 
    //               { message: "respuesta incorrecta 1.3", value: 0}],
    // },
    // {
    //   pregunta: "Pregunta 2 del cuestionario",
    //   respuestas: [{ message: "respuesta correcta", value: 1},
    //               { message: "respuesta incorrecta 2.1", value: 0},
    //               { message: "respuesta incorrecta 2.2", value: 0}, 
    //               { message: "respuesta incorrecta 2.3", value: 0}],
    // },
    // {
    //   pregunta: "Pregunta 3 del cuestionario",
    //   respuestas: [{ message: "respuesta correcta", value: 1},
    //               { message: "respuesta incorrecta 3.1", value: 0},
    //               { message: "respuesta incorrecta 3.2", value: 0}, 
    //               { message: "respuesta incorrecta 3.3", value: 0}],
    // },
    // {
    //   pregunta: "Pregunta 4 del cuestionario",
    //   respuestas: [{ message: "respuesta correcta", value: 1},
    //               { message: "respuesta incorrecta 4.1", value: 0},
    //               { message: "respuesta incorrecta 4.2", value: 0}, 
    //               { message: "respuesta incorrecta 4.3", value: 0}],
    // },
    // {
    //   pregunta: "Pregunta 5 del cuestionario",
    //   respuestas: [{ message: "respuesta correcta", value: 1},
    //               { message: "respuesta incorrecta 5.1", value: 0},
    //               { message: "respuesta incorrecta 5.2", value: 0}, 
    //               { message: "respuesta incorrecta 5.3", value: 0}],
    // },
    
    // {
    //   pregunta: "Pregunta 1 del cuestionario",
    //   respuestaV: { message: "respuesta correcta", value: 1},
    //   respuestaF: ["respuesta incorrecta 1.1","respuesta incorrecta 1.2", "respuesta incorrecta 1.3"],
    // },
    // {
    //   pregunta: "Pregunta 2 del cuestionario",
    //   respuestaV: { message: "respuesta correcta", value: 1},
    //   respuestaF: ["respuesta incorrecta 2.1", "respuesta incorrecta 2.2", "respuesta incorrecta 2.3"],
    // },
    // {
    //   pregunta: "Pregunta 3 del cuestionario",
    //   respuestaV: { message: "respuesta correcta", value: 1},
    //   respuestaF: ["respuesta incorrecta 3.1", "respuesta incorrecta 3.2", "respuesta incorrecta 3.3"],
    // },
    // {
    //   pregunta: "Pregunta 4 del cuestionario",
    //   respuestaV: { message: "respuesta correcta", value: 1},
    //   respuestaF: ["respuesta incorrecta 4.1", "respuesta incorrecta 4.2", "respuesta incorrecta 4.3"],
    // },
    // {
    //   pregunta: "Pregunta 5 del cuestionario",
    //   respuestaV: { message: "respuesta correcta", value: 1},
    //   respuestaF: ["respuesta incorrecta 5.1", "respuesta incorrecta 5.2", "respuesta incorrecta 5.3"],
    // },
  // ];


  private url = "http://localhost:4040/api"
  
  constructor( private http: HttpClient ) { 

    this.getPreguntas();
  }



  getPreguntas() {

  //   return new Promise ( ( resolve, reject ) => {

  //     this.http.get(`${this.url}/listaPreguntas`)
  //   //.subscribe( (resp: Producto []) => {
  //   .subscribe( (resp: any ) => {    
  //   this.preguntas = resp.preguntas;
  //   console.log(resp.preguntas)
  //   console.log(this.preguntas)
    
  // });      
  // });

    return this.http.get(`${this.url}/listaPreguntas`)
    .pipe(
      map ( res => this.preguntasArreglo(res) )
    );

  }


  private preguntasArreglo ( preguntas: any ) {

    let arregloPreguntas: Pregunta[] = [];

    preguntas = preguntas.preguntas

    console.log( preguntas );

    if (preguntas === null ) {
      return [];
    }

    for (let i = 0; i < 5; i++) {
      let pregunta = this.indiceAleatorio (this.filtrarArreglo(preguntas, i+1));
      arregloPreguntas.push(pregunta);
    } 

    console.log(arregloPreguntas);

    return arregloPreguntas;


  }

  indiceAleatorio (datos:any) {
    return datos[Math.floor(Math.random() * datos.length)];
  }

  filtrarArreglo (array: any, value: Number) {

    let arrayN: Pregunta[] = [];

    array.forEach((pregunta: any) => {
        if (pregunta.dificultad == value) {
            arrayN.push(pregunta);
        }
    });

    return arrayN;
  }


}
