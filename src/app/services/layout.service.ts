import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class LayoutService {

    private _name: string;
    private _title: string;

    constructor(
        private pageTitle: Title
    ) {}

    set name(name: string) {
        this._name = name;
    }

    set title(title: string) {
        this._title = title;
        this.pageTitle.setTitle(`${this._name} | ${title}`);
    }

    get title() {
        return this._title;
    }
}
