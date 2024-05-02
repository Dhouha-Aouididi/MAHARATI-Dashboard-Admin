import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { ServiceService } from '../services/service-service/service.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css'],
})
export class ServiceEditComponent implements OnInit {
  serviceId!: number;
  service!: Service;
  form: FormGroup;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      availability: ['', Validators.required],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.params['id'];
    this.serviceService.getServiceById(this.serviceId).subscribe((service) => {
      this.service = service;
      this.form.patchValue({
        title: service.title,
        description: service.description,
        category: service.category,
        price: service.price,
        availability: service.availability,
      });
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('title', this.form.value.title);
      formData.append('description', this.form.value.description);
      formData.append('category', this.form.value.category);
      formData.append('price', this.form.value.price);
      formData.append('availability', this.form.value.availability);
      // Add image file if selected
      if (this.form.value.image) {
        formData.append('image', this.form.value.image);
      }

      this.serviceService.updateService(this.serviceId, formData).subscribe(
        () => {
          this.message = 'Service updated successfully';
          // Redirect to the services list after editing
          this.router.navigate(['/service']);
        },
        (error) => {
          console.error('Error updating service:', error);
        }
      );
    }
  }

  clearForm(): void {
    this.form.reset();
  }

  // Handle file upload
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.form.patchValue({
        image: file,
      });
      this.form.get('image')?.updateValueAndValidity();
    }
  }
}
