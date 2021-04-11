import { Address } from './address';
export interface Restaurant {
  id: string;
  name: string;
  rating?: number;
  address: Address;
  tags?: number[];
  phone?: string;
  notes?: string;
}
