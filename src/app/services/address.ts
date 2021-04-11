export class Address {
  constructor() {
    this.street = '';
    this.city = '';
    this.province = '';
  }
  street: string;
  city: string;
  province: string;
  postal?: string;
  country?: string;
  lat?: number;
  lon?: number;
}
