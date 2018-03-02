import { Address } from './address';
import { Card } from './card';

export interface Payment {
    cart: string;
    card: Card;
    billing: Address;
    destination: Address;
}
