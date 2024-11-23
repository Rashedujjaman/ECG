import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MilestoneService } from '../../services/milestone.service';

@Component({

  selector: 'app-setting',
  templateUrl: './setting.component.html',
  //styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  milestoneForm: FormGroup;
  productForm: FormGroup;
  selectedFiles: File[]=[];

  constructor(private fb: FormBuilder, private milestoneService: MilestoneService) {
    this.milestoneForm = this.fb.group({
      title: ['', Validators.required]
    });

    this.productForm = this.fb.group({
      category: [Validators.required],
      size: ['', Validators.required],
      rimSize: ['', Validators.required],
      weight: ['', Validators.required],
      mm: [Validators.required],
      width: [Validators.required],
      loadBearing: [Validators.required],
      steering: [Validators.required]
    });
  }

  ngOnInit(): void {
    //this.loadMilestones();
  }

  // Method to handle file selection
  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }
  //onFileSelected(event: any): void {
  //  this.selectedFiles = [];
  //  const files = event.target.files;
  //  const maxSize = 1024 * 1024 * 1; //1 MB

  //  // Loop through each selected file
  //  for (let i = 0; i < files.length; i++) {
  //    const file = files[i];

  //    // Check if file size exceeds the limit
  //    if (file.size > maxSize) {
  //      // Display an error message
  //      alert(`Error: File "${file.name}" exceeds the maximum size of ${maxSize / (1024 * 1024)} MB. Please select a smaller file.`);
  //      // Optionally, prevent adding the oversized file to the selectedFiles array
  //      continue;
  //    }

  //    // If size is valid, add the file to the selectedFiles array
  //    this.selectedFiles.push(file);
  //  }
  //}

  // Method to submit the milestone form
  onSubmit(): void {
    if (this.milestoneForm.invalid || !this.selectedFiles) {
      alert('Please provide a title and at least one PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.milestoneForm.get('title')?.value);

    // Append selected files
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i], this.selectedFiles[i].name);
    }

    // Call the service to upload the milestone and files
    this.milestoneService.addMilestone(formData).subscribe(
      (response) => {
        alert(response.message);
        this.milestoneForm.reset();
        this.selectedFiles = [];
        // Clear the file input
        const fileInput = document.getElementById('files') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      (error) => {
        alert('Error while uploading milestone and files.');
        console.error(error);
      }
    );
  }
}


