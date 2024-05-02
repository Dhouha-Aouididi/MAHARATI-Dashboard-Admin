import { Component, OnInit } from '@angular/core';
import { Demande } from '../models/demande'; // Adjust the model import to Demande
import { DemandeService } from '../services/demandes/demande.service';
import { Router } from '@angular/router';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  demandes: Demande[] = [];
  filteredDemandes: Demande[] = []; // Array to hold filtered demandes
  errorMessage: string = '';
  demandeToDelete: Demande | null = null; // Variable to store the demande to be deleted

  constructor(private demandeService: DemandeService, private router: Router) { } // Inject DemandeService

  ngOnInit(): void {
    this.fetchDemandes();
  }

  fetchDemandes() {
    this.demandeService.getAllDemandes().subscribe(
      (response: any) => {
        console.log('Demandes retrieved:', response.demandes);
        this.demandes = Object.values(response.demandes);
        this.filteredDemandes = [...this.demandes]; // Initialize filteredDemandes with all demandes
      },
      (error) => {
        console.log('Error fetching demandes:', error);
      }
    );
  }

  applyFilter(event: any) {
    const value = event.target.value;
    this.filteredDemandes = this.demandes.filter(demande =>
      demande.username.toLowerCase().includes(value.toLowerCase()) ||
      demande.subject.toLowerCase().includes(value.toLowerCase()) ||
      demande.message.toLowerCase().includes(value.toLowerCase())
    );
  }

  openConfirmationModal(demande: Demande) {
    if (demande) {
      this.demandeToDelete = demande;
      $('#confirmationModal').modal('show');
    }
  }

  closeConfirmationModal() {
    $('#confirmationModal').modal('hide');
  }

  deleteDemande() {
    if (this.demandeToDelete) {
      const demandeId = typeof this.demandeToDelete.id === 'string' ? parseInt(this.demandeToDelete.id, 10) : this.demandeToDelete.id;
      this.demandeService.deleteDemande(demandeId).subscribe(
        () => {
          // Reload demandes after deletion
          this.fetchDemandes();
          this.closeConfirmationModal(); // Close the confirmation modal
        },
        (error) => {
          this.errorMessage = 'Error deleting demande: ' + error.message;
          this.closeConfirmationModal(); // Close the confirmation modal
        }
      );
    }
  }

  editDemande(demande: Demande) {
    // Redirect to edit page with demande ID
    this.router.navigate(['/edit-demande', demande.id]); // Update the route as per your routing configuration
  }

  openEmailToAccept(demande: any) {
    const email = `mailto:recipient@example.com?subject=Demande Acceptée - ${demande.id}&body=Bonjour,\n\nJ'accepte la demande ${demande.id}. Veuillez trouver plus de détails ci-dessous:\n\n[Détails de la demande]\n\nCordialement,\n[Votre nom]`;
    window.location.href = email;
  }
  

}
