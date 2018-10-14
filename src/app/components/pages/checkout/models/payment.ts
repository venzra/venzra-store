import { Address } from '@venzra/models';

export interface Payment {
    cart: string;
    destination: Address;
}
