import { Component, OnInit } from '@angular/core';
import { CompoundService } from '../../services/compound.service';
import { Compound } from '../../interfaces/compound';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
})

export class CompoundComponent implements OnInit {
  compounds!: Compound[];
  compound1!: Compound;
  compound2!: Compound;
  compound3!: Compound;
  compound4!: Compound;
  compound5!: Compound;

  constructor(private compoundService: CompoundService) { }
  ngOnInit() {
    this.compoundService.getCompounds().subscribe(compounds => {
      this.compounds = compounds;
      this.compound1 = this.compounds[0];
      this.compound2 = this.compounds[1];
      this.compound3 = this.compounds[2];
      this.compound4 = this.compounds[3];
      this.compound5 = this.compounds[4];
    });
  }

  addCompound(event: any) {
    event.preventDefault();
    const target = event.target;
    const compound: Compound = {
      name: target.querySelector('#name').value,
      alias: target.querySelector('#alias').value,
    };
    this.compoundService.addCompound(compound);
  }


  //deleteCompound(event, compound) {
  //  this.compoundService.deleteCompound(compound);
  //}
}
