import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Provider } from 'src/app/models/provider';
import { HttpHeaders, HttpErrorResponse, HttpClient, HttpEvent } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileUploadProviderService {
  baseURL = 'http://localhost:3000/providers';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}
  addProvider(username: string, email: string, phone: string, services_offered: string, availability: 'available' | 'busy', image: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('services_offered', services_offered);
    // formData.append('ratings', ratings.toString());
    formData.append('availability', availability);
    formData.append('image', image);

    return this.http.post<Provider>(`${this.baseURL}/create-provider`, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}