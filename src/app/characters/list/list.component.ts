import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from } from 'rxjs';
import { debounceTime, switchMap, tap, distinctUntilChanged, catchError } from 'rxjs/operators';

import { CharactersService } from '../services/characters.service';
import { Character } from '../models/marvelResponse.interface';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  characters: Character[];
  queryField = new FormControl();
  order = false;
  totalCharacters: number;
  loading = false;
  notFound = false;
  page = 1;
  pageSize = 12;



  constructor(private characterService: CharactersService) { }

  ngOnInit() {
    this.getList();
    this.searchByName();
  }

  getList() {
    this.characterService.getCharacters(null, this.order)
      .subscribe(res => {
        this.loading = true;
        this.totalCharacters = res.total;
        this.characters = res.results;
      });
    this.loading = false;

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
      .subscribe(res => {
        this.loading = true;
        this.characters = res.results;
        if (this.characters.length < 1) {
          this.notFound = true;
        } else {
          this.notFound = false;
        }
      });
    this.loading = false;
  }

  orderByName() {
    this.order = !this.order;
    this.getList();
  }



}
