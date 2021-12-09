import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsPageRoutingModule } from './reservations-routing.module';

import { ReservationsPage } from './reservations.page';
import { ComponentsModule } from '../../components/components.module';
import {NgCalendarModule} from 'ionic2-calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationsPageRoutingModule,
    ComponentsModule,
    NgCalendarModule
  ],
  declarations: [ReservationsPage]
})
export class ReservationsPageModule {}
