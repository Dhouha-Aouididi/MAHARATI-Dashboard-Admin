import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileUploadService } from '../services/fileuploadservice/file-upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
  preview: string | undefined;
  form: FormGroup;
  percentDone: any = 0;
  message: string | null = null;
  services = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: FileUploadService
  ) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      category: [''],
      price: [0],
      availability: ['available'],
      image: [null]
    });
  }

  ngOnInit() { }

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.form.patchValue({
        image: file
      });
      this.form.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    this.fileUploadService.addService(
      this.form.value.title,
      this.form.value.description,
      this.form.value.category,
      this.form.value.price,
      this.form.value.availability,
      this.form.value.image
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          if (event.total) {
            this.percentDone = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.percentDone}%`);
          }
          break;
        case HttpEventType.Response:
          console.log('Service successfully created!', event.body);
          this.message = 'Service created successfully!';
          this.percentDone = false;
          this.router.navigate(['services-list']);
          break;
      }
    });
  }
  clearForm() {
    this.form.reset({
      title: '',
      description: '',
      category: '',
      price: 0,
      availability: 'available',
      image: null
    });
    this.preview = undefined;
    this.percentDone = 0;
  }
}
 
