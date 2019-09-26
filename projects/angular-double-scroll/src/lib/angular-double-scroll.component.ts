import { Component, Input, ViewChild, ElementRef, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'double-scroll',
  template: `
    <div [ngStyle]="{'overflow-x': overflow}" (scroll)="scrollTop($event)" id="ngds-scroll-top">
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
export class AngularDoubleScrollComponent implements OnDestroy, AfterViewInit, OnInit {

  /** CSS overflow propertie */
  @Input() overflow: 'auto' | 'scroll' = 'auto';
  /** Size of the scroll bar in px */
  @Input() scrollSize;
  @ViewChild('element', {static: true}) element: ElementRef;
  dataChanges: Subscription = null;

  constructor(
    private contentObserver: ContentObserver
  ) { }

  ngOnInit() {
    if (!this.scrollSize) {
      this.scrollSize = this.getScrollbarWidth();
    }
  }

  ngAfterViewInit() {
    this.resize();
    this.dataChanges = this.contentObserver.observe(this.element.nativeElement)
      .subscribe((event: MutationRecord[]) => {
        this.resize();
    });
  }

  ngOnDestroy() {
    this.dataChanges.unsubscribe();
  }

  resize() {
    const width = document.querySelector('#ngds-content>div').clientWidth;
    (document.querySelector('#ngds-scroll-top>div') as HTMLElement).style.width = `${width}px`;
  }

  scrollTop(event: { target: HTMLInputElement; }) {
    document.querySelector('#ngds-content').scrollLeft = event.target.scrollLeft;
  }

  scrollContent(event: { target: HTMLInputElement; }) {
    document.querySelector('#ngds-scroll-top').scrollLeft = event.target.scrollLeft;
  }


  getScrollbarWidth(): number {

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
