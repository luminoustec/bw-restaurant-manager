import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestoAppComponent } from './resto-sce.page';

const routes: Routes = [
  {
    path: '',
    component: RestoAppComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestoAppRoutingModule { }
