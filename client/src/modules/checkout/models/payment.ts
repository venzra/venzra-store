import { Address } from './address';

export interface Payment {
    cart: string;
    destination: Address;
}
