import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompoundService } from '../../../services/compound.service';
import { Compound } from '../../../interfaces/compound';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SnackBarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-compound-manager',
  templateUrl: './compound-manager.component.html',
})

export class CompoundManagerComponent implements OnInit {

  compoundForm: FormGroup;
  compounds: Compound[] = [];
  selectedCompound: Compound | null = null;
  selectedProduct: string = '';
  selectedProductView: string = '';

  faEdit = faEdit;
  faTrash = faTrash;

  product = '';

  isEditMode = true;
  constructor(private fb: FormBuilder, private compoundService: CompoundService, private SnackBarService: SnackBarService) {
    this.compoundForm = this.fb.group({
      name: ['', Validators.required],
      alias: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //this.getCompounds();
  }

  //getCompounds() {
  //  this.compoundService.getCompounds(this.product).subscribe(
  //    (response) => {
  //      this.compounds = response;
  //    },
  //    (error) => {
  //      console.log(error);
  //      this.SnackBarService.error('Failed to fetch compounds.', null, 3000);
  //    }
  //  );
  //}

  onCompoundChange() {
    this.isEditMode = true;
    if (this.selectedCompound) {
      this.compoundForm.patchValue({
        name: this.selectedCompound.name,
        alias: this.selectedCompound.alias,
      });
    }
  }

  onCompoundSubmit() {
    if (this.compoundForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    if (this.isEditMode) {
      this.updateCompound();
    }
    this.addCompound();
  }

  addCompound() {
    this.selectedProduct = this.selectedProductView;
    if (this.selectedProduct) {
      const newCompound = {
        'product': this.selectedProduct,
        'name': this.compoundForm.get('name')?.value.trim(),
        'alias': this.compoundForm.get('alias')?.value.trim()
      };
      this.compoundService.addCompound(newCompound).subscribe(
        (response) => {
          this.SnackBarService.success('Compound added successfully.', null, 2000);
          this.compoundForm.reset();
          this.onTableViewCompound();
        },
        (error) => {
          console.log(error);
          this.SnackBarService.error('Failed to add compound.', null, 3000);
        }
      );
    }
  }

  updateCompound() {
    if (!this.selectedCompound) {
      return;
    }
    const updatedCompound = {
      'id': this.selectedCompound.id,
      'product': this.selectedProduct,
      'name': this.compoundForm.get('name')?.value.trim(),
      'alias': this.compoundForm.get('alias')?.value.trim()
    };

    this.compoundService.updateCompound(updatedCompound).subscribe(
      (response) => {
        this.SnackBarService.success('Compound updated successfully.', null, 2000);
        this.compoundForm.reset();
        this.selectedCompound = null;
        this.onTableViewCompound();
      },
      (error) => {
        console.log(error);
        this.SnackBarService.error('Failed to update compound.', null, 3000);
      }
    );
  }

  onEditCompound(compound: Compound) {
    this.selectedCompound = compound;
    this.selectedProduct = this.selectedProductView;
    this.onCompoundChange();

  }

  onTableViewCompound() {
    //this.selectedProduct = '';
    this.compoundForm.reset();
    this.isEditMode = false;
    if (this.selectedProductView) {
      this.compoundService.getCompounds(this.selectedProductView).subscribe(
        (response) => {
          this.compounds = response;
        },
        (error) => {
          console.log(error);
          this.SnackBarService.error('Failed to fetch compounds.', null, 3000);
        }
      );
    }
  }

  onProductSelect() {
    this.compoundForm.reset();
    this.isEditMode = false;
  }

  deleteCompound(compound: Compound) {
    if (confirm(`Are you sure you want to delete compound ${compound.name}?`)) {
      if (compound.id == null) {
        return;
      }

      this.compoundService.deleteCompound(compound.id).subscribe(
        () => {
          this.SnackBarService.success('Compound deleted successfully.', null, 2000);
          this.onTableViewCompound();
        },
        (error) => {
          console.log(error);
          this.SnackBarService.error('Failed to delete compound.', null, 3000);
        }
      );
    }
  }
}
