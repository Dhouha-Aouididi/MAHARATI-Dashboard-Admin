import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileUploadProviderService } from '../services/fileuploadprovider/file-upload-provider.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit {
  preview: string | undefined;
  form: FormGroup;
  percentDone: any = 0;
  message: string | null = null;
  providers = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: FileUploadProviderService
  ) {
    this.form = this.fb.group({
      username: [''],
      email: [''],
      phone: [''],
      services_offered: [''],
      // ratings: [0],
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
    this.fileUploadService.addProvider(
      this.form.value.username,
      this.form.value.email,
      this.form.value.phone,
      this.form.value.services_offered,
      // this.form.value.ratings,
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
          console.log('Provider successfully created!', event.body);
          this.message = 'Provider created successfully!';
          this.percentDone = false;
          this.router.navigate(['providers-list']);
          break;
      }
    });
  }

  clearForm() {
    this.form.reset({
      username: '',
      email: '',
      phone: '',
      services_offered: '',
      // ratings: 0,
      availability: 'available',
      image: null
    });
    this.preview = undefined;
    this.percentDone = 0;
  }
}
