import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShelterComponent } from './shelter/shelter.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path: '', pathMatch:'full', component: ShelterComponent},
  {path: 'home', pathMatch:'full', redirectTo: ''},
  {path: 'new', component: AddComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'details/:id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
