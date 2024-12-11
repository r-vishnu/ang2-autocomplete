# ang2-autocomplete


Angular2 Auto Complete


## Installation

To install this library, run:

```bash
$ npm install ang2-autocomplete --save
```

you need angular 19 to use this library

Add `provideHttpClient` in your  `app.config.ts`:
```typescript
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient()
  ]
};
```

Angular component sample `AppComponent`:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ang2AutocompleteComponent } from 'ang2-autocomplete';
@Component({
  selector: 'app-root',
  imports: [CommonModule,Ang2AutocompleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

 
 
 //data fetch from array with key value pair
 arrayOfKeyValues: any[] =
  [{id:1, value:"One"}, {id:2, value:"Two"}, {id:3, value:"Three"}, {id:4, value:"Four"}];
  FormatterArrayObj(obj:any){
  return `<b> <span>${obj.value}</span> </b>`;
}

//data fetch from array
 array: any[] =
  ["this", "is", "array", "of", "text"];
  FormatterArray(text:String){
  return `<b> <span>${text}</span> </b>`;
}


//data from object
object:{}={
  "content":{
   "results" : [
      {         
         "formatted_address" : "Parem Island, Pohnpei, Federated States of Micronesia",        
         
         "place_id" : "ChIJ0bbx8rHO2WURBIil_McbvCs",
         "types" : [ "establishment", "natural_feature" ]
      },
      {
        
         "formatted_address" : "Param, Uttar Pradesh 243701, India",         
         "place_id" : "ChIJtz5uAM-9CjkR50YNZSbIeq4",
         "types" : [ "locality", "political" ]
      },
      {         
         "formatted_address" : "Parem, Federated States of Micronesia",         
         "place_id" : "ChIJLWQZWGSjZ2YRMiPDdVSvFDo",
         "types" : [ "establishment", "natural_feature" ]
      },
      {         
         "formatted_address" : "Pārām, East Azerbaijan Province, Iran",         
         "place_id" : "ChIJLXvQv6nAGUAR5bRRYeZtpnM",
         "types" : [ "locality", "political" ]
      },
      {         
         "formatted_address" : "Param, Mauritania",         
         "place_id" : "ChIJnz0QWXyskg4RZEXjIhOvK6U",
         "types" : [ "establishment", "natural_feature" ]
      }
   ]
 }
};
FormatterObject(Obj:any){
  return `<b> <span>${Obj.formatted_address}</span> </b>`;
}


//on selection we log the new selected data
 onSelectionChange(obj: any) {
  console.log(obj, " *************** ");
 }

}
```

## HTML code

```xml
<!-- <div>
    <h2>Data From Array of objects</h2>
    <ang2-autocomplete
[source]="arrayOfKeyValues"
[listFormatter]="FormatterArrayObj"
keyName="value"
(onSelectionChange)="onSelectionChange($event)"
labelName="search data From Array of objects"
placeholder="search"
></ang2-autocomplete>
  </div> -->



  
  
  
    <!-- <div>
    <h2>Data From Array</h2>
    <ang2-autocomplete
[source]="array"
[listFormatter]="FormatterArray"
(onSelectionChange)="onSelectionChange($event)"
labelName="search data From Array"
placeholder="search Data From Array"
></ang2-autocomplete>
  </div> -->
  
  
  <div>
    <h2>Data From Object Array</h2>
    <ang2-autocomplete
[source]="object"
pathToArray="content.results"
[listFormatter]="FormatterObject"
keyName="formatted_address"
(onSelectionChange)="onSelectionChange($event)"
labelName="Data From Object Array"
placeholder="search"
></ang2-autocomplete>
  </div>

```

## attributes

```xml
source              :  array or string or object contains array, required. data source for dropdown list
placeholder         : string, autocomplete input guide text
listFormatter       : function name, custom list formatting function.e.g. 'myListFormatter', not 'myListFormatter()'
pathToArray       : string, e.g., data.myList, path to array data in http response or in object contains array
keyName            : string, key name of value with which we need to filter  
urlParam           : string, the name of parameter we need to pass in url-param
labelName          : string, key name of text to show. default is value
onSelectionChange   : callback function that is executed when a new dropdown is selected. e.g. (onSelectionChane)="onSelectionChange($event)"
minCharLength       : number, the number of character length to start filtering the given data
```
## Note:

We are aborting the previous calls when we are using urls, so the calls will be fast.
Currently we are working on the css part for auto complete. Now we have to do our own css for look and feel.
