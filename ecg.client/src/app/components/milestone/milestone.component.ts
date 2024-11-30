import { Component, OnInit } from '@angular/core';
import { MilestoneService } from '../../services/milestone.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
})

export class MilestoneComponent implements OnInit {
  milestones: any[] = [];
  pdfPreviews: { [key: number]: string } = {};

  isLoading = false;

  bannerImageUrl = 'assets/images/banner04.png';

  constructor(private milestoneService: MilestoneService, private sanitizer: DomSanitizer, private SnackBarService: SnackBarService) {}

  ngOnInit(): void {
    this.loadMilestones();
  }


  // Method to load milestones from the backend
  loadMilestones(): void {
    this.isLoading = true;
    this.milestoneService.getMilestones().subscribe(
      (data) => {
        this.milestones = data;
        this.generatePreviews();
        this.isLoading = false;
      },
      (error) => {
        this.SnackBarService.error('Failed to load milestones.', null, 2000);
        console.error(error);
        this.isLoading = false;
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

  // Method to download a file
  downloadFile(fileId: number, fileName: string): void {
    this.milestoneService.downloadFile(fileId).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        this.SnackBarService.error('Error while downloading the file.', null, 2000);
        console.error(error);
      }
    );
  }
}
