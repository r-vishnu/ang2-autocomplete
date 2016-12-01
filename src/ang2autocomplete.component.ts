import { Component,ElementRef, EventEmitter, Input, Output  } from '@angular/core';
import { Ang2AutoCompleteService } from './ang2autocomplete.service';

@Component({
    selector: 'ang2-autocomplete',
    providers: [Ang2AutoCompleteService],
    template: `
        <div class="ang2-autocomplete-container" (focusout)="focusout()">
            <div class="ang2-autocomplete-input-field col s12">
              <label *ngIf="labelName" class="ang2-autocomplete-search-label"  id="ang2-search-label" for="country">{{labelName}}</label>
              <input class="ang2-autocomplete-search-input" placeholder={{placeholder}} id="ang2searchField" type="text" class="validate filter-input" [(ngModel)]=query (keyup)=filter()>
            </div>
            <div class="ang2-autocomplete-suggestions" *ngIf="getListService.filteredList.length > 0">
                <ul class="ang2-autocomplete-suggestions-list-container">
                    <li class="ang2-autocomplete-suggestions-list" *ngFor="let item of getListService.filteredList" (click)="select(item)" [innerHTML]="getFormattedList(item)">
                    </li>
                </ul>
            </div>
        </div>

        `
})
export class Ag2AutocompleteComponent {
  public query = '';
  public elementRef:any;
  pendingRequest:any;
  @Output() onSelectionChane = new EventEmitter<any>();
  @Input()  listFormatter: (arg: any) => string;
  @Input() sourceName: any;
  private pathToArray: string;
  private keyName: string;
  private urlParamName: string;
  private labelName: string;
  private placeholder: string;

  constructor(public myElement: ElementRef,private getListService: Ang2AutoCompleteService) {
        this.elementRef   =   myElement;
        this.pathToArray  =   myElement.nativeElement.getAttribute('path-to-array');
        this.keyName      =   myElement.nativeElement.getAttribute('key-name');
        this.urlParamName =   myElement.nativeElement.getAttribute('url-param-name');
        this.labelName    =   myElement.nativeElement.getAttribute('label-name');
        this.placeholder  =   myElement.nativeElement.getAttribute('placeholder');
    }
    filter() {
    if (this.query !== ""){
      if(this.isArray()){
        this.getDataFromArray(this.sourceName);
      }else if(this.isObject()){
        this.getDataFromObject(this.sourceName);
      }else{
        this.getDataFromUrl();
      }
    }else{
        this.getListService.filteredList = [];
    }
}
getDataFromArray(data:any[]){
  let vm = this;
  this.getListService.filteredList = data.filter(function(el:any){
            let content = (el[this.keyName])?el[this.keyName]:el;
            return content.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          }.bind(this));
}
isArray(){
    return (this.sourceName.constructor.name === "Array");
}
isObject(){
    return (this.sourceName.constructor.name === "Object");
}
getDataFromObject(res:any){
  let pathArray:any[] = this.pathToArray.split(".");
  let raw:any[]=res;
  for(let i=0;i<pathArray.length;i++){
    let a = pathArray[i];
    raw = raw[a];
  }
  this.getDataFromArray(raw);
}
getDataFromUrl(){
  let vm = this;
  if(this.pendingRequest){
     this.pendingRequest.unsubscribe();
  }
  this.pendingRequest = this.getListService.searchUser(this.query.toLowerCase(),this.sourceName,this.urlParamName)
  .subscribe(res => {
    vm.getDataFromObject(res);
  });
}
getFormattedList(data:any){
  let formatter =  this.listFormatter || this.defaultListFormatter;
  return formatter.apply(this, [data]);
}
defaultListFormatter(data:any){
  let html = "";
  let content = (data[this.keyName])?data[this.keyName]:data;
  html += `<span>${content}</span>`;
  return html;
}

focusout(){
  let vm = this;
  if(this.pendingRequest){
     this.pendingRequest.unsubscribe();
  }
  setTimeout(function() {
    vm.getListService.filteredList = [];
  }, 600);
}
select(item:any){
    this.query = item[this.keyName];
    this.getListService.filteredList = [];
    this.onSelectionChane.emit(item);
}

}
