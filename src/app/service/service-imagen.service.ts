import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceImagenService {
  
  baseApiUrl = "http://localhost:3000/file/"

  constructor(private http: HttpClient) { }
 

  upload(file: any):Observable<any> {
  
    
    const formData = new FormData(); 
      
    
    formData.append("file", file, file.name);
    console.log("DATA");
    console.log(formData);
   
    return this.http.post(this.baseApiUrl, formData);
  }
}
