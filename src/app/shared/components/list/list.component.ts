import { Component, Input, OnInit } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { IListService } from 'src/app/core/interfaces/list-service.interface';

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
  @Input() pageSize: number = 10;
  @Input() loadTime: number = 5000;
  @Input() columnGap: number = 10;
  @Input() rowGap: number = 40;

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
      this.loadNext();
    }
  }

  loadNext(): void {
    this.loading = true;

    this.service?.getMany(this.pageSize, this.loadTime).subscribe((items: typeof this.service.dataType[]) => {
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

export enum Orientation {
  Vertical = "vertical",
  Horizontal = "horizontal"
}

export enum CardSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
  Dynamic = "dynamic"
}