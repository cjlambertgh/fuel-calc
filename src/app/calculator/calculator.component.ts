import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  litresPerGallon = 4.546;

  fuelData: FuelData = {
    mpg: 17,
    fuelPrice: 1.19,
    distance: 50
  };

  journeyCost = 0;
  storageKey = "fuel_data";
  
  formGroup = new FormGroup({
    mpg: new FormControl(30, Validators.min(0)),
    distance: new FormControl(30, Validators.min(0)),
    fuelprice: new FormControl(1.19, Validators.min(0))
  });

  constructor() { }

  ngOnInit(): void {
    if(this.loadLocalStorageData()) {
      this.setFormValues();
    }
    this.formGroup.valueChanges.subscribe(() => { 
      if(!this.formGroup.invalid) {
        this.getFormValues();
      } else {
         console.log('invalid form');
        } 
    });
  }

  getFormValues(): void {
    this.fuelData.mpg = this.formGroup.get('mpg')?.value;
    this.fuelData.distance = this.formGroup.get('distance')?.value;
    this.fuelData.fuelPrice = this.formGroup.get('fuelprice')?.value;
    this.updateJourneyCost();
    localStorage.setItem(this.storageKey, JSON.stringify(this.fuelData));
  }

  setFormValues(): void {
    this.formGroup.get('mpg')?.setValue(this.fuelData.mpg);
    this.formGroup.get('fuelprice')?.setValue(this.fuelData.fuelPrice);
    this.formGroup.get('distance')?.setValue(this.fuelData.distance);
  }

  updateJourneyCost(): void {
    const gallonPrice = this.fuelData.fuelPrice * this.litresPerGallon;
    const cost =  (this.fuelData.distance / this.fuelData.mpg) * gallonPrice;
    const gallonsUsed = (this.fuelData.distance / this.fuelData.mpg);
    console.log(gallonsUsed);
    console.log(cost);
    this.journeyCost = cost;
  }

  setLocalStorageData(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.fuelData));
  }

  loadLocalStorageData(): boolean {
    const data = localStorage.getItem(this.storageKey);
    if(data) {
      this.fuelData = JSON.parse(data);
      return true;
    }
    return false;
  }

  get gallonsUsed(): number {
    return  32
  }

}

export interface FuelData {
  mpg: number;
  fuelPrice: number;
  distance: number;
}
