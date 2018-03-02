export interface List<T> {
    list: Array<T>;
    skip: number;
    limit: number;
    total: number;
}
