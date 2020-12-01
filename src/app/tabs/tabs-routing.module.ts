import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../pages/home1/home1.module').then(m => m.Home1PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../pages/home2/home2.module').then(m => m.Home2PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../pages/home3/home3.module').then(m => m.Home3PageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../pages/home4/home4.module').then(m => m.Home4PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
