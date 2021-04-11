export class Address {
  constructor() {
    this.address = '';
    this.city = '';
    this.province = '';
  }
  address: string;
  city: string;
  province: string;
  postal?: string;
  country?: string;
  lat?: number;
  lon?: number;
}
