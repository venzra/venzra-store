import { VenzraImage } from '@venzra/models/venzra-image';

export interface Category {
    _id: string;
    slug: string;
    name: string;
    description?: string;
    featureImage: VenzraImage;
    parent?: Category;
    children?: Array<Category>;
}
