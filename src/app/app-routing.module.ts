import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'start-panel', loadChildren: './start-panel/start-panel.module#StartPanelPageModule' },
  { path: 'machines', loadChildren: './machines/machines.module#MachinesPageModule' },
   { path: 'start-training', loadChildren: './start-training/start-training.module#StartTrainingPageModule'},
  {path: 'view-trainings',loadChildren: './view-trainings/view-trainings.module#ViewTrainingsPageModule'},
  // { path: 'training', loadChildren: './training/training.module#TrainingPageModule' },
  // { path: 'overview', loadChildren: './overview/overview.module#OverviewPageModule' },
  // { path: 'advisor', loadChildren: './advisor/advisor.module#AdvisorPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
