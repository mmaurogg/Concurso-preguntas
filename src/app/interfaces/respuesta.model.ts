

export class RespuestaModel {
    id?: String;
    nombre?: String;
    documento?: String;
    email?: String;
    respuesta1?: {
        respuesta: String,
        pregunta: String,
    };
    respuesta2?: {
        respuesta: String,
        pregunta: String,
    };
    respuesta3?: {
        respuesta: String,
        pregunta: String,
    };
    respuesta4?: {
        respuesta: String,
        pregunta: String,
    };
    respuesta5?: {
        respuesta: String,
        pregunta: String,
    };
    fecha?: Date;

    score?: Number;

    constructor() {
        this.fecha = new Date();
    }
}