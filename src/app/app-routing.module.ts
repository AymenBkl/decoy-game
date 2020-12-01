import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home1',
    loadChildren: () => import('./pages/home1/home1.module').then( m => m.Home1PageModule)
  },
  {
    path: 'home3',
    loadChildren: () => import('./pages/home3/home3.module').then( m => m.Home3PageModule)
  },
  {
    path: 'home4',
    loadChildren: () => import('./pages/home4/home4.module').then( m => m.Home4PageModule)
  },
  {
    path: 'home2',
    loadChildren: () => import('./pages/home2/home2.module').then( m => m.Home2PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
