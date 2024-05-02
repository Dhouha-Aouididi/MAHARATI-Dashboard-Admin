import { Component, OnInit } from '@angular/core';
import { Provider } from '../models/provider'; // Adjust the model import to Provider
import { ProviderService } from '../services/provider-service/provider.service'; // Adjust the service import
import { Router } from '@angular/router';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  providers: Provider[] = [];
  filteredProviders: Provider[] = []; // Array to hold filtered providers
  errorMessage: string = '';
  providerToDelete: Provider | null = null; // Variable to store the provider to be deleted

  constructor(private providerService: ProviderService, private router: Router) { } // Inject ProviderService

  ngOnInit(): void {
    this.fetchProviders();
  }

  fetchProviders() {
    this.providerService.getAllProviders().subscribe(
      (response: any) => {
        console.log('Providers retrieved:', response.providers);
        this.providers = Object.values(response.providers);
        this.filteredProviders = [...this.providers]; // Initialize filteredProviders with all providers
      },
      (error) => {
        console.log('Error fetching providers:', error);
      }
    );
  }

  applyFilter(event: any) {
    const value = event.target.value;
    this.filteredProviders = this.providers.filter(provider =>
      provider.username.toLowerCase().includes(value.toLowerCase()) ||
      provider.services_offered.toLowerCase().includes(value.toLowerCase())
    );
  }

  openConfirmationModal(provider: Provider) {
    if (provider) {
      this.providerToDelete = provider;
      $('#confirmationModal').modal('show');
    }
  }

  closeConfirmationModal() {
    $('#confirmationModal').modal('hide');
  }

  deleteProvider() {
    if (this.providerToDelete) {
      const providerId = typeof this.providerToDelete.id === 'string' ? parseInt(this.providerToDelete.id, 10) : this.providerToDelete.id;
      this.providerService.deleteProvider(providerId).subscribe(
        () => {
          // Reload providers after deletion
          this.fetchProviders();
          this.closeConfirmationModal(); // Close the confirmation modal
        },
        (error) => {
          this.errorMessage = 'Error deleting provider: ' + error.message;
          this.closeConfirmationModal(); // Close the confirmation modal
        }
      );
    }
  }

  editProvider(provider: Provider) {
    // Redirect to edit page with provider ID
    this.router.navigate(['/edit-provider', provider.id]); // Update the route as per your routing configuration
  }

}
