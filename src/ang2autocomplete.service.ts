
import { Injectable } from '@angular/core';
import {URLSearchParams, Http, Headers, RequestOptions,Response }    from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Ang2AutoCompleteService {
  constructor(private http: Http) {
  }
  public filteredList:any[] = [];
  pendingRequest:any;
  searchUser(param: string,sourceName: string,urlParamName: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set(urlParamName, `${param}`);
    return this.http.get(sourceName, { search: params })
        .map((res: Response) => res.json());
    }

}
