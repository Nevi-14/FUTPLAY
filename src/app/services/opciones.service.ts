import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { JoinClubComponent } from '../components/join-club-component/join-club-component';
import { OpcionesComponent } from '../components/opciones/opciones.component';
import { ClubService } from './club.service';
import { JugadoresClubesService } from './jugador-clubes.service';
import { RetosService } from './retos.service';
import { SolicitudesService } from './solicitudes.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {
  modalActual : any
  constructor(public modalCtrl: ModalController, public clubService: ClubService, public userService: UserService, public solicitudesService: SolicitudesService, public jugadoresClubesService: JugadoresClubesService,public router: Router, public retoService: RetosService) { }


  async opciones(titulo,opciones){



    const modal = await this.modalCtrl.create({
      component: OpcionesComponent,
      cssClass: 'autoheight-modal-bottom',
      backdropDismiss: true,
      swipeToClose:true,
      animated: true,
      componentProps: {
       titulo: titulo,
       opciones:opciones
      }
      
  
    });
  
    modal.present();
    let modalReady = false;
    modal.onDidDismiss().then((data)=>{
     if(data.data != undefined ){

      this.modalCtrl.dismiss();
     }
   })

 
  }

  funciones(funcion, parametros){

    switch(funcion) {
    
      case 'verClub':
        this.modalCtrl.dismiss();
        this.clubService.verClub(parametros.arreglo);
        break;
      case 'agregarClub':
        this.modalCtrl.dismiss();
        this.clubService.agregarClub(parametros.clubID);

        break;
        case 'enviarRetoClub1':
          this.retoService.rival1 =  parametros.arreglo; 
        
         // console.log(parametros.arreglo)
           this.modalCtrl.dismiss();
         this.modalActual.dismiss()
        
      
   
      

        // this.clubService.enviarRetoClub(parametros.arreglo);
          break;
          break;
          case 'enviarRetoClub2':
            this.retoService.rival2 =  parametros.arreglo; 
             this.modalCtrl.dismiss();
           this.modalActual.dismiss()
          
        
     
        
  
          // this.clubService.enviarRetoClub(parametros.arreglo);
            break;
          case 'marcarFavorito':
            // code block
            break;
            case 'verUsuario':
    
              this.modalCtrl.dismiss();
              this.userService.verUsuario(parametros.userID);
              break;
            case 'agregarUsuario':
              this.modalCtrl.dismiss();
              this.solicitudesService.agregarUsuarioSolitud(parametros.solicitud);
      
              break;
              case 'eliminarSolicitud':
                this.modalCtrl.dismiss();
               this.solicitudesService.eliminarSolicitud(parametros.solicitudId);
                break;
                case 'clubAdmin':
                  this.modalCtrl.dismiss();
                  this.clubService.makeAdmin(parametros.jugadorID);
           
                  break;
                  case 'deletePlayer':
                    this.modalCtrl.dismiss();
                   this.jugadoresClubesService.deletePlayer(parametros.jugadorID);
                    break;
                    case 'agregarRival':
                      this.modalCtrl.dismiss();
                    alert('helo')
                      break;
                    case 'reservarCancha':
                      this.modalCtrl.dismiss();

                      this.retoService.cancha = parametros.canchaId
                      this.router.navigate(['/calendar-page'])
//this.equiposModal();
                    break;
      default:
        // code block
    }
    
    
    }
    
    async equiposModal(identificador){


      const modal = await this.modalCtrl.create({
        component: JoinClubComponent,
        cssClass: 'custom-class',
        backdropDismiss: true,
        swipeToClose:true,
        animated: true,
        componentProps: {
          header:true,
          titulo:'Seleccionar Equipo',
          equipo: identificador
        }
        
    
      });
    
      this.modalActual = modal;
       this.modalActual.present();



      
    }

    

}
