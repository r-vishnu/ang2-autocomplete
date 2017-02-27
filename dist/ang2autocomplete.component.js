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
var core_1 = require("@angular/core");
var ang2autocomplete_service_1 = require("./ang2autocomplete.service");
var Ang2AutocompleteComponent = (function () {
    function Ang2AutocompleteComponent(myElement, getListService) {
        this.myElement = myElement;
        this.getListService = getListService;
        this.query = '';
        this.onSelectionChange = new core_1.EventEmitter();
        this.keyName = '';
        this.statesss = 'out';
        this.minCharLength = 0;
        this.elementRef = myElement;
        this.pathToArray = myElement.nativeElement.getAttribute('path-to-array');
        this.keyName = myElement.nativeElement.getAttribute('key-name');
        this.minCharLength = (myElement.nativeElement.getAttribute('minCharLength') != null && myElement.nativeElement.getAttribute('minCharLength') > 0) ? myElement.nativeElement.getAttribute('minCharLength') : 0;
        this.urlParamName = myElement.nativeElement.getAttribute('url-param-name');
        this.labelName = myElement.nativeElement.getAttribute('label-name');
        this.placeholder = myElement.nativeElement.getAttribute('placeholder');
    }
    Ang2AutocompleteComponent.prototype.handleClick = function (event) {
        var vm = this;
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.focusout();
        }
    };
    Ang2AutocompleteComponent.prototype.filter = function () {
        var vm = this;
        if (this.query !== "" && this.query.length >= this.minCharLength) {
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
            this.statesss = 'out';
            setTimeout(function () {
                vm.getListService.filteredList = [];
            }, 899);
        }
    };
    Ang2AutocompleteComponent.prototype.getDataFromArray = function (data) {
        var vm = this;
        this.getListService.filteredList = data.filter(function (el) {
            var content = (el[this.keyName]) ? el[this.keyName] : el;
            return content.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
        this.statesss = 'in';
    };
    Ang2AutocompleteComponent.prototype.isArray = function () {
        return (this.sourceName.constructor.name === "Array");
    };
    Ang2AutocompleteComponent.prototype.isObject = function () {
        return (this.sourceName.constructor.name === "Object");
    };
    Ang2AutocompleteComponent.prototype.getDataFromObject = function (res) {
        var pathArray = this.pathToArray.split(".");
        var raw = res;
        for (var i = 0; i < pathArray.length; i++) {
            var a = pathArray[i];
            raw = raw[a];
        }
        this.getDataFromArray(raw);
    };
    Ang2AutocompleteComponent.prototype.getDataFromUrl = function () {
        var vm = this;
        if (this.pendingRequest) {
            this.pendingRequest.unsubscribe();
        }
        this.pendingRequest = this.getListService.searchUser(this.query.toLowerCase(), this.sourceName, this.urlParamName)
            .subscribe(function (res) {
            vm.getDataFromObject(res);
        });
    };
    Ang2AutocompleteComponent.prototype.getFormattedList = function (data) {
        var formatter = this.listFormatter || this.defaultListFormatter;
        return formatter.apply(this, [data]);
    };
    Ang2AutocompleteComponent.prototype.defaultListFormatter = function (data) {
        var html = "";
        var content = (data[this.keyName]) ? data[this.keyName] : data;
        html += "<span>" + content + "</span>";
        return html;
    };
    Ang2AutocompleteComponent.prototype.focusout = function () {
        var vm = this;
        if (this.pendingRequest) {
            this.pendingRequest.unsubscribe();
        }
        this.statesss = 'out';
        setTimeout(function () {
            vm.getListService.filteredList = [];
        }, 899);
    };
    Ang2AutocompleteComponent.prototype.select = function (item) {
        var data = (item[this.keyName]) ? item[this.keyName] : item;
        ;
        this.query = data;
        this.getListService.filteredList = [];
        this.onSelectionChange.emit(item);
    };
    return Ang2AutocompleteComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], Ang2AutocompleteComponent.prototype, "onSelectionChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], Ang2AutocompleteComponent.prototype, "listFormatter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Ang2AutocompleteComponent.prototype, "sourceName", void 0);
Ang2AutocompleteComponent = __decorate([
    core_1.Component({
        selector: 'ang2-autocomplete',
        host: {
            '(document:click)': 'handleClick($event)',
        },
        providers: [ang2autocomplete_service_1.Ang2AutoCompleteService],
        template: "\n        <div class=\"ang2-autocomplete-container\">\n            <div class=\"ang2-autocomplete-input-field col s12\">\n              <label *ngIf=\"labelName\" class=\"ang2-autocomplete-search-label\"  id=\"ang2-search-label\" for=\"country\">{{labelName}}</label>\n              <input class=\"ang2-autocomplete-search-input\" placeholder={{placeholder}} id=\"ang2searchField\" type=\"text\" class=\"validate filter-input\" [(ngModel)]=query (keyup)=filter()>\n            </div>\n            <div class=\"ang2-autocomplete-suggestions\" *ngIf=\"getListService.filteredList.length > 0\">\n                <ul class=\"ang2-autocomplete-suggestions-list-container\">\n                    <li [@shrinkOut]='statesss' class=\"ang2-autocomplete-suggestions-list\" *ngFor=\"let item of getListService.filteredList\" (click)=\"select(item)\" [innerHTML]=\"getFormattedList(item)\">\n                    </li>\n                </ul>\n            </div>\n        </div> ",
        animations: [
            core_1.trigger('shrinkOut', [
                core_1.state('in', core_1.style({ opacity: 1, transform: 'translateY(0)' })),
                core_1.state('out', core_1.style({ opacity: 0, transform: 'translateY(-100%)' })),
                core_1.transition('void => *', [
                    core_1.style({
                        opacity: 0,
                        transform: 'translateY(-100%)'
                    }),
                    core_1.animate('1s ease-in')
                ]),
                core_1.transition('in => out', [
                    core_1.style({
                        opacity: 1,
                        transform: 'translateY(0)'
                    }),
                    core_1.animate('1s ease-out')
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, ang2autocomplete_service_1.Ang2AutoCompleteService])
], Ang2AutocompleteComponent);
exports.Ang2AutocompleteComponent = Ang2AutocompleteComponent;
//# sourceMappingURL=ang2autocomplete.component.js.map