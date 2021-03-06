import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { JugadoresEquipos } from 'src/app/models/jugadoresEquipos';
import { EquiposService } from 'src/app/services/equipos.service';
import { EvaluacionEquipoPage } from '../evaluacion-equipo/evaluacion-equipo.page';
import { HistorialPartidosJugador } from '../../models/historialPartidosJugador';
import { HistorialPartido } from 'src/app/models/historialPartido';
import { HistorialPartidoService } from 'src/app/services/historial-partido.service';

@Component({
  selector: 'app-evaluacion-jugador',
  templateUrl: './evaluacion-jugador.page.html',
  styleUrls: ['./evaluacion-jugador.page.scss'],
})
export class EvaluacionJugadorPage implements OnInit {
@Input() jugadores:JugadoresEquipos[]
@Input() equipo:JugadoresEquipos
@Input() partido : HistorialPartido
@ViewChild(IonSlides) slides: IonSlides;
evaluacionJugador:HistorialPartidosJugador = {
  Cod_Historial_Jugador:null,
  Cod_Partido: 0,
  Jugador_Futplay: 0,
  Jugador_Del_Partido: 0

}
stadiumProfile =  'assets/main/player-profile.svg';
slideOpts = {
  allowTouchMove: false
  };
  
  constructor(
public modalCtrl: ModalController,
public equiposService:EquiposService,
public historialPartido:HistorialPartidoService

  ) { }

  ngOnInit() {

    this.evaluacionJugador.Cod_Partido = this.partido.Cod_Partido;
console.log(this.partido,'patidooo')
    console.log(this.jugadores, 'this.jugadores',' this.evaluacionJugador', this.evaluacionJugador)

  }
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    
    this.slides.slideNext();
  }
  async  continuar(){

    const modal = await this.modalCtrl.create({
      component: EvaluacionEquipoPage,
      cssClass: 'my-custom-class',
      componentProps:{
        equipo:this.equipo
      }
    });

   return await modal.present();

this.slideNext();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  agregarJFP(value){
    console.log(value.detail.value.Cod_Usuario,'agregarJFP');
    this.evaluacionJugador.Jugador_Futplay = value.detail.value.Cod_Usuario
    console.log('final eva', this.evaluacionJugador)
    this.historialPartido.evaluacionJugador(this.evaluacionJugador);
    this.cerrarModal();
    this.continuar();
   
  }
  agregarJDP(value){
    console.log(value.detail.value.Cod_Usuario,'agregarJDP');
    this.evaluacionJugador.Jugador_Del_Partido = value.detail.value.Cod_Usuario
    this.slideNext();

  }

}
