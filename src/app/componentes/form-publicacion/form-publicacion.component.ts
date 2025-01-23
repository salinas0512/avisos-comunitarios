import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonButton, IonLabel, IonItem, IonText, IonList, IonIcon, IonToast, IonImg } from "@ionic/angular/standalone";
import { PublicacionService } from 'src/app/servicios/publicacion.service'; 
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Publicacion } from 'src/app/modelo/publicacion';
import { addIcons } from 'ionicons';
import { cameraOutline, checkmarkDoneOutline} from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-form-publicacion',
  templateUrl: './form-publicacion.component.html',
  styleUrls: ['./form-publicacion.component.scss'],
  standalone: true,
  imports: [ IonToast, IonIcon, IonList, IonText, IonItem, IonLabel, IonInput, IonButton,FormsModule, CommonModule]
})
export class FormPublicacionComponent  implements OnInit {
  @ViewChild('tituloInput') tituloInput!: NgModel; 
  @ViewChild('descripcionInput') descripcionInput!: NgModel; 
  publicacion: Publicacion = new Publicacion(0, '', '', new Date(),''); // Inicializar el objeto de tipo publicacion
  isToastOpen: boolean =false;
  constructor(private publicacionService: PublicacionService) {
    addIcons({cameraOutline,checkmarkDoneOutline });
   }

  ngOnInit() {}

  agregarPublicacion() {
    if (this.publicacion.titulo.trim() && this.publicacion.descripcion.trim()) {
      this.publicacionService.agregarPublicacion(
        this.publicacion.titulo,
        this.publicacion.descripcion,
        this.publicacion.fecha.toISOString(),
        this.publicacion.foto ?? ''
      ).then(() => {
        this.mensajeExito();  // Ejecutar la función en lugar de pasarla como referencia
  
        // Marcar los campos como no tocados (untouched) después de guardar
        this.tituloInput.control.markAsUntouched();
        this.descripcionInput.control.markAsUntouched();
  
        // Limpiar los campos del formulario sin afectar los valores
        this.publicacion = new Publicacion(0, '', '', new Date(), ''); 
      }).catch(error => {
        console.error('Error al agregar la publicación:', error);
      });
    } else {
      alert('Por favor, complete los campos obligatorios.');
    }
  }
  mensajeExito() { 
    this.isToastOpen = true; 
  }
  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });
  
      console.log('Foto tomada:', image);  // Verifica que la foto se haya tomado correctamente
      const imagenBase64 = image.base64String;
      this.publicacion.foto = 'data:image/jpeg;base64,' + imagenBase64;
      console.log('Foto base64:', this.publicacion.foto);  // Verifica que la imagen esté en base64 correctamente
    } catch (error) {
      console.error('Error al tomar la foto:', error);  // Verifica si hay algún error
    }
  }
}