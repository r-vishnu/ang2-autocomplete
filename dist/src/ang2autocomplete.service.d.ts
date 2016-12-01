import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
export declare class Ang2AutoCompleteService {
    private http;
    constructor(http: Http);
    filteredList: any[];
    pendingRequest: any;
    searchUser(param: string, sourceName: string, urlParamName: string): Observable<any>;
}
