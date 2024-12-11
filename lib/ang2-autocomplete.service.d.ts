import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class Ang2AutocompleteService {
    private http;
    filteredList: any;
    constructor(http: HttpClient);
    searchUser(param: string, sourceName: string, urlParamName: string): import("rxjs").Observable<Object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<Ang2AutocompleteService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Ang2AutocompleteService>;
}
