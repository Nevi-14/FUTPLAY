import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Solicitud } from 'src/app/models/solicitudes';
import { ClubService } from 'src/app/services/club.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { UserService } from 'src/app/services/user.service';
import { ClubInfoComponent } from '../club-info/club-info.component';

@Component({
  selector: 'app-join-club-component',
  templateUrl: './join-club-component.component.html',
  styleUrls: ['./join-club-component.component.scss'],
})
export class JoinClubComponentComponent implements OnInit {
  textoBuscar = '';
  constructor( private modalCtrl: ModalController, private clubs: ClubService, private solicitudes: SolicitudesService, private user: UserService, private alertCtrl: AlertController) {  }


  ngOnInit() {}

  onSearchChange(event){
    console.log(event.detail.value);
    this.textoBuscar = event.detail.value;
  }
  async message( text: string){
    const alert = await this.alertCtrl.create({
      header: 'Futplay',
      message: text,
    });
    alert.present();
  }
  delete(solicitudId: number){
    console.log(solicitudId);
    this.solicitudes.delete(solicitudId);
    console.log(this.solicitudes.solicitudes);
  }
  add(clubID: number){
    this.solicitudes.solicitudes.push(new Solicitud(this.solicitudes.solicitudes.length+1,clubID,this.user.currentUser.usuarioID,true,false));
    console.log(this.solicitudes.solicitudes);
    this.message('Solicitud enviada');
      }
  async send(club){
    const modal = await this.modalCtrl.create({
     component: ClubInfoComponent,
     cssClass: 'my-custom-class',
     componentProps:{
      club:club
     }
   });
   return await modal.present();
 }

 cerrarModal(){
  this.modalCtrl.dismiss();
}

}