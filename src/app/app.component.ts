import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Child1Component } from './components/child1/child1.component';
import { CommonModule, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { Child2Component } from './components/child2/child2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Child1Component, NgForOf, NgIf, NgTemplateOutlet, Child2Component],
  template: `
    <!-- ngContent -->
    <app-child1>
      <span>Hellooo ngContent</span>
      <header>NgContent</header>
      <body>
        We will learn ngContent here

        <div class="multiple">Multiple NgContent</div>
      </body>

      <footer>İmportant a structure</footer>
    </app-child1>
    <br /><br /><br />

    <!-- ngContainer -->
    <h1>Fruits List</h1>
    <ul>
      <ng-container *ngFor="let f of fruits">
        <li *ngIf="f.available">
          {{ f.name }}
        </li>
      </ng-container>
    </ul>

    <!-- ngTemplate(Burada ngTemplate'i aktif etmek için ngTemplateOutler directive'i kullanıldı) -->

    <ng-container *ngTemplateOutlet="exptemplate"
      >Hello NgContainer</ng-container
    >

    <ng-template #exptemplate>Hello ngTemplate</ng-template>

    <br />
    <br />

    <!-- 
    ngTemplate Kullanımları:

    1)if else durumlarına göre şablon gösterimleri
    -->
    <div *ngIf="age > 20; then template1; else template2"></div>

    <ng-template #template1>Yaş 20'den büyük</ng-template>
    <ng-template #template2>Yaş 20'den küçüktür</ng-template>

    <br />
    <br />

    <!-- ngTemplateOutletContext -->
    <ng-container
      [ngTemplateOutlet]="contenttemplate"
      [ngTemplateOutletContext]="{ data: 'hello context' }"
    ></ng-container>

    <ng-template #contenttemplate let-data="data">
      Content :{{ data }}
    </ng-template>
    <br /><br />

    <ng-container
      *ngTemplateOutlet="
        templateProducts;
        context: { data: { name: 'shoes', price: 5000 } }
      "
    ></ng-container>
    <ng-template #templateProducts let-data="data">
      {{ data.name }}-{{ data.price }}
    </ng-template>

    <br /><br />
    <ng-container
      [ngTemplateOutlet]="books"
      [ngTemplateOutletContext]="{
        data1: { name: 'Book-1', Author: 'Author-1' },
        data2: { name: 'Book-2', Author: 'Author-2' },
        data3: { name: 'Book-3', Author: 'Author-3' }
      }"
    ></ng-container>

    <ng-template #books let-data1="data1" let-data2="data2" let-data3="data3">
      {{ data1.name }}-{{ data1.Author }} <br />
      {{ data2.name }}-{{ data2.Author }} <br />
      {{ data3.name }}-{{ data3.Author }} <br />
    </ng-template>

    <br /><br />
    <ng-container
      *ngTemplateOutlet="
        books;
        context: {
          data1: { name: 'Book-1', Author: 'Author-1' },
          data2: { name: 'Book-2', Author: 'Author-2' },
          data3: { name: 'Book-3', Author: 'Author-3' }
        }
      "
    ></ng-container>

    <ng-template #books let-data1="data1" let-data2="data2" let-data3="data3">
      {{ data1.name }}-{{ data1.Author }} <br />
      {{ data2.name }}-{{ data2.Author }} <br />
      {{ data3.name }}-{{ data3.Author }} <br />
    </ng-template>

    <br /><br />
    <ng-container
      [ngTemplateOutlet]="datas"
      [ngTemplateOutletContext]="{ $implicit: 'default value' }"
    ></ng-container>

    <ng-template #datas let-data1 let-data2 let-data3>
      {{ data1 }} - {{ data2 }} - {{ data3 }}
    </ng-template>

    <br />
    <br />

    <ng-template #template> Parent component template component </ng-template>

    <app-child2 [child2Template]="template"> </app-child2>

    <br /><br />

    <!-- ViewChild 
    !!Burada static parametresini true verdiğimizde ngOnInit içinde de erişebiliriz. 
    -->
    <input type="text" value="Hello ViewChild" #txtInput />
    <br /><br />

    <button #button>First Button</button>
    <button #button2>Second Button</button>
    <button #button>Third Button</button>

    <br /><br />

    <div #div>Div1</div>
    <div #div>Div2</div>
    <div #div>Div3</div>
  `,
})
export class AppComponent {
  @ViewChild('txtInput', { static: true }) txtInput: ElementRef;

  @ViewChild('button', { static: true }) buttonElement: ElementRef;
  @ViewChild('button2', { static: true }) button2Element: ElementRef;

  @ViewChildren('div') _div: QueryList<ElementRef>;

  ngOnInit() {
    this.button2Element.nativeElement.style.backgroundColor = 'green';
  }

  ngAfterViewInit() {
    console.log(this.txtInput.nativeElement.value);
    this.buttonElement.nativeElement.style.backgroundColor = 'red';
    console.log(this._div);
  }

  age: number = 25;
  value: boolean = false;

  fruits = [
    { name: 'Apple', available: true },
    { name: 'Banana', available: false },
    { name: 'Orange', available: true },
    { name: 'Mango', available: false },
    { name: 'Pineapple', available: true },
  ];
}
