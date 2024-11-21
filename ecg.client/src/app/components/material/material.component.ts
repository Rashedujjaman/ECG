import { Component, OnInit } from '@angular/core';

import { MaterialService } from '../../services/material.service';
import { Material } from '../../interfaces/material';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  //styleUrls: ['./material.component.css']
})

export class MaterialComponent implements OnInit {
  materials!: Material[];
  constructor(private materialService: MaterialService) { }
  ngOnInit() {
    this.materialService.getMaterials().subscribe(materials => {
      this.materials = materials;
    });
  }

  addMaterial(event: any) {
    event.preventDefault();
    const target = event.target;
    const material: Material = {
      name: target.querySelector('#name').value,
      shortForm: target.querySelector('#shortForm').value,
    };
    this.materialService.addMaterial(material);
  }


  //deleteMaterial(event, material) {
  //  this.materialService.deleteMaterial(material);
  //}
}
