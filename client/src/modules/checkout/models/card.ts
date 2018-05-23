import { Address } from '@venzra/models/address';

export interface Card {
    holder: string;
    address: Address;
    number: string;
    expiryMonth: number;
    expiryYear: number;
    verificationCheck: string;
}
