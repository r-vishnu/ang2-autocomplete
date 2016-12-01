# ang2-autocomplete
an auto complete module for angular 2

install ang2-autocomplete

$ npm install ang2-autocomplete --save

add map and packages to your systemjs.config.js

map['ang2-autocomplete'] = 'node_modules/ang2-autocomplete/dist';
packages['ang2-autocomplete'] = { defaultExtension: 'js', main:'index' }

import Ng2AutoCompleteModule to your AppModule

import { Ag2AutocompleteModule } from 'ang2-autocomplete';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, Ag2AutocompleteModule],
  declarations: [AppComponent],
  providers: [HTTP_PROVIDERS],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

Usage it in your code

<ang2-autocomplete
  path-to-array="data.SearchUserDetails"
  [sourceName]="arrayOfStrings"
  [listFormatter]="test"
  key-name="formatted_address"
  url-param-name="query"
  (onSelectionChane)="onSelectionChane($event)"
  label-name="search"
  placeholder="search"
</ang2-autocomplete>


attributes

source              :  array or string or object contains array, required. data source for dropdown list
placeholder         : string, autocomplete input guide text
listFormatter       : function variable name, custom list formatting function.e.g. 'myListFormatter', not           'myListFormatter()'
path-to-array       : string, e.g., data.myList, path to array data in http response or in object contains array
key-name            : string, key name of value with which we need to filter  
url-param           :string, the name of parameter we need to pass in url-param
label-name          :string, key name of text to show. default is value
onSelectionChane    : callback function that is executed when a new dropdown is selected. e.g. (onSelectionChane)="onSelectionChane($event)"
