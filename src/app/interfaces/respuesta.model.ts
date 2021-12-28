

export class RespuestaModel {
    id?: String;
    nombre?: String;
    documento?: String;
    email?: String;
    pregunta1?: String;
    pregunta2?: String;
    pregunta3?: String;
    pregunta4?: String;
    pregunta5?: String;
    fecha?: Date;

    constructor() {
        this.fecha = new Date();
    }
}