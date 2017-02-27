# ang2-autocomplete


##Angular2 Auto Complete

##Live DEMO
Plunker example: https://plnkr.co/edit/5zRD0fcOZHXEMOk4kupY?p=preview

## Installation

To install this library, run:

```bash
$ npm install ang2-autocomplete --save
```

 add `map` and `packages` to your  `systemjs.config.js`:
```typescript
map['ang2-autocomplete'] = 'node_modules/ang2-autocomplete/dist';
packages['ang2-autocomplete'] = { defaultExtension:   defaultExtension: 'js',
  main:'index'
}
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Ang2AutocompleteModule } from 'ang2-autocomplete';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ang2AutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage it in your code

```xml
<ang2-autocomplete
  path-to-array="data.SearchUserDetails"
  [sourceName]="arrayOfStrings"
  [listFormatter]="myListFormatter"
  key-name="formatted_address"
  url-param-name="query"
  minCharLength=3
  (onSelectionChange)="onSelectionChane($event)"
  label-name="search"
  placeholder="search"
</ang2-autocomplete>

```

## attributes

```xml
source              :  array or string or object contains array, required. data source for dropdown list
placeholder         : string, autocomplete input guide text
listFormatter       : function variable name, custom list formatting function.e.g. 'myListFormatter', not 'myListFormatter()'
path-to-array       : string, e.g., data.myList, path to array data in http response or in object contains array
key-name            : string, key name of value with which we need to filter  
url-param           : string, the name of parameter we need to pass in url-param
label-name          : string, key name of text to show. default is value
onSelectionChange   : callback function that is executed when a new dropdown is selected. e.g. (onSelectionChane)="onSelectionChane($event)"
minCharLength       : number, the number of character length to start filtering the given data
```
## Note:

We are aborting the previous calls when we are using urls, so the calls will be fast.
Currently we are working on the css part for auto complete. Now we have to do our own css for look and feel.
