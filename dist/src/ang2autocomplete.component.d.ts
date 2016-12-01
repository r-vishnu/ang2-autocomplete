import { ElementRef, EventEmitter } from '@angular/core';
import { Ang2AutoCompleteService } from './ang2autocomplete.service';
export declare class Ag2AutocompleteComponent {
    myElement: ElementRef;
    private getListService;
    query: string;
    elementRef: any;
    pendingRequest: any;
    onSelectionChane: EventEmitter<any>;
    listFormatter: (arg: any) => string;
    sourceName: any;
    private pathToArray;
    private keyName;
    private urlParamName;
    private labelName;
    private placeholder;
    constructor(myElement: ElementRef, getListService: Ang2AutoCompleteService);
    filter(): void;
    getDataFromArray(data: any[]): void;
    isArray(): boolean;
    isObject(): boolean;
    getDataFromObject(res: any): void;
    getDataFromUrl(): void;
    getFormattedList(data: any): any;
    defaultListFormatter(data: any): string;
    focusout(): void;
    select(item: any): void;
}
