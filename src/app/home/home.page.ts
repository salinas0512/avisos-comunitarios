import { Component, OnInit, } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton,IonIcon } from '@ionic/angular/standalone';
import { ListPublicacionComponent } from '../componentes/list-publicacion/list-publicacion.component';
import { RouterModule } from '@angular/router';
import { addOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonFab, IonFabButton, IonIcon, ListPublicacionComponent,RouterModule],
})
export class HomePage implements OnInit{

  constructor() {
    addIcons({addOutline, trashOutline });
  }
  ngOnInit() {
  }
}
