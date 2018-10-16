import { VenzraImage } from '@venzra/models/venzra-image';

export interface Product {
    _id: string;
    slug: string;
    code: string;
    displayName: string;
    description: string;
    featureImage: VenzraImage;
    promotionalImage: VenzraImage;
    previousPrice: number;
    currentPrice: number;
}
