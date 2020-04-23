import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTrainingsPage } from './view-trainings.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTrainingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTrainingsPageRoutingModule {}
