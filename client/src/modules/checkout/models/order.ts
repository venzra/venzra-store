import { Product } from './product';

export interface Order {
    reference: string;
    items?: {
        product: Product;
        quantity: number;
        price: number;
    }[];
    shipping?: {
        reference: string;
        name: string;
        price: number;
    };
    destination?: {
        addressee: string;
        building: string;
        street: string;
        city: string;
        county: string;
        postalCode: string;
    };
    payment?: {
        name: string;
        card: string;
        brand: string;
        value: number;
    };
    status?: string;
    created?: Date;
}
