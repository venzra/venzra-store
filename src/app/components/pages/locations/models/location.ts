export interface Location {
    _id: string;
    displayName: string;
    address: {
        addressee: string;
        building: string;
        street: string;
        city: string;
        county: string;
        postalCode: string;
    };
    description: string;
    featureImage: string;
    usage: 'BUSINESS' | 'STORE';
}
