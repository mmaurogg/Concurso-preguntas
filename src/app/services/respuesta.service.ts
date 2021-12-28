import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { RespuestaModel } from '../interfaces/respuesta.model';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private url = "http://localhost:4040/api"
  
  constructor( private http: HttpClient ) { }

  crearRespuesta ( respuesta: RespuestaModel ) : Observable <RespuestaModel>{

    console.log(respuesta);
    return this.http.post<RespuestaModel>(`${ this.url }/crearRespuesta`, respuesta
    ).pipe(
      map( (resp: any) => {
        respuesta.id = resp.respuesta;
        console.log(resp);
        return respuesta;
      })
    );
  }

}
