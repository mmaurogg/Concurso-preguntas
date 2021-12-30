

export interface Pregunta {
    id?: String;
    pregunta: String,
    // respuestaV: {
    //     message: String,
    //     value: Number;
    // },
    // respuestaF: Array<String>,
    respuestas: Array<Respuesta>,
    dificultad: Number
}

interface Respuesta {
    message: String;
    value: Number;
}