import { Component, OnInit, Input } from '@angular/core';
import { CompoundService } from '../../services/compound.service';
import { Compound } from '../../interfaces/compound';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
})

export class CompoundComponent implements OnInit {
  @Input() product: string = '';

  compounds: Compound[] = [];
  compound1!: Compound;
  compound2!: Compound;
  compound3!: Compound;
  compound4!: Compound;
  compound5!: Compound;
  compound6!: Compound;
  compound7!: Compound;
  compound8!: Compound;


  constructor(private compoundService: CompoundService, private SnackBarService: SnackBarService) { }
  ngOnInit() {
    this.getCompounds();
  }

  getCompounds() {
    this.compoundService.getCompounds(this.product).subscribe(
      (compounds) => {
      this.compounds = compounds;
      this.compound1 = this.compounds[0];
      this.compound2 = this.compounds[1];
      this.compound3 = this.compounds[2];
      this.compound4 = this.compounds[3];
      this.compound5 = this.compounds[4];
      this.compound6 = this.compounds[5];
      this.compound7 = this.compounds[6];
      this.compound8 = this.compounds[7];
    },
      (error) => {
        this.SnackBarService.error('An error occured while loading legends.', null, 3000);
        console.error(error);
    });
  }

  protected hasValue(value: string): boolean {
    return value === '\"\"' || value === '\'\'' || value === 'skip' ? false : true;
  }
}
