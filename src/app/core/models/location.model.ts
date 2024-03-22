import { ILocationForm } from "src/app/shared/components/location-form/location-form.component";

export class Location implements ILocationForm {
  address: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;

  constructor(address: string, postalCode: string, city: string, province: string, country: string = 'Canada') {
    this.address = address;
    this.postalCode = postalCode;
    this.city = city;
    this.province = province;
    this.country = country;
  }

  toString(): string {
    return `${this.address} ${this.postalCode}, ${this.city}, ${this.province}`;
  }

  toLocationForm(): ILocationForm {
    return {
      address: this.address,
      postalCode: this.postalCode,
      city: this.city,
      province: this.province,
      country: this.country
    }
  }
}
