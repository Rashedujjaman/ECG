import { Component, OnInit, ViewChild } from '@angular/core';
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
  }

  // Submit the product form
  onProductSubmit() {
    if (this.productForm.invalid) {
      alert('Please fill out the form with valid data.');
      return;
    }

    const data = this.productForm.value;

    // Call the appropriate service method based on the selected tyre model
    if (this.selectedTyreModel === 'STC') {
      this.productService.addSolidTyreComfort(data).subscribe(
        (response) => {
          alert('Solid Tyre Comfort added successfully!');
          this.resetFormAndSelection();

          // Update the child table
          this.solidTyreComfort.addNewTyre(data);
        },
        (error) => {
          console.error(error);
          alert('Error adding Solid Tyre Comfort.');
        }
      );
    } else if (this.selectedTyreModel === 'STS') {
      this.productService.addSolidTyreSmart(data).subscribe(
        (response) => {
          alert('Solid Tyre Smart added successfully!');
          this.resetFormAndSelection();
          // Update the child table
          this.solidTyreSmart.addNewTyre(data);
        },
        (error) => {
          console.error(error);
          alert('Error adding Solid Tyre Smart.');
        }
      );
    } else if (this.selectedTyreModel === 'STR') {
      this.productService.addSolidTyreRib(data).subscribe(
        (response) => {
          alert('Solid Tyre Rib added successfully!');
          this.resetFormAndSelection();
          // Update the child table
          this.solidTyreRib.addNewTyre(data);
        },
        (error) => {
          console.error(error);
          alert('Error adding Solid Tyre Rib.');
        }
      );
    }
  }

  // Reset the form and tyre selection
  private resetFormAndSelection() {
    this.selectedTyreModel = '';
    this.productForm.reset();
  }
}
