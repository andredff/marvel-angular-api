import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Character } from './../../models/marvelResponse.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

  @Input() getCharacters;
  @Input() totalCharacters;
  characters: Character[];
  page = 1;
  pageSize = 12;

  @Output() numeroPagina = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['getCharacters']) {
      this.characters = this.getCharacters;
    }
  }

  click(ev) {
    this.numeroPagina.emit(ev);
  }

}
