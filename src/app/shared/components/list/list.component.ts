import { Component, Input, OnInit } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { IListService } from 'src/app/core/interfaces/list-service.interface';
import { CardSize } from '../../models/card-size';
import { Orientation } from '../../models/orientation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  @Input({required:true}) service!: IListService;
  @Input() items: typeof this.service.dataType[] = [];
  @Input() cardSize: CardSize | string = CardSize.Small; // TODO: Card size on all card components. Make a base component or interface that gets implemented.
  @Input() orientation: Orientation | string = Orientation.Vertical;
  @Input() pageSize: number = 3;
  @Input() loadTime: number = 5000;
  @Input() columnGap: number = 10;
  @Input() rowGap: number = 40;
  @Input() paging: boolean = false;

  currentPage: number = 1;
  lastPage: number = this.currentPage;
  loading: boolean = true;
  Orientations = Orientation;

  nextPageCallback: Function = this.nextPage.bind(this);
  previousPageCallback: Function = this.previousPage.bind(this);

  constructor() {
    
  }
  
  ngOnInit(): void { 
    if (this.items.length === 0) {
      this.loadNext(this.pageSize * 3);
    }
    else {
      this.lastPage = this.items.length / this.pageSize;
    }
  }

  loadNext(count: number = this.pageSize): void {
    this.loading = true;

    this.service?.getMany(count, this.loadTime).subscribe((items: typeof this.service.dataType[]) => {
      this.items.push(...items);
      this.loading = false;
    });
  }

  nextPage(): void {
    this.lastPage = ++this.currentPage;

    if (this.pageSize * this.currentPage > this.items.length)
      this.loadNext();
  }

  previousPage(): void {
    if (this.currentPage > 1)
      this.currentPage--;
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return this.startIndex + this.pageSize;
  }

  get paginatedItems(): any[] {
    return this.loading && this.currentPage === this.lastPage 
    ? this.items.slice(0, this.pageSize) 
    : this.items.slice(this.startIndex, this.endIndex);
  }
}