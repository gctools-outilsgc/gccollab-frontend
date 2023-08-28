export class Location {
    address: string;
    city: string;
    province: string;
    country: string;

    constructor(address: string, city: string, province: string, country: string = "Canada") {
        this.address = address;
        this.city = city;
        this.province = province;
        this.country = country;
    }
}