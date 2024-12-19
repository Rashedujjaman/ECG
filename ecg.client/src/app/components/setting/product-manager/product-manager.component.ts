import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { SolidTyreComfortComponent } from '../../solid-tyre-comfort/solid-tyre-comfort.component';
import { SolidTyreSmartComponent } from '../../solid-tyre-smart/solid-tyre-smart.component';
import { SolidTyreRibComponent } from '../../solid-tyre-rib/solid-tyre-rib.component';
import { SnackBarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
})
export class ProductManagerComponent implements OnInit {
  @ViewChild('solidTyreComfort') solidTyreComfort!: SolidTyreComfortComponent;
  @ViewChild('solidTyreSmart') solidTyreSmart!: SolidTyreSmartComponent;
  @ViewChild('solidTyreRib') solidTyreRib!: SolidTyreRibComponent;


  productForm: FormGroup;
  selectedTyreModel: string = '';
  selectedTableView: string = '';

  isEditMode: boolean = false;
  currentEditItem: any;

  constructor(private fb: FormBuilder, private productService: ProductService, private SnackBarService: SnackBarService) {
    this.productForm = this.fb.group({
      category: [0, Validators.required],
      size: ['', Validators.required],
      rimSize: ['', Validators.required],
      weight: ['', Validators.required],
      mm: [0, Validators.required],
      width: [0, Validators.required],
      loadBearing: [0, Validators.required],
      steering: [0, Validators.required],
    });
  }

  ngOnInit(): void { }

  // Reset form when tyre model changes
  onTyreModelChange() {
    this.productForm.reset();
    this.isEditMode = false;
  }

    // Handle editing an item
  onEdit(item: any): void {
    this.selectedTyreModel = this.selectedTableView;
    this.isEditMode = true;
    this.currentEditItem = item;

    // Populate the form with the item's data
    this.productForm.patchValue({
      category: item.category,
      size: item.size,
      rimSize: item.rimsize,
      weight: item.weight,
      mm: item.mm,
      width: item.width,
      loadBearing: item.loadBearing,
      steering: item.steering,
    });
  }

  // Submit the product form
  onProductSubmit() {
    if (this.productForm.invalid) {
      alert('Please fill out the form with valid data.');
      return;
    }

    const formData = this.productForm.value;

    try {
      if (this.selectedTyreModel === 'STC') {
        const request = this.isEditMode
          ? this.productService.updateSolidTyreComfort({
            ...formData,
            id: this.currentEditItem.id,
          })
          : this.productService.addSolidTyreComfort(formData);

        request.subscribe({
          next: (response: any) => {
            this.SnackBarService.success(this.isEditMode
              ? 'Product updated successfully!'
              : 'Product added successfully!', null, 2000);

            // Refresh table view or update the relevant child table
            if (this.isEditMode) {
              this.solidTyreComfort.updateExistingTyre(response);
            } else {
              this.solidTyreComfort.addNewTyre(response);
            }

            // Reset form and state after successful submission
            this.resetFormAndSelection();
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            this.SnackBarService.error(error.error.message || 'An error occurred during submission.', null, 3000);
          },
        });
      } else if (this.selectedTyreModel === 'STS') {
        const request = this.isEditMode
          ? this.productService.updateSolidTyreSmart({
            ...formData,
            id: this.currentEditItem.id,
          })
          : this.productService.addSolidTyreSmart(formData);

        request.subscribe({
          next: (response: any) => {
            this.SnackBarService.success(this.isEditMode
              ? 'Product updated successfully!'
              : 'Product added successfully!', null, 2000);

            // Refresh table view or update the relevant child table
            if (this.isEditMode) {
              this.solidTyreSmart.updateExistingTyre(response);
            } else {
              this.solidTyreSmart.addNewTyre(response);
            }

            // Reset form and state after successful submission
            this.resetFormAndSelection();
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            this.SnackBarService.error(error.error.message || 'An error occurred during submission.', null, 3000);
          },
        });
      } else if (this.selectedTyreModel === 'STR') {
        const request = this.isEditMode
          ? this.productService.updateSolidTyreRib({
            ...formData,
            id: this.currentEditItem.id,
          })
          : this.productService.addSolidTyreRib(formData);

        request.subscribe({
          next: (response: any) => {
            this.SnackBarService.success(this.isEditMode
              ? 'Product updated successfully!'
              : 'Product added successfully!', null, 2000);

            // Refresh table view or update the relevant child table
            if (this.isEditMode) {
              this.solidTyreRib.updateExistingTyre(response);
            } else {
              this.solidTyreRib.addNewTyre(response);
            }

            // Reset form and state after successful submission
            this.resetFormAndSelection();
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            this.SnackBarService.error(error.error.message || 'An error occurred during submission.', null, 3000);
          },
        });
      }

    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred.');
    }
  }

  // Reset the form and tyre selection
  private resetFormAndSelection() {
    this.selectedTyreModel = '';
    this.productForm.reset();
    this.isEditMode = false;
  }
}
