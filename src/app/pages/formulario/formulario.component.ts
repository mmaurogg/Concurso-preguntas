import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespuestaModel } from 'src/app/interfaces/respuesta.model';
import { RespuestaService } from '../../services/respuesta.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  forma: FormGroup | any;
  respuesta: RespuestaModel = new RespuestaModel();

  constructor( private fb: FormBuilder,
                private respuestaService: RespuestaService,
                
    ) { 
    this.crearRespuesta();
    //this.cargarPregunta();
  }

  ngOnInit(): void {
  }

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
    return this.forma.get('pregunta1').invalid && this.forma.get('pregunta1').touched
  }

  get respuesta2NoValido() {
    return this.forma.get('pregunta2').invalid && this.forma.get('pregunta2').touched
  }

  get respuesta3NoValido() {
    return this.forma.get('pregunta3').invalid && this.forma.get('pregunta3').touched
  }

  get respuesta4NoValido() {
    return this.forma.get('pregunta4').invalid && this.forma.get('pregunta4').touched
  }

  get respuesta5NoValido() {
    return this.forma.get('pregunta5').invalid && this.forma.get('pregunta2').touched
  }

  crearRespuesta () {
    
    this.forma = this.fb.group({

      id: ['',],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      documento: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pregunta1: ['', Validators.required ],
      pregunta2: ['', Validators.required ],
      pregunta3: ['', Validators.required ],
      pregunta4: ['', Validators.required ],
      pregunta5: ['', Validators.required ]

    });
  }

  cargarPregunta() {

    this.forma.setValue({

      id: '',
      nombre: '',
      documento: '',
      email: '',
      pregunta1: '',
      pregunta2: '',
      pregunta3: '',
      pregunta4: '',
      pregunta5: '',

    });
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
    const respuesta = {
      
    id: this.forma.value.id,
    nombre: this.forma.value.nombre,
    documento: this.forma.value.documento,
    email: this.forma.value.email,
    pregunta1: this.forma.value.pregunta1,
    pregunta2: this.forma.value.pregunta2,
    pregunta3: this.forma.value.pregunta3,
    pregunta4: this.forma.value.pregunta4,
    pregunta5: this.forma.value.pregunta5
    }
  
    //posteo de informacion
      
      this.respuestaService.crearRespuesta( respuesta ).subscribe ( resp => {
        console.log( resp );
        this.respuesta = resp;
      });

  
    }
  
      
  
  }
  


