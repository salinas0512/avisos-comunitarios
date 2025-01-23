import { Component, OnInit } from '@angular/core';
import {IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonToast } from "@ionic/angular/standalone";
import { PublicacionService } from 'src/app/servicios/publicacion.service';
import { Publicacion } from 'src/app/modelo/publicacion';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trashOutline, trashBinOutline } from 'ionicons/icons';

@Component({
  selector: 'app-list-publicacion',
  templateUrl: './list-publicacion.component.html',
  styleUrls: ['./list-publicacion.component.scss'],
  standalone: true,
  imports: [IonToast, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonButtons, IonTitle, IonToolbar, IonHeader, IonModal,  IonButton,IonIcon, IonList, IonItem, IonLabel, CommonModule]
})
export class ListPublicacionComponent implements OnInit {
  publicaciones: Publicacion[] = []; // lista de publicaciones
  isModalOpen: boolean = false; // Estado del modal
  publicacionAEliminar: Publicacion | null = null; // Publicación seleccionada para eliminar
  isToastOpenEliminacion: boolean = false;

  constructor(private publicacionService: PublicacionService) {
    addIcons({ trashOutline, trashBinOutline });
  }

  async ngOnInit() {
    await this.publicacionService.iniciarPlugin();
    this.cargarPublicaciones(); // Cargar publicaciones cuando se inicie el componente
  }

  async cargarPublicaciones() {
    try {
      this.publicaciones = await this.publicacionService.obtenerPublicaciones(); // Obtener publicaciones desde el servicio
    } catch (error) {
      console.error('Error al cargar las publicaciones:', error);
    }
  }

  // Método para abrir el modal y guardar la publicación seleccionada para eliminar
  abrirModal(publicacion: Publicacion) {
    console.log("Abrir modal para la publicación:", publicacion); // Log para verificar que se está pasando la publicación
    this.publicacionAEliminar = publicacion; // Guardamos la publicación que será eliminada
    this.isModalOpen = true;  // Abrimos el modal
    console.log("Modal abierto:", this.isModalOpen); // Log para verificar si el modal se está abriendo
  }

  // Método para cerrar el modal
  cerrarModal() {
    console.log("Cerrando modal"); // Log para verificar cuándo se cierra el modal
    this.isModalOpen = false;
    this.publicacionAEliminar = null;  // Limpiamos la publicación seleccionada
    console.log("Modal cerrado:", this.isModalOpen); // Log para verificar que el modal se cierra
  }

  // Método para eliminar la publicación después de la confirmación en el modal
  async eliminarPublicacion() {
    console.log("Intentando eliminar la publicación:", this.publicacionAEliminar); // Log para verificar qué publicación se va a eliminar
    if (this.publicacionAEliminar) {
      try {
        // Usamos el operador `!` para indicar que publicacionAEliminar no es null
        await this.publicacionService.eliminarPublicacion(this.publicacionAEliminar.id!); // Eliminar publicación desde el servicio
        console.log("Publicación eliminada con éxito"); // Log cuando la publicación es eliminada exitosamente
        // Verificación adicional para asegurarse de que la publicación aún está definida
        this.publicaciones = this.publicaciones.filter(p => p.id !== this.publicacionAEliminar?.id);
        this.mensajeEliminacion(); // Aquí se llama al método para mostrar el toast
        this.cerrarModal();  // Cerramos el modal después de eliminar
      } catch (error) {
        console.error('Error al eliminar la publicación:', error); // Log de error si algo sale mal
      }
    }
  }
  mensajeEliminacion() { 
    this.isToastOpenEliminacion = true; 
  }
}