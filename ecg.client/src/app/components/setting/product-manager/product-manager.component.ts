import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { SolidTyreComfortComponent } from '../../../components/dashboard/solid-tyre-comfort/solid-tyre-comfort.component';
import { SolidTyreSmartComponent } from '../../../components/dashboard/solid-tyre-smart/solid-tyre-smart.component';
import { SolidTyreRibComponent } from '../../../components/dashboard/solid-tyre-rib/solid-tyre-rib.component';

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

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      category: [0, Validators.required],
      size: ['', Validators.required],
      rimSize: ['', Validators.required],
      weight: [0, Validators.required],
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

  //// Handle deleting an item
  //onDeleteProduct(item: any): void {
  //  console.log('Deleting product:', item);

  //  if (confirm(`Are you sure you want to delete ${item.size}?`)) {
  //    this.productService.deleteProduct(item.id).subscribe(
  //      () => {
  //        alert('Product deleted successfully!');
  //        this.refreshTableData();
  //      },
  //      (error) => {
  //        console.error('Error deleting product:', error);
  //      }
  //    );
  //  }
  //}
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
            alert(
              this.isEditMode
                ? 'Product updated successfully!'
                : 'Product added successfully!'
            );

            // Reset form and state after successful submission
            this.resetFormAndSelection();

            // Refresh table view or update the relevant child table
            if (this.isEditMode) {
              this.solidTyreComfort.updateExistingTyre(response);
            } else {
              this.solidTyreComfort.addNewTyre(response);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            alert(error.error.message || 'An error occurred during submission.');
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
            alert(
              this.isEditMode
                ? 'Product updated successfully!'
                : 'Product added successfully!'
            );

            // Reset form and state after successful submission
            this.resetFormAndSelection();

            // Refresh table view or update the relevant child table
            if (this.isEditMode) {
              this.solidTyreSmart.updateExistingTyre(response);
            } else {
              this.solidTyreSmart.addNewTyre(response);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            alert(error.error.message || 'An error occurred during submission.');
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
            alert(
              this.isEditMode
                ? 'Product updated successfully!'
                : 'Product added successfully!'
            );

            // Reset form and state after successful submission
            this.resetFormAndSelection();

            // Refresh table view or update the relevant child table
            if (this.isEditMode) {
              this.solidTyreRib.updateExistingTyre(response);
            } else {
              this.solidTyreRib.addNewTyre(response);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            alert(error.error.message || 'An error occurred during submission.');
          },
        });
      }

    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred.');
    }

    //// Call the appropriate service method based on the selected tyre model
    //if (this.selectedTyreModel === 'STC') {
    //  this.productService.addSolidTyreComfort(data).subscribe(
    //    (response) => {
    //      alert('Solid Tyre Comfort added successfully!');
    //      this.resetFormAndSelection();

    //      // Update the child table
    //      this.solidTyreComfort.addNewTyre(data);
    //    },
    //    (error) => {
    //      console.error(error);
    //      alert('Error adding Solid Tyre Comfort.');
    //    }
    //  );
    //} else if (this.selectedTyreModel === 'STS') {
    //  this.productService.addSolidTyreSmart(data).subscribe(
    //    (response) => {
    //      alert('Solid Tyre Smart added successfully!');
    //      this.resetFormAndSelection();
    //      // Update the child table
    //      this.solidTyreSmart.addNewTyre(data);
    //    },
    //    (error) => {
    //      console.error(error);
    //      alert('Error adding Solid Tyre Smart.');
    //    }
    //  );
    //} else if (this.selectedTyreModel === 'STR') {
    //  this.productService.addSolidTyreRib(data).subscribe(
    //    (response) => {
    //      alert('Solid Tyre Rib added successfully!');
    //      this.resetFormAndSelection();
    //      // Update the child table
    //      this.solidTyreRib.addNewTyre(data);
    //    },
    //    (error) => {
    //      console.error(error);
    //      alert('Error adding Solid Tyre Rib.');
    //    }
    //  );
    //}
  }

  // Reset the form and tyre selection
  private resetFormAndSelection() {
    this.selectedTyreModel = '';
    this.productForm.reset();
    this.isEditMode = false;
  }
}
