import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'start-panel', loadChildren: './start-panel/start-panel.module#StartPanelPageModule' },
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
