import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CharactersAppComponent } from './characters.app.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    CharactersAppComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
})
export class CharactersModule { }
