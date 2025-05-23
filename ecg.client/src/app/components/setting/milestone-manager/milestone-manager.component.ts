import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MilestoneService } from '../../../services/milestone.service';
import { DomSanitizer } from '@angular/platform-browser';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MilestoneFile } from '../../../interfaces/milestone-file';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { Milestone } from '../../../interfaces/milestone';
import { SnackBarService } from '../../../services/snackbar.service';

@Component({

  selector: 'app-milestone-manager',
  templateUrl: './milestone-manager.component.html',
})
export class MilestoneManagerComponent implements OnInit {
  milestoneForm: FormGroup;
  selectedFiles: File[] = [];

  milestones: Milestone[] = [];
  pdfPreviews: { [key: number]: string } = {};

  // Icon
  faTrash = faTrash;

  constructor(private fb: FormBuilder, private milestoneService: MilestoneService, private sanitizer: DomSanitizer, private SnackBarService: SnackBarService) {
    this.milestoneForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMilestones();
  }

  // Method to handle file selection
  onFileSelected(event: any): void {
    this.selectedFiles = [];
    const files = event.target.files;
    const maxSize = 1024 * 1024 * 1; //1 MB

    // Loop through each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if file size exceeds the limit
      if (file.size > maxSize) {
        // Display an error message
        alert(`Error: File "${file.name}" exceeds the maximum size of ${maxSize / (1024 * 1024)} MB. Please select a smaller file.`);
        continue;
      }

      // If size is valid, add the file to the selectedFiles array
      this.selectedFiles.push(file);
    }
  }


  // Method to submit the milestone form
  onMilestoneSubmit(): void {
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
        this.SnackBarService.success(response.message, null, 2000);
        this.milestoneForm.reset();
        this.selectedFiles = [];
        this.loadMilestones();
        // Clear the file input
        const fileInput = document.getElementById('files') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      (error) => {
        this.SnackBarService.error('Error while uploading milestone and files.', null, 3000);
        console.error(error);
      }
    );
  }


  // Method to load milestones from the backend
  loadMilestones(): void {
    this.milestoneService.getMilestones().subscribe(
      (data) => {
        this.milestones = data;
        this.generatePreviews();
      },
      (error) => {
        this.SnackBarService.error('Failed to load milestones.', null, 3000);
        console.error(error);
      }
    );
  }

  async generatePreviews(): Promise<void> {
    for (const milestone of this.milestones) {
      for (const file of milestone.files) {
        const blob = await this.milestoneService.downloadFile(file.id).toPromise();
        if (blob) {
          this.createPdfPreview(blob, file.id);
        }

      }
    }
  }

  async createPdfPreview(blob: Blob, fileId: number): Promise<void> {

    //pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.mjs';


    const pdfData = await blob.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext('2d');
    const renderContext = {
      canvasContext: context!,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    const previewUrl = canvas.toDataURL();
    this.pdfPreviews[fileId] = previewUrl;
  }

  onDeleteMilestone(milestone: Milestone) {
    if (confirm(`Are you sure you want to delete ${milestone.title}?`)) {
      this.milestoneService.deleteMilestone(milestone.id).subscribe({
        next: () => {
          this.SnackBarService.success('Milestone deleted successfylly!', null, 2000);
          this.milestones = this.milestones.filter((m: Milestone) => m.id !== milestone.id);
        },
        error: (error) => {
          console.error('Error deleting milestone', error);
          this.SnackBarService.error(error.error?.error || 'An error occurred while deleting the milestone.', null, 3000);
        }
      })
    }
  }

  onDeleteFile(file: MilestoneFile, milestone: Milestone): void {
    if (confirm(`Are you sure you want to delete ${file.fileName}?`)) {

      this.milestoneService.deleteFileById(file.id).subscribe({
        next: () => {
          this.SnackBarService.success('Milestone certificate deleted successfully!', null, 2000);

          // Remove the deleted file from the milestone's file list
          milestone.files = milestone.files.filter((f: MilestoneFile) => f.id !== file.id);
        },
        error: (error) => {
          console.error('Error deleting milestone file', error);
          this.SnackBarService.error(error.error?.error || 'An error occurred while deleting the file.', null, 3000);
        }
      });
    }
  }

}


