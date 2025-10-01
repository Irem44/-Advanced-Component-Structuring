import { Component, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-child2',
  imports: [NgTemplateOutlet],
  template: `
    <ng-container *ngTemplateOutlet="child2Template"></ng-container>
  `,
})
export class Child2Component {
  @Input() child2Template: TemplateRef<HTMLElement>;
}
