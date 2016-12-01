import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import { FormsModule}        from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {Ag2AutocompleteComponent} from "./src/ang2autocomplete.component";
import {Ang2AutoCompleteService} from "./src/ang2autocomplete.service";

export * from './src/sample.component';
export * from './src/ang2autocomplete.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    Ag2AutocompleteComponent
  ],
  exports: [
    Ag2AutocompleteComponent
  ]
})
export class Ag2AutocompleteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ag2AutocompleteModule,
      providers: [Ang2AutoCompleteService]
    };
  }
}
