import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from '../pet.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
  pet: Pet = null;
  liked = false;

  constructor(
    private _petService: PetService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._petService.pet.subscribe(
      pet => this.pet = pet
    );
    this._petService.showPet(this._router.url.substr(this._router.url.lastIndexOf('/') + 1))
    this.liked = false;
  }

  add_like(id){
    this._petService.likePet(id);
    this.liked = true;
  }
  adopt(id){
    this._petService.deletePet(id);
    this._router.navigateByUrl('/');
  }

}
