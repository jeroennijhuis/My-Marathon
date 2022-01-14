import { Component, Input, OnInit } from '@angular/core';
import { faMountain, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent {

  @Input() public title: string | undefined;

  @Input() public text: string | undefined;
  @Input() public subText: string | undefined;

  @Input() public icon: IconDefinition = faMountain;
  @Input() public iconColor: string = '#4154f1';
  @Input() public iconBackgroundColor: string = '#f6f6fe';
}
