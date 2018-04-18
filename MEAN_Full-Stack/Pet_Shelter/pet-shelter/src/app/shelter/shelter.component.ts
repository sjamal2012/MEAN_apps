import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from '../pet.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShelterComponent implements OnInit {
  pets: Pet[] = [];
  pet: Pet = null;

  constructor(
    private _petService: PetService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._petService.pets.subscribe(
      pets => this.pets = pets
    );
    this._petService.pet.subscribe(
      pet => this.pet = pet
    );
    this._petService.retrievePets();
  }

  details(id){
    this._petService.showPet(id);
    setTimeout(() => {
      if(this.pet != null){
        this._router.navigateByUrl('/details/'+id);
      } else {
        console.error('could not find pet');
      }
    }, 300);
  }
  edit(id){
    this._petService.showPet(id);
    setTimeout(() => {
      if(this.pet != null){
        this._router.navigateByUrl('/edit/'+id);
      } else {
        console.error('could not find pet');
      }
    }, 300);

  }

}
