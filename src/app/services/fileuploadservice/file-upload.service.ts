import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Service } from 'src/app/models/service';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  baseURL = 'http://localhost:3000/services';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

 

  // Create Service
  addService(title: string, description: string, category: string, price: number, availability: 'available' | 'not_available', image: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price.toString());
    formData.append('availability', availability);
    formData.append('image', image);


    return this.http.post<Service>(`${this.baseURL}/create-service`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
