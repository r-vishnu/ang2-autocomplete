"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ang2autocomplete_service_1 = require('./ang2autocomplete.service');
var Ag2AutocompleteComponent = (function () {
    function Ag2AutocompleteComponent(myElement, getListService) {
        this.myElement = myElement;
        this.getListService = getListService;
        this.query = '';
        this.onSelectionChane = new core_1.EventEmitter();
        this.elementRef = myElement;
        this.pathToArray = myElement.nativeElement.getAttribute('path-to-array');
        this.keyName = myElement.nativeElement.getAttribute('key-name');
        this.urlParamName = myElement.nativeElement.getAttribute('url-param-name');
        this.labelName = myElement.nativeElement.getAttribute('label-name');
        this.placeholder = myElement.nativeElement.getAttribute('placeholder');
    }
    Ag2AutocompleteComponent.prototype.filter = function () {
        if (this.query !== "") {
            if (this.isArray()) {
                this.getDataFromArray(this.sourceName);
            }
            else if (this.isObject()) {
                this.getDataFromObject(this.sourceName);
            }
            else {
                this.getDataFromUrl();
            }
        }
        else {
            this.getListService.filteredList = [];
        }
    };
    Ag2AutocompleteComponent.prototype.getDataFromArray = function (data) {
        var vm = this;
        this.getListService.filteredList = data.filter(function (el) {
            var content = (el[this.keyName]) ? el[this.keyName] : el;
            return content.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    };
    Ag2AutocompleteComponent.prototype.isArray = function () {
        return (this.sourceName.constructor.name === "Array");
    };
    Ag2AutocompleteComponent.prototype.isObject = function () {
        return (this.sourceName.constructor.name === "Object");
    };
    Ag2AutocompleteComponent.prototype.getDataFromObject = function (res) {
        var pathArray = this.pathToArray.split(".");
        var raw = res;
        for (var i = 0; i < pathArray.length; i++) {
            var a = pathArray[i];
            raw = raw[a];
        }
        this.getDataFromArray(raw);
    };
    Ag2AutocompleteComponent.prototype.getDataFromUrl = function () {
        var vm = this;
        if (this.pendingRequest) {
            this.pendingRequest.unsubscribe();
        }
        this.pendingRequest = this.getListService.searchUser(this.query.toLowerCase(), this.sourceName, this.urlParamName)
            .subscribe(function (res) {
            vm.getDataFromObject(res);
        });
    };
    Ag2AutocompleteComponent.prototype.getFormattedList = function (data) {
        var formatter = this.listFormatter || this.defaultListFormatter;
        return formatter.apply(this, [data]);
    };
    Ag2AutocompleteComponent.prototype.defaultListFormatter = function (data) {
        var html = "";
        var content = (data[this.keyName]) ? data[this.keyName] : data;
        html += "<span>" + content + "</span>";
        return html;
    };
    Ag2AutocompleteComponent.prototype.focusout = function () {
        var vm = this;
        if (this.pendingRequest) {
            this.pendingRequest.unsubscribe();
        }
        setTimeout(function () {
            vm.getListService.filteredList = [];
        }, 600);
    };
    Ag2AutocompleteComponent.prototype.select = function (item) {
        this.query = item[this.keyName];
        this.getListService.filteredList = [];
        this.onSelectionChane.emit(item);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Ag2AutocompleteComponent.prototype, "onSelectionChane", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], Ag2AutocompleteComponent.prototype, "listFormatter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Ag2AutocompleteComponent.prototype, "sourceName", void 0);
    Ag2AutocompleteComponent = __decorate([
        core_1.Component({
            selector: 'ang2-autocomplete',
            providers: [ang2autocomplete_service_1.Ang2AutoCompleteService],
            template: "\n        <div class=\"ang2-autocomplete-container\" (focusout)=\"focusout()\">\n            <div class=\"ang2-autocomplete-input-field col s12\">\n              <label *ngIf=\"labelName\" class=\"ang2-autocomplete-search-label\"  id=\"ang2-search-label\" for=\"country\">{{labelName}}</label>\n              <input class=\"ang2-autocomplete-search-input\" placeholder={{placeholder}} id=\"ang2searchField\" type=\"text\" class=\"validate filter-input\" [(ngModel)]=query (keyup)=filter()>\n            </div>\n            <div class=\"ang2-autocomplete-suggestions\" *ngIf=\"getListService.filteredList.length > 0\">\n                <ul class=\"ang2-autocomplete-suggestions-list-container\">\n                    <li class=\"ang2-autocomplete-suggestions-list\" *ngFor=\"let item of getListService.filteredList\" (click)=\"select(item)\" [innerHTML]=\"getFormattedList(item)\">\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n        "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, ang2autocomplete_service_1.Ang2AutoCompleteService])
    ], Ag2AutocompleteComponent);
    return Ag2AutocompleteComponent;
}());
exports.Ag2AutocompleteComponent = Ag2AutocompleteComponent;
//# sourceMappingURL=ang2autocomplete.component.js.map