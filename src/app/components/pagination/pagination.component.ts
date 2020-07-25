import { Component, OnInit, OnChanges, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

   
  @Input() totalRecords: number = 0;  
  @Input() recordsPerPage: number = 0;  

  @Output() page: EventEmitter<number> = new EventEmitter();  

  public pages: number [] = [];  
  activePage:number;  

  ngOnChanges(){  
    const pageCount = this.getPageCount();  
    this.pages = this.getArrayOfPage(pageCount);  
    this.activePage = 0;  
    this.page.emit(0);  
  }  

  private  getPageCount(): number {  
    let totalPage:number = 0;  
      if(this.totalRecords > 0 && this.recordsPerPage > 0){  
      const pageCount = this.totalRecords / this.recordsPerPage;  
      const roundedPageCount = Math.floor(pageCount);  
      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;  
    }  
    return totalPage;  
  }  



   private getArrayOfPage(pageCount : number) : number [] {  
    let pageArray : number [] = [];  
    if(pageCount > 0){  
        for(var i=1 ; i<= pageCount ; i++){  
          pageArray.push(i);  
        }  
    }  
    return pageArray;  
  }  

  onClickPage(pageNumber:number){  
  this.activePage = pageNumber;  
  this.page.emit(this.activePage);  
  }  
}
