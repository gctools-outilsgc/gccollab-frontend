import { Component, Input, OnInit } from '@angular/core';
import { TooltipDirection } from '../../models/tooltip-direction';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class PollFormComponent implements OnInit {
  @Input() model: IPollForm = {
    description: '',
    options: ['', ''],
    photo: ''
  }

  maxOptions: number = 10;
  tooltipDirection = TooltipDirection;
  
  ngOnInit(): void {

  }

  addOption(): void {
    if (this.model.options.length < this.maxOptions)
      this.model.options.push('');
  }

  removeOption(index: number): void {
    if (this.model.options.length <= 2) 
      return;

    this.model.options.splice(index, 1);
  }
}

export interface IPollForm {
  description: string;
  options: string[];
  photo: string;
}