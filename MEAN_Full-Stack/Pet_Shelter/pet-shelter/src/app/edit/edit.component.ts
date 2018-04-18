import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Pet } from '../pet';
import { PetService } from '../pet.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet: Pet = null;
  error: String = '';

  constructor(
    private _petService: PetService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._petService.error.subscribe(
      error => this.error = error
    );
    this._petService.pet.subscribe(
      pet => this.pet = pet
    );
    this._petService.showPet(this._router.url.substr(this._router.url.lastIndexOf('/') + 1))
  }

  update_pet(data){
    this._petService.updatePet(data);
    console.log(data)
    setTimeout(() => {
      if(this.pet != null && this.error.length == 0){
        this._router.navigateByUrl('/details/'+data.pet_id);
      } else {
        console.error('could not update pet');
      }
    }, 300);
  }
}
