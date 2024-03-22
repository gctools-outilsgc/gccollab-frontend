import { ILocationForm } from "src/app/shared/components/location-form/location-form.component";

export class Location implements ILocationForm {
  address: string;
  postalCode: string;
  city: string;
  province: IProvince;
  country: string;

  constructor(address: string, postalCode: string, city: string, province: IProvince, country: string = 'Canada') {
    this.address = address;
    this.postalCode = postalCode;
    this.city = city;
    this.province = province;
    this.country = country;
  }

  toString(): string {
    return `${this.address} ${this.postalCode}, ${this.city}, ${this.province}`;
  }
}

export interface IProvince {
  titleEn: string,
  titleFr: string,
  abbreviation: string
}

export const Provinces: IProvince[] = [
  {
    titleEn: 'Alberta',
    titleFr: 'Alberta',
    abbreviation: 'AB'
  },
  {
    titleEn: 'British Columbia',
    titleFr: 'Colombie-Britannique',
    abbreviation: 'BC'
  },
  {
    titleEn: 'Manitoba',
    titleFr: 'Manitoba',
    abbreviation: 'MB'
  },
  {
    titleEn: 'New Brunswick',
    titleFr: 'Nouveau-Brunswick',
    abbreviation: 'NB'
  },
  {
    titleEn: 'Newfoundland and Labrador',
    titleFr: 'Terre-Neuve-et-Labrador',
    abbreviation: 'NL'
  },
  {
    titleEn: 'Northwest Territories',
    titleFr: 'Territoires du Nord-Ouest',
    abbreviation: 'NT'
  },
  {
    titleEn: 'Nova Scotia',
    titleFr: 'Nouvelle-Écosse',
    abbreviation: 'NS'
  },
  {
    titleEn: 'Nunavut',
    titleFr: 'Nunavut',
    abbreviation: 'NU'
  },
  {
    titleEn: 'Ontario',
    titleFr: 'Ontario',
    abbreviation: 'ON'
  },
  {
    titleEn: 'Prince Edward Island',
    titleFr: 'Île-du-Prince-Édouard',
    abbreviation: 'PE'
  },
  {
    titleEn: 'Quebec',
    titleFr: 'Québec',
    abbreviation: 'QC'
  },
  {
    titleEn: 'Saskatchewan',
    titleFr: 'Saskatchewan',
    abbreviation: 'SK'
  },
  {
    titleEn: 'Yukon Territory',
    titleFr: 'Territoire du Yukon',
    abbreviation: 'YT'
  }
];

export class Province {
  static AB: IProvince = Provinces[0];
  static BC: IProvince = Provinces[1];
  static MB: IProvince = Provinces[2];
  static NB: IProvince = Provinces[3];
  static NL: IProvince = Provinces[4];
  static NT: IProvince = Provinces[5];
  static NS: IProvince = Provinces[6];
  static NU: IProvince = Provinces[7];
  static ON: IProvince = Provinces[8];
  static PE: IProvince = Provinces[9];
  static QC: IProvince = Provinces[10];
  static SK: IProvince = Provinces[11];
  static YT: IProvince = Provinces[12];
}
