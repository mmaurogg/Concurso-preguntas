

export interface Pregunta {
    id?: String;
    pregunta: String,
    respuestas: Array<Respuesta>,
    dificultad: Number
}

interface Respuesta {
    message: String;
    value: Number;
}