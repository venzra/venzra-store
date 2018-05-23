import { Address } from '@venzra/models/address';

export interface Account {
    _id?: string;
    identity: string;
    addresses?: Array<Address>;
    primaryAddress?: string;
}
