import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';
import { Note } from './note';

@Injectable()
export class NoteService {
  notesObserver = new BehaviorSubject([]);

  constructor(private _http: Http) { }

  retrieveNotes() {
    this._http.get('/notes').subscribe(
      notes => this.notesObserver.next(notes.json()),
      errorResponse => console.log(errorResponse)
    );
  }

  createNote(note: Note) {
    console.log("service: creating note...")
    this._http.post('/notes', note).subscribe(
      response => this.retrieveNotes(),
      errorResponse => console.log(errorResponse)
    );
  }
}
