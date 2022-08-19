import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuctionSQLServerService {

  constructor(private http:HttpClient) { }

  share(busqueda: string){
    return 'daa';
  }

  
}
