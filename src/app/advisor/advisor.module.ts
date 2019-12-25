import { NgModule,  NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdvisorPage } from './advisor.page';

const routes: Routes = [
  {
    path: '',
    component: AdvisorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdvisorPage],
  schemas:  [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]

})
export class AdvisorPageModule {}
