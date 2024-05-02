import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Provider } from 'src/app/models/provider'; // Assuming Provider is the model for providers

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private apiUrl = 'http://localhost:3000/providers';

  constructor(private http: HttpClient) { }

  getAllProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getProviderById(id: number): Observable<Provider> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Provider>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateProvider(id: number, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError(this.handleUpdateError)
    );
  }

  private handleUpdateError(error: HttpErrorResponse) {
    let errorMessage = 'Error updating provider!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  deleteProvider(id: number): Observable<Provider> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Provider>(url).pipe(
      catchError(this.handleError)
    );
  }
}
