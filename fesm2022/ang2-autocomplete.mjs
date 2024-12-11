import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import * as i2 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';

class Ang2AutocompleteService {
    http;
    filteredList = [];
    constructor(http) {
        this.http = http;
    }
    searchUser(param, sourceName, urlParamName) {
        var params = new HttpParams();
        params.set(urlParamName, "" + param);
        // return this.http.get(sourceName, { "search": params })
        //     .map(function (res) { return res.json(); });
        return this.http.get(sourceName, { params: params });
    }
    ;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.1", ngImport: i0, type: Ang2AutocompleteService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.1", ngImport: i0, type: Ang2AutocompleteService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.1", ngImport: i0, type: Ang2AutocompleteService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class Ang2AutocompleteComponent {
    getListService;
    elementRef;
    pendingRequest = null;
    statesss = 'out';
    query = '';
    activeElement = 0;
    keyName = '';
    source;
    placeholder = '';
    listFormatter;
    pathToArray = '';
    urlParamName = '';
    labelName = '';
    minCharLength = 0;
    onSelectionChange = new EventEmitter();
    constructor(getListService, elementRef) {
        this.getListService = getListService;
        this.elementRef = elementRef;
    }
    handleClick(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.focusout();
        }
    }
    ;
    getDataFromArray(data) {
        this.getListService.filteredList = data.filter((el) => {
            let content = (el[this.keyName]) ? el[this.keyName] : el;
            return content.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        });
        this.statesss = 'in';
    }
    getDataFromObject(res) {
        let pathArray = this.pathToArray.split(".");
        let raw = res;
        for (let i = 0; i < pathArray.length; i++) {
            let a = pathArray[i];
            raw = raw[a];
        }
        this.getDataFromArray(raw);
    }
    ;
    getDataFromUrl() {
        if (this.pendingRequest) {
            this.pendingRequest.unsubscribe();
        }
        this.pendingRequest = this.getListService.searchUser(this.query.toLowerCase(), this.source, this.urlParamName)
            .subscribe((res) => this.getDataFromObject(res));
    }
    ;
    isArray() {
        return (this.source.constructor.name === "Array");
    }
    ;
    isObject() {
        return (this.source.constructor.name === "Object");
    }
    ;
    filter(e) {
        if (e.keyCode == 40) {
            ++this.activeElement;
        }
        else if (e.keyCode == 38) {
            --this.activeElement;
        }
        else if (e.keyCode == 13 && this.getListService.filteredList[this.activeElement]) {
            this.select(this.getListService.filteredList[this.activeElement]);
            return;
        }
        if (this.activeElement < 0 || this.activeElement > this.getListService.filteredList.length - 1) {
            this.activeElement = 0;
        }
        if (e.keyCode == 40 || e.keyCode == 38) {
            return;
        }
        if (this.query !== "" && this.query.length >= this.minCharLength) {
            if (this.isArray()) {
                this.getDataFromArray(this.source);
            }
            else if (this.isObject()) {
                this.getDataFromObject(this.source);
            }
            else {
                this.getDataFromUrl();
            }
        }
        else {
            this.statesss = 'out';
            setTimeout(() => this.getListService.filteredList = [], 899);
        }
    }
    getFormattedList(data) {
        let formatter = this.listFormatter || this.defaultListFormatter;
        // const fn = new Function(`return ${formatter}(${[data]})`);
        // fn([data]);
        return formatter.apply(this, [data]);
    }
    ;
    defaultListFormatter(data) {
        var html = "";
        var content = (data[this.keyName]) ? data[this.keyName] : data;
        html += "<span>" + content + "</span>";
        return html;
    }
    ;
    focusout() {
        if (this.pendingRequest) {
            this.pendingRequest.unsubscribe();
        }
        this.statesss = 'out';
        setTimeout(() => this.getListService.filteredList = [], 899);
    }
    ;
    select(item) {
        let data = (item[this.keyName]) ? item[this.keyName] : item;
        this.query = data;
        this.getListService.filteredList = [];
        this.onSelectionChange.emit(item);
    }
    focusOnOptions(e) {
        ++this.activeElement;
        console.log(this.activeElement, " %%%%%%%%%%%%% ");
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.1", ngImport: i0, type: Ang2AutocompleteComponent, deps: [{ token: Ang2AutocompleteService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.1", type: Ang2AutocompleteComponent, isStandalone: true, selector: "ang2-autocomplete", inputs: { keyName: "keyName", source: "source", placeholder: "placeholder", listFormatter: "listFormatter", pathToArray: "pathToArray", urlParamName: "urlParamName", labelName: "labelName", minCharLength: "minCharLength" }, outputs: { onSelectionChange: "onSelectionChange" }, host: { listeners: { "document:click": "handleClick($event)" } }, ngImport: i0, template: "<div class=\"ang2-autocomplete-container\">\r\n    @if (labelName) {\r\n    <label class=\"ang2-autocomplete-search-label\" id=\"ang2-search-label\" for=\"country\">{{labelName}}</label>\r\n    }\r\n    <input autocomplete=\"off\"\r\n     placeholder={{placeholder}} id=\"ang2searchField\"\r\n        type=\"text\" class=\"validate filter-input ang2-autocomplete-search-input\" [(ngModel)]=query (keyup)=filter($event)>\r\n    @if (getListService.filteredList.length > 0) {\r\n    <ul class=\"ang2-autocomplete-suggestions-list-container\">\r\n        @for (item of getListService.filteredList; let idx = $index; track idx) {\r\n        <li class=\"ang2-autocomplete-suggestions-list\"\r\n        [ngClass]=\"{ 'suggestions_active': idx == activeElement}\"\r\n         (click)=\"select(item)\"\r\n            [innerHTML]=\"getFormattedList(item)\">\r\n        </li>\r\n        }\r\n    </ul>\r\n    }\r\n</div>", styles: [".ang2-autocomplete-container{position:relative;width:100%}.ang2-autocomplete-search-input{width:99.5%}.ang2-autocomplete-suggestions-list-container{width:100%;border:1px solid #d4d4d4;border-bottom:none;border-top:none;list-style-type:none;padding:0;margin:0;position:absolute}.ang2-autocomplete-suggestions-list{padding:5px;cursor:pointer;background-color:#fff;border-bottom:1px solid #d4d4d4}.ang2-autocomplete-suggestions-list:hover{background-color:#e9e9e9;color:#000}.suggestions_active{background-color:#1e90ff;color:#fff}\n"], dependencies: [{ kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.1", ngImport: i0, type: Ang2AutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ang2-autocomplete', imports: [FormsModule, CommonModule], host: { '(document:click)': 'handleClick($event)' }, template: "<div class=\"ang2-autocomplete-container\">\r\n    @if (labelName) {\r\n    <label class=\"ang2-autocomplete-search-label\" id=\"ang2-search-label\" for=\"country\">{{labelName}}</label>\r\n    }\r\n    <input autocomplete=\"off\"\r\n     placeholder={{placeholder}} id=\"ang2searchField\"\r\n        type=\"text\" class=\"validate filter-input ang2-autocomplete-search-input\" [(ngModel)]=query (keyup)=filter($event)>\r\n    @if (getListService.filteredList.length > 0) {\r\n    <ul class=\"ang2-autocomplete-suggestions-list-container\">\r\n        @for (item of getListService.filteredList; let idx = $index; track idx) {\r\n        <li class=\"ang2-autocomplete-suggestions-list\"\r\n        [ngClass]=\"{ 'suggestions_active': idx == activeElement}\"\r\n         (click)=\"select(item)\"\r\n            [innerHTML]=\"getFormattedList(item)\">\r\n        </li>\r\n        }\r\n    </ul>\r\n    }\r\n</div>", styles: [".ang2-autocomplete-container{position:relative;width:100%}.ang2-autocomplete-search-input{width:99.5%}.ang2-autocomplete-suggestions-list-container{width:100%;border:1px solid #d4d4d4;border-bottom:none;border-top:none;list-style-type:none;padding:0;margin:0;position:absolute}.ang2-autocomplete-suggestions-list{padding:5px;cursor:pointer;background-color:#fff;border-bottom:1px solid #d4d4d4}.ang2-autocomplete-suggestions-list:hover{background-color:#e9e9e9;color:#000}.suggestions_active{background-color:#1e90ff;color:#fff}\n"] }]
        }], ctorParameters: () => [{ type: Ang2AutocompleteService }, { type: i0.ElementRef }], propDecorators: { keyName: [{
                type: Input
            }], source: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], listFormatter: [{
                type: Input
            }], pathToArray: [{
                type: Input
            }], urlParamName: [{
                type: Input
            }], labelName: [{
                type: Input
            }], minCharLength: [{
                type: Input
            }], onSelectionChange: [{
                type: Output
            }] } });

/*
 * Public API Surface of ang2-autocomplete
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Ang2AutocompleteComponent, Ang2AutocompleteService };
//# sourceMappingURL=ang2-autocomplete.mjs.map
