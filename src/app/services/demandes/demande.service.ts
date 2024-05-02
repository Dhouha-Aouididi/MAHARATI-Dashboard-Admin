import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Demande } from 'src/app/models/demande';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost:3000/demandes';

  constructor(private http: HttpClient) { }

  getAllDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.apiUrl).pipe(
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

  getDemandeById(id: number): Observable<Demande> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Demande>(url);
  }

  updateDemande(id: number, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError(this.handleUpdateError)
    );
  }

  private handleUpdateError(error: HttpErrorResponse) {
    let errorMessage = 'Error updating demande!';
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

  deleteDemande(id: number): Observable<Demande> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Demande>(url);
  }
}
