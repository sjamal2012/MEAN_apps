import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from '../pet.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {
  newPet: Pet = new Pet();
  error: String = '';

  constructor(
    private _petService: PetService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._petService.error.subscribe(
      error => this.error = error
    );
  }

  add_pet(pet: Pet){
    this._petService.createPet(this.newPet);
    setTimeout(() => {
      if(this.error.length == 0){
        this._router.navigateByUrl('/');
        this.newPet = new Pet();
      } else {
        console.log('could not create pet')
      }
    }, 300);
  }
}
