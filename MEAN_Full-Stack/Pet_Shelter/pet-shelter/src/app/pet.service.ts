import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class PetService {
  pets: BehaviorSubject<any[]> = new BehaviorSubject([]);
  pet: BehaviorSubject<any> = new BehaviorSubject(null);
  error: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(    
    private _http: Http,
    private _http2: HttpClient
  ) { }

  createPet(pet){
    this._http.post('/new', pet).subscribe(
      pet => {
        if(pet.json() == null){
          this.error.next('This pet is already at the shelter.')
        } else {
          this.retrievePets()
        }
      });
  }
  showPet(id){
    console.log('ran showpet with id: ' + id)
    this._http.get('/pet_details/'+id).subscribe(
      pet => this.pet.next(pet.json()),
      errorResponse => console.log(errorResponse)
    );
  }
  likePet(id){
    this._http.get('/like_pet/'+id).subscribe(
      pet => this.pet.next(pet.json()),
      errorResponse => console.log(errorResponse)
    );
  }
  updatePet(data){
    this._http.post('/update/'+data.pet_id, data.new_pet).subscribe(
      pet => {
        if(pet.json() == null){
          this.error.next('This pet is already at the shelter.')
        } else {
          this.pet.next(pet.json())
          this.retrievePets()
        }
      })
  }
  deletePet(id){
    this._http.delete('/delete/'+id).subscribe(
      pets => {
        this.pet.next(null)
        this.retrievePets()
      });
  }
  retrievePets(){
    console.log('retrieving pets...')
    this.error.next('');
    this._http.get('/pets').subscribe(
      pets => this.pets.next(pets.json()),
      errorResponse => console.log(errorResponse)
    );
  }
}
