export interface NavigationSection {
    name: string;
    icon: string;
    link: string;
    items: Array<{
        name: string,
        link: string
    }>;
}
