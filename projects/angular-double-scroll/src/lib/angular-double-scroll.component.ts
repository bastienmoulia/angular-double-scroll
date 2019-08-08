import { Component, Input, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'double-scroll',
  template: `
    <div [ngStyle]="{'overflow-x': overflow}" (scroll)="scrollTop($event)" id="ngds-scroll-top">
      <div [ngStyle]="{'height': height + 'px'}"></div>
    </div>
    <div [ngStyle]="{'overflow-x': overflow, 'height': '100%'}" (scroll)="scrollContent($event)" id="ngds-content">
      <div style="display: inline-block;" #element>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: []
})
export class AngularDoubleScrollComponent implements OnDestroy, AfterViewInit {

  @Input() overflow: 'auto' | 'scroll' = 'auto';
  @ViewChild('element', {static: true}) element: ElementRef;
  dataChanges: Subscription = null;
  height = 1;

  constructor(
    private contentObserver: ContentObserver
  ) { }

  ngAfterViewInit() {
    this.resize();
    this.dataChanges = this.contentObserver.observe(this.element.nativeElement)
      .subscribe((event: MutationRecord[]) => {
        this.resize();
    });
  }

  ngOnDestroy(){
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

}
