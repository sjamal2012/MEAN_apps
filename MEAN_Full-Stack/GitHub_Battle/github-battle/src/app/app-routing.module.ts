import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BattleComponent } from './battle/battle.component';
import { RankingsComponent } from './rankings/rankings.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: BattleComponent},
  {path: 'battle', component: BattleComponent},
  {path: 'rankings', component: RankingsComponent},
  {path: 'results', pathMatch: 'full', component: ResultComponent},
  {path: 'battle/results', redirectTo: 'results', pathMatch: 'full'},
  {path: 'results/reset', pathMatch: 'full', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
