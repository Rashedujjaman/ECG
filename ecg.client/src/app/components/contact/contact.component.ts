import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { faHome, faPhone, faMailBulk, faMobile, faFax, faGlobeAsia, } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  //styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  enquiryForm: FormGroup;

  enquiryResponse = '';

  isLoading = true;

  //Icons
  faHome = faHome;
  faPhone = faPhone;
  faMailBulk = faMailBulk;
  faMobile = faMobile;
  faFax = faFax;
  faGlobe = faGlobeAsia;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient) {
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{9,12}$/)]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onEnquiryFormSubmit() {
    if (this.enquiryForm.valid) {
      this.isLoading = true;
      const formData = this.enquiryForm.value;

      this.http.post('/api/Enquiry/AddEnquiry', formData).subscribe({
        next: () => {
          this.enquiryResponse = 'Your enquiry was submitted successfully!';
          this.isLoading = false;
          alert('Enquiry submitted successfully. You will be contacted Soon')
          this.enquiryForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          alert('An error occurred while submitting your enquiry.');
          console.error(error.message);
        }
      });
    }
  }

}
