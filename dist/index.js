"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ang2autocomplete_component_1 = require("./ang2autocomplete.component");
var ang2autocomplete_service_1 = require("./ang2autocomplete.service");
__export(require("./ang2autocomplete.component"));
__export(require("./ang2autocomplete.service"));
var Ang2AutocompleteModule = Ang2AutocompleteModule_1 = (function () {
    function Ang2AutocompleteModule() {
    }
    Ang2AutocompleteModule.forRoot = function () {
        return {
            ngModule: Ang2AutocompleteModule_1,
            providers: [ang2autocomplete_service_1.Ang2AutoCompleteService]
        };
    };
    return Ang2AutocompleteModule;
}());
Ang2AutocompleteModule = Ang2AutocompleteModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpModule
        ],
        declarations: [
            ang2autocomplete_component_1.Ang2AutocompleteComponent
        ],
        exports: [
            ang2autocomplete_component_1.Ang2AutocompleteComponent
        ]
    })
], Ang2AutocompleteModule);
exports.Ang2AutocompleteModule = Ang2AutocompleteModule;
var Ang2AutocompleteModule_1;
//# sourceMappingURL=index.js.map