import { Address } from '@venzra/models';

export interface Card {
    holder: string;
    address: Address;
    number: string;
    expiryMonth: number;
    expiryYear: number;
    verificationCheck: string;
}
