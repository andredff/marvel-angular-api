import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';

import { Observable } from 'rxjs';
import { catchError, map, timestamp } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';

import { MarvelResponse } from './../models/marvelResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  private getHash(timeStamp: string) {
    let hashGenerator: Md5 = new Md5();

    hashGenerator.appendStr(timeStamp);
    hashGenerator.appendStr(this.privateKey);
    hashGenerator.appendStr(this.publicKey);

    const hash: string = hashGenerator.end().toString();

    return hash;
  }

  private getTimeStamp() {
    return new Date().valueOf().toString();
  }

  getCharacters(term?: string, order?: boolean, page?: string): Observable<MarvelResponse> {
    const ts = this.getTimeStamp();
    const hash = this.getHash(ts);
    const apikey = this.publicKey;
    const limit = '100';
    const name = term;
    const offset = page;

    let params = new HttpParams();
    params = params.append('ts', ts);
    params = params.append('apikey', apikey);
    params = params.append('hash', hash);
    params = params.append('limit', limit);
    params = params.append('offset', offset);

    if (order) {
      params = params.append('orderBy', '-name');
    }
    if (term) {
      params = params.append('nameStartsWith', name);
    }

    const response = this.http
      .get(this.UrlServiceV1, { params })
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );

    return response;
  }

}
