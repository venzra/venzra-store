export interface Category {
    _id: string;
    slug: string;
    name: string;
    description?: string;
    featureImage: string;
    parent?: Category;
    children?: Array<Category>;
}
