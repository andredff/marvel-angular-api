import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CharactersService } from '../services/characters.service';
import { Character, Thumbnail } from './../models/marvelResponse.interface';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  characters: any;
  charactersImg: any;

  constructor(private characterService: CharactersService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.characterService.getCharacters()
      .subscribe(res => {
        this.characters = res.results;
        console.log(this.characters);
      });
  }



}
