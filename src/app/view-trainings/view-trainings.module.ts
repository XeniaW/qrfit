import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTrainingsPageRoutingModule } from './view-trainings-routing.module';

import { ViewTrainingsPage } from './view-trainings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTrainingsPageRoutingModule
  ],
  declarations: [ViewTrainingsPage]
})
export class ViewTrainingsPageModule {}
