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
  @Input() loadItems: number = 3;
  @Input() gap: number = 40;

  loading: boolean = true;
  Orientations = Orientation;

  constructor() {
    
  }
  
  ngOnInit(): void { 
    if (this.items.length === 0) {
      this.service?.getMany(10, 5000).subscribe((items: typeof this.service.dataType[]) => {
        this.items = items;
        this.loading = false;
      });
    }
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