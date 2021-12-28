import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregunta } from '../interfaces/pregunta.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  cargando = true;
  preguntas: Pregunta [] = [];
  preguntasFiltrado: Pregunta[] = [];


  private url = "http://localhost:4040/api"
  
  constructor( private http: HttpClient ) { }



  getPreguntas ( ) {

    return new Promise ( ( resolve, reject ) => {

    this.http.get(`${ this.url }/Preguntas`)
      //.subscribe( (resp: Pregunta []) => {
      .subscribe( (resp: any ) => {    
      this.preguntas = resp;
      this.cargando = false;
      });
    });
  }

}
