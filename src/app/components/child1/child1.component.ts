import { Component } from '@angular/core';

@Component({
  selector: 'app-child1',
  standalone: true,
  imports: [],
  template: `
    <h1>Child-1 Component</h1>
    <br />
    <ng-content></ng-content>
    <br />
    <ng-content select="header"></ng-content>
    <ng-content select="body"></ng-content>
    <ng-content select=".multiple"></ng-content>
    <ng-content select="footer"></ng-content>
  `,
})
export class Child1Component {}
