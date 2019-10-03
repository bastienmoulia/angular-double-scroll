import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'double-scroll',
  template: `
    <div [ngStyle]="{'overflow-x': overflow}" (scroll)="scrollTop($event)" id="ngds-scroll-top" *ngIf="!onlyOne">
      <div [ngStyle]="{'height': scrollSize + 'px'}"></div>
    </div>
    <div [ngStyle]="{'overflow-x': overflow, 'height': 'calc(100% - ' + scrollSize + 'px)'}"
    (scroll)="scrollContent($event)" id="ngds-content">
      <div style="display: inline-block; min-width: 100%;" #element>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: []
})
export class AngularDoubleScrollComponent implements OnInit, AfterViewChecked {

  /** CSS overflow propertie */
  @Input() overflow: 'auto' | 'scroll' = 'auto';
  /** Size of the scroll bar in px */
  @Input() scrollSize: number;
  /** Option to show only one scrollbar */
  @Input() onlyOne = false;
  @ViewChild('element', {static: true}) element: ElementRef;
  dataChanges: Subscription = null;

  constructor(
    private hostElement: ElementRef
  ) { }

  ngOnInit() {
    if (!this.scrollSize) {
      this.scrollSize = this.getScrollbarWidth();
    }
  }

  ngAfterViewChecked() {
    this.resize();
  }

  private resize() {
    const width = this.element.nativeElement.clientWidth;
    const scrollTopDiv = this.hostElement.nativeElement.querySelector('#ngds-scroll-top>div');
    if (scrollTopDiv) {
      scrollTopDiv.style.width = `${width}px`;
    }
  }

  scrollTop(event: { target: HTMLInputElement; }) {
    this.hostElement.nativeElement.querySelector('#ngds-content').scrollLeft = event.target.scrollLeft;
  }

  scrollContent(event: { target: HTMLInputElement; }) {
    const scrollTop = this.hostElement.nativeElement.querySelector('#ngds-scroll-top');
    if (scrollTop) {
      scrollTop.scrollLeft = event.target.scrollLeft;
    }
  }

  private getScrollbarWidth(): number {

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth || 15;
  }

}
