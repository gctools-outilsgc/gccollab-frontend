import { Component, Input, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { NgComponentOutlet } from '@angular/common';
import { IListService } from 'src/app/core/interfaces/list-service.interface';
import { CardSize } from '../../models/card-size';
import { Orientation } from '../../models/orientation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input({ required: true }) service!: IListService;
  @Input() items: (typeof this.service.dataType)[] = [];
  @Input() cardSize: CardSize | string = CardSize.Small;
  @Input() orientation: Orientation | string = Orientation.Vertical;
  @Input() columnGap: number = 10;
  @Input() rowGap: number = 40;
  @Input() paging: boolean = false;
  @Input() pageSize: number = 3;
  @Input() pagesToLoad: number = 3;
  @Input() loadTime: number = 5000;

  currentPage = 1;
  lastPage = this.currentPage;
  loading = false;
  Orientations = Orientation;

  nextPageCallback = this.nextPage.bind(this);
  previousPageCallback = this.previousPage.bind(this);

  constructor() {}

  ngOnInit(): void {
    if (this.items.length === 0) {
      this.loadNext(this.pageSize * (this.paging ? this.pagesToLoad : 1));
    } else {
      this.lastPage = Math.ceil(this.items.length / this.pageSize);
    }
  }

  loadNext(_count: number = this.pageSize): void {
    this.loading = true;

    this.service?.getMany(_count, this.loadTime).subscribe((items: (typeof this)['service']['dataType'][]) => {
      this.items.push(...items);
      this.lastPage = Math.ceil(this.items.length / this.pageSize);
      this.loading = false;
    });
  }

  nextPage(): void {
    this.lastPage = ++this.currentPage;

    if (!this.loading && this.pageSize * this.currentPage > this.items.length) this.loadNext(this.pageSize * this.pagesToLoad);
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return this.startIndex + this.pageSize;
  }

  get paginatedItems(): (typeof this)['service']['dataType'][] {
    return this.loading && this.currentPage === this.lastPage ? this.items.slice(0, this.pageSize) : this.items.slice(this.startIndex, this.endIndex);
  }
}
