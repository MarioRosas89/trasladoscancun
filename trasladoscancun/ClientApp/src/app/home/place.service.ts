import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map, Observable, shareReplay } from "rxjs";
import { Places } from "./Places";
@Injectable({
    providedIn: 'root'
  })
export class PlacesService {
    cachedUsers$!: Observable<Places[]>;
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }
  
    getPlaces(): Observable<Places[]> {
        if (!this.cachedUsers$) {
            this.cachedUsers$ = this.requestPlaces().pipe(shareReplay(1));
          }
          return this.cachedUsers$;
    }

    private requestPlaces() {
        return this.http.get<Places[]>(this.baseUrl + "transports");
      }
  
  
  }