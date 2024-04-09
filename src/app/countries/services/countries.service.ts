import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map, delay } from 'rxjs';

import { Country } from '../interfaces/country';

//https://restcountries.com/#endpoints-full-name

//https://web.postman.co/workspace/My-Workspace~c381c77c-22bf-4a77-8adc-99854b3468cd/request/create?requestId=71f681fb-4176-4583-8098-d28fbb509aa5

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient ) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( () => of([]) ),
      delay( 2000 ),
    );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
  }


  searchCapital( term: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest(url);
  }

  searchCountry( term: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest(url);
  }

  searchRegion( region: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest(url);
  }


}
