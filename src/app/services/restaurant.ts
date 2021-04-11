import { Address } from './address';
export class Restaurant {
  constructor() {
    this.id = '';
    this.name = '';
    this.address = new Address();
  }
  id: string;
  name: string;
  rating?: number;
  address: Address;
  tags?: number[];
  phone?: string;
  notes?: string;
}
