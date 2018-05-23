import { Address } from '@venzra/models/address';

export interface Payment {
    cart: string;
    destination: Address;
}
