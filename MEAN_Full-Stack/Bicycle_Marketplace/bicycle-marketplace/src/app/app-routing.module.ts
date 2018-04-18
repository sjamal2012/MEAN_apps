import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { ListMyComponent } from './browse/list-my/list-my.component';
import { ListAllComponent } from './browse/list-all/list-all.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'home', pathMatch: 'full', redirectTo: ''},
  {path: 'dashboard', component: BrowseComponent, children: [
    {path: '', component: ListAllComponent},
    {path: 'list', pathMatch: 'full', redirectTo: ''},
    {path: 'my_dash', component: ListMyComponent}
  ]},
  {path: 'dashboard/logout', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
