import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompoundService } from '../../../services/compound.service';
import { Compound } from '../../../interfaces/compound';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-compound-manager',
  templateUrl: './compound-manager.component.html',
})

export class CompoundManagerComponent implements OnInit {

  compoundForm: FormGroup;
  compounds: Compound[] = [];
  selectedCompound: Compound | null = null;

  faEdit = faEdit;
  faTrash = faTrash;
  constructor(private fb: FormBuilder, private compoundService: CompoundService) {
    this.compoundForm = this.fb.group({
      name: ['', Validators.required],
      alias: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCompounds();
  }

  getCompounds() {
    this.compoundService.getCompounds().subscribe(
      (response) => {
        this.compounds = response;
      },
      (error) => {
        console.log(error);
        alert('Failed to fetch compounds.');
      }
    );
  }

  onCompoundChange() {
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

    if (this.selectedCompound) {
      const updatedCompound = {
        'id': this.selectedCompound.id,
        'name': this.compoundForm.get('name')?.value.trim(),
        'alias': this.compoundForm.get('alias')?.value.trim()
      };

      this.compoundService.updateCompound(updatedCompound).subscribe(
        (response) => {
          alert('Compound updated successfully.');
          this.getCompounds();
          this.compoundForm.reset();
          this.selectedCompound = null;
        },
        (error) => {
          console.log(error);
          alert('Failed to update compound.');
        }
      );
    }
  }

  onEditCompound(compound: Compound) {
    this.selectedCompound = compound;
    this.onCompoundChange();
  }


  //deleteCompound(compound: Compound) {
  //  if (confirm(`Are you sure you want to delete compound ${compound.name}?`)) {
  //    this.compoundService.deleteCompound(compound?.id).subscribe(
  //      () => {
  //        alert('Compound deleted successfully.');
  //        this.getCompounds();
  //      },
  //      (error) => {
  //        console.log(error);
  //        alert('Failed to delete compound.');
  //      }
  //    );
  //  }
  //}
}
