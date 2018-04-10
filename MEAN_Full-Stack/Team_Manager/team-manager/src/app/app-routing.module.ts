import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerStatusComponent } from './player-status/player-status.component';
import { AddComponent } from './player-list/add/add.component';
import { ListComponent } from './player-list/list/list.component';

const routes: Routes = [
  {path: '', redirectTo: 'players/list', pathMatch: 'full'},
  {path: 'players/list', component: PlayerListComponent, children:[
    {path: '', redirectTo: 'list', pathMatch:'full'},
    {path: 'list', component: ListComponent},
    {path: 'add', component: AddComponent, pathMatch: 'full'}
  ]},
  {path: 'players/status', component: PlayerStatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
