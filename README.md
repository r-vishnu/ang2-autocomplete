# ang2-autocomplete
an auto complete module for angular 2

install ang2-autocomplete

$ npm install ang2-autocomplete --save
add map and packages to your systemjs.config.js
 
map['ang2-autocomplete'] = 'node_modules/ang2-autocomplete/dist';
packages['ang2-autocomplete'] = { defaultExtension: 'js', main:'index' }
import Ag2AutocompleteModule to your AppModule

import { Ag2AutocompleteModule } from 'ang2-autocomplete';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, Ag2AutocompleteModule],
  declarations: [AppComponent],
  providers: [HTTP_PROVIDERS],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
