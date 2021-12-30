import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespuestaModel } from 'src/app/interfaces/respuesta.model';
import { RespuestaService } from '../../services/respuesta.service';
import { PreguntaService } from '../../services/pregunta.service';
import { Pregunta } from 'src/app/interfaces/pregunta.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {

  forma: FormGroup | any;
  respuesta: RespuestaModel = new RespuestaModel();
  preguntas: Pregunta [] = [];

  //acierto: boolean = true;
  score: number = 0;
  premio: number = 150;
  identidadValidada: boolean = false; 


  constructor( private fb: FormBuilder,
                private respuestaService: RespuestaService,
                private preguntaService: PreguntaService
                
    ) { 
    this.crearRespuesta();
    this.cargarPreguntas();
  }

  ngOnInit(): void { }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get documentoNoValido() {
    return this.forma.get('documento').invalid && this.forma.get('documento').touched
  }

  get emailNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }

  get respuesta1NoValido() {
    return this.forma.get('respuesta1').invalid && this.forma.get('respuesta1').touched
  }

  get respuesta2NoValido() {
    return this.forma.get('respuesta2').invalid && this.forma.get('respuesta2').touched
  }

  get respuesta3NoValido() {
    return this.forma.get('respuesta3').invalid && this.forma.get('respuesta3').touched
  }

  get respuesta4NoValido() {
    return this.forma.get('respuesta4').invalid && this.forma.get('respuesta4').touched
  }

  get respuesta5NoValido() {
    return this.forma.get('respuesta5').invalid && this.forma.get('respuesta5').touched
  }

  crearRespuesta () {
    
    this.forma = this.fb.group({

      id: ['',],
      nombre: ['', Validators.required, Validators.minLength(3)],
      documento: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      respuesta1: ['', ],
      respuesta2: ['', ],
      respuesta3: ['', ],
      respuesta4: ['', ],
      respuesta5: ['', ]

    });
  }

  cargarPreguntas( ) {

    this.preguntaService.getPreguntas()
    .subscribe( (resp: any ) => {
      console.log(resp);
    this.preguntas = resp

    })
  }

  resetFormulario() {

    this.forma.reset({
      id: "",
      nombre: "",
      documento: "",
      email: "",
      respuesta1: "",
      respuesta2: "",
      respuesta3: "",
      respuesta4: "",
      respuesta5: "",
    });
    this.score = 0;
    this.identidadValidada = false;
    this.cargarPreguntas();
  }



  validar( valor: any ) {

  let acierto = false; 

    console.log(valor);
    if (valor.value == 1 ){

      alert("¡Respuesta correcta! su premio es de: " + this.premio),
      
      acierto = true
      this.score = this.score + 1;
      if (this.score == 5){
        alert("¡¡Felicitaciones!! ¡ha ganado el premio mayor!");
        this.guardar();
      }

      let resp = {
        respuesta: this.forma.value.respuesta1.message,
        pregunta: this.preguntas[0].pregunta,
        acierto: true,
        score: this.score,
      }
      
      this.premio += this.score*150;

    } else {
      console.log("respuesta incorrecta")
      alert("Respuesta incorrecta"),
      acierto = false
      this.guardar()
    }


    return acierto;

  }

  guardar() {
    console.log( this.forma );

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control: any) => {

        if (control instanceof FormGroup) {
          return Object.values(control.controls).forEach((control: any) => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    //almacenar la info
    const respuesta: RespuestaModel = {
      
    id: this.forma.value.id,
    nombre: this.forma.value.nombre,
    documento: this.forma.value.documento,
    email: this.forma.value.email,
    respuesta1: {
      respuesta: this.forma.value.respuesta1.message,
      pregunta: this.preguntas[0].pregunta,
    },
    respuesta2: {
      respuesta: this.forma.value.respuesta2.message,
      pregunta: this.preguntas[1].pregunta,
    },
    respuesta3:  {
      respuesta: this.forma.value.respuesta3.message,
      pregunta: this.preguntas[2].pregunta,
    },
    respuesta4:  {
      respuesta: this.forma.value.respuesta4.message,
      pregunta: this.preguntas[3].pregunta,
    },
    respuesta5:  {
      respuesta: this.forma.value.respuesta5.message,
      pregunta: this.preguntas[4].pregunta,
    },
    score: this.score,
    }
  
    //posteo de informacion
      this.respuestaService.crearRespuesta( respuesta ).subscribe ( resp => {
        console.log( resp );
        this.respuesta = resp;
      });

      this.resetFormulario()
    }

  
    validarIdentidad() {
    
      if (this.forma.invalid) {
        alert("Algo faltó")
        return Object.values(this.forma.controls).forEach((control: any) => {
  
          if (control instanceof FormGroup) {
            return Object.values(control.controls).forEach((control: any) => control.markAsTouched());
          } else {
            control.markAsTouched();
          }
          
        });
      } else {
        this.identidadValidada = true;
      alert("Tienes 3 minutos para responder todas las pregintas ¡Comencemos!")
            
      setTimeout(() => this.guardar(), 180000);

      }
  }


  }
