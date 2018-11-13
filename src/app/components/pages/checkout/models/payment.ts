import { Address } from '@venzra/models';

export interface Payment {
    shipping: string;
    destination: Address;
}
