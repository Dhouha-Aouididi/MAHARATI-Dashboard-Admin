
import { Component, OnInit } from '@angular/core';
import { Service } from '../models/service';
import { ServiceService } from '../services/service-service/service.service';
import { Router } from '@angular/router';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  filteredServices: Service[] = []; // Array to hold filtered services
  errorMessage: string = '';
  serviceToDelete: Service | null = null; // Variable to store the service to be deleted

  constructor(private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices() {
    this.serviceService.getAllServices().subscribe(
      (response: any) => {
        console.log('Services retrieved:', response.services);
        this.services = Object.values(response.services); // Convert object to array
        this.filteredServices = [...this.services]; // Initialize filteredServices with all services
      },
      (error) => {
        console.log('Error fetching services:', error);
      }
    );
  }

  applyFilter(event: any) {
    const value = event.target.value;
    this.filteredServices = this.services.filter(service =>
      service.title.toLowerCase().includes(value.toLowerCase()) ||
      service.category.toLowerCase().includes(value.toLowerCase())
    );
  }
  

  openConfirmationModal(service: Service) {
    if (service) {
      this.serviceToDelete = service;
      $('#confirmationModal').modal('show');
    }
  }

  closeConfirmationModal() {
    $('#confirmationModal').modal('hide');
  }

  deleteService() {
    if (this.serviceToDelete) {
      const serviceId = typeof this.serviceToDelete.id === 'string' ? parseInt(this.serviceToDelete.id, 10) : this.serviceToDelete.id;
      this.serviceService.deleteService(serviceId).subscribe(
        () => {
          // Reload services after deletion
          this.fetchServices();
          this.closeConfirmationModal(); // Close the confirmation modal
        },
        (error) => {
          this.errorMessage = 'Error deleting service: ' + error.message;
          this.closeConfirmationModal(); // Close the confirmation modal
        }
      );
    }
  }

  editService(service: Service) {
    // Redirect to edit page with service ID
    this.router.navigate(['/edit-service', service.id]); // Update the route as per your routing configuration
  }

}
