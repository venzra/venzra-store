import { CartItem } from './cart-item';
import { Shipping } from './shipping';

export interface Cart {
    _id?: string;
    items: CartItem[];
    shipping?: Shipping;
    value: number;
}
