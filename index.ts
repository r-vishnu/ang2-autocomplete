import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import { FormsModule}        from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {Ang2AutocompleteComponent} from "./src/ang2autocomplete.component";
import {Ang2AutoCompleteService} from "./src/ang2autocomplete.service";

export * from './src/ang2autocomplete.component';
export * from './src/ang2autocomplete.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    Ang2AutocompleteComponent
  ],
  exports: [
    Ang2AutocompleteComponent
  ]
})
export class Ang2AutocompleteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ang2AutocompleteModule,
      providers: [Ang2AutoCompleteService]
    };
  }
}
