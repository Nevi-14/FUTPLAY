import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ModalController, ActionSheetController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';
import { EquiposService } from '../../services/equipos.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolicitudesJugadoresEquipos } from '../../models/solicitudesJugadoresEquipos';
import { PerfilUsuario } from '../../models/perfilUsuario';
import { FiltroJugadorPage } from '../filtro-jugador/filtro-jugador.page';
import { PerfilJugadorPage } from '../perfil-jugador/perfil-jugador.page';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';

@Component({
  selector: 'app-buscar-jugadores',
  templateUrl: './buscar-jugadores.page.html',
  styleUrls: ['./buscar-jugadores.page.scss'],
})
export class BuscarJugadoresPage implements OnInit {
  textoBuscar = '';
  stadiumProfile =  'assets/main/game-match.svg';
  solicitudJugadorEquipo:SolicitudesJugadoresEquipos = {

    Cod_Solicitud : null,
    Cod_Usuario : null,
    Cod_Equipo :this.equiposService.perfilEquipo.Cod_Equipo,
    Confirmacion_Usuario:false,
    Confirmacion_Equipo:true,
    Fecha: new Date(),
    Estado: true,
    Usuarios: null,
    Equipos: null
  
  }
    constructor(
      public modalCtrl: ModalController,
      public equiposService: EquiposService,
      public usuariosService:UsuariosService,
      public solicitudesService:SolicitudesService,
      public actionSheetCtrl: ActionSheetController
    ) { }
  
    ngOnInit() {
  this.usuariosService.syncUsusarios(this.usuariosService.usuarioActual.Cod_Usuario);
      this.equiposService.SyncEquipos(this.usuariosService.usuarioActual.Cod_Usuario);
    }
    jugadorEquipoSolicitud(usuario: PerfilUsuario){
      this.solicitudJugadorEquipo.Cod_Usuario = usuario.Cod_Usuario
  
      this.solicitudesService.generarSolicitud(this.solicitudJugadorEquipo);

      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }
  
    cerrarModal(){
  
      this.modalCtrl.dismiss();
    }
    async perfilJugador(jugador) {
      const modal = await this.modalCtrl.create({
        component:PerfilJugadorPage,
        cssClass: 'my-custom-class',
        componentProps:{
          perfil: jugador
        }
      });
      return await modal.present();
    }
  
  
    async onOpenMenu(jugador){
      console.log(jugador)
      
          const normalBtns : ActionSheetButton[] = [
            {   
               text: 'Detalle Jugador',
               icon:'person-outline',
               handler: () =>{
       this.perfilJugador(jugador);
               }
              
              },
        
              {   
                text: 'Enviar Solicitud',
                icon:'paper-plane-outline',
                handler: () =>{
                  this.jugadorEquipoSolicitud(jugador)
                }
               
               },
              
               {   
                text: 'Cancelar',
                icon:'close-outline',
               role:'cancel',
               
               }
            
              ]
        
        
        
        
          const actionSheet = await this.actionSheetCtrl.create({
            header:'Opciones',
            cssClass: 'left-align-buttons',
            buttons:normalBtns,
            mode:'ios'
          });
        
        
        
        
        
        await actionSheet.present();
        
        
          }
          onSearchChange(event){

            this.textoBuscar = event.detail.value;
              }
              
          async filtroUbicacion(){

  
     
            const modal  = await this.modalCtrl.create({
             component: FiltroUbicacionPage,
             cssClass: 'my-custom-class',
             id:'my-modal-id'
           });
           await modal .present();
         }


    async filtroJugador(){
  
    
       
      const modal  = await this.modalCtrl.create({
       component: FiltroJugadorPage,
       cssClass: 'my-custom-class',
       id:'my-modal-id'
     });
     await modal .present();
   }


}
