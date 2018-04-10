import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit {
  @Output () newQuoteEmitter = new EventEmitter();
  onSubmit(data){
    console.log(data)
    this.newQuoteEmitter.emit(data)
  }

  constructor() { }
  ngOnInit() { }
}
