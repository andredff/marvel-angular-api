import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CharactersRoutingModule } from './characters.route';
import { CharactersAppComponent } from './characters.app.component';
import { ListComponent } from './list/list.component';
import { CharactersService } from './services/characters.service';



@NgModule({
  declarations: [
    CharactersAppComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CharactersRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    CharactersService
  ]
})
export class CharactersModule { }
