import { VenzraImage } from '@venzra/models/venzra-image';

export interface Subscription {
    _id?: string;
    storeName: string;
    features: string[];
    strapline?: string;
    icon?: VenzraImage;
    logo?: VenzraImage;
    gateway?: string;
    status?: string;
    created?: Date;
    updated?: Date;
}
