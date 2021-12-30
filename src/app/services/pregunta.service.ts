import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Pregunta } from '../interfaces/pregunta.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  private url = "http://localhost:4040/api"
  
  constructor( private http: HttpClient ) { 

    this.getPreguntas();
  }



  getPreguntas() {

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
