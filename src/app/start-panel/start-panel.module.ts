import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StartPanelPage } from './start-panel.page';

const routes: Routes = [
  {
    path: '',
    component: StartPanelPage,
    children: [
      {
        path: 'overview',
        loadChildren: '../overview/overview.module#OverviewPageModule',
      },
      {
        path: 'advisor',
        loadChildren: '../advisor/advisor.module#AdvisorPageModule',
      },
      {
        path: 'training',
        loadChildren: '../training/training.module#TrainingPageModule',
      }
    ]
  },
  {
    path: '',
    redirectTo: '../start-panel/training',
    pathMatch: 'full',
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StartPanelPage]
})
export class StartPanelPageModule {}
