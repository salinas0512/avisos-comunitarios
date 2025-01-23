import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { FormPublicacionComponent } from "../../componentes/form-publicacion/form-publicacion.component";

@Component({
  selector: 'app-ingreso-aviso',
  templateUrl: './ingreso-aviso.page.html',
  styleUrls: ['./ingreso-aviso.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FormPublicacionComponent]
})
export class IngresoAvisoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
