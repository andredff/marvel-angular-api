import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  characters;

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
