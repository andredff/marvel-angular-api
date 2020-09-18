import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { debounceTime, switchMap, tap, distinctUntilChanged, catchError } from 'rxjs/operators';

import { CharactersService } from '../services/characters.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  characters: any;
  charactersImg: any;

  queryField = new FormControl();
  order: boolean = false;

  constructor(private characterService: CharactersService) { }

  ngOnInit() {
    this.getList();
    this.searchByName();
  }

  getList() {
    this.characterService.getCharacters(null, this.order)
      .subscribe(res => {
        this.characters = res.results;
      });
  }

  searchByName() {
    this.queryField.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(searchTerm => console.log(searchTerm)),
      switchMap((searchTerm => this.characterService.getCharacters(searchTerm)
      .pipe(
        catchError(error => from([]))))
      ))
      .subscribe(res => this.characters = res.results);
  }

  orderByName() {
    this.order = !this.order;
    this.getList();
  }



}
