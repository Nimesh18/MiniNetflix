import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
import { ElementScrollPercentageService } from './element-scroll-percentage.service';
import { SubscriberBase } from '../common/models/base/subscriber-base';

@Directive({
  selector: '[element-scroll-percentage]'
})
export class ElementScrollPercentageDirective extends SubscriberBase {

  @Output('element-scroll-percentage') ElementScrollPercentageEvent: EventEmitter<number>;

  constructor(private el: ElementRef,
              private elementScrollPercentageService: ElementScrollPercentageService) { 
                super();
                this.ElementScrollPercentageEvent = new EventEmitter<number>();
              }

  ngOnInit() {
    this.subscriptions.push(this.elementScrollPercentageService.getScrollStream().subscribe((percent: number) => {
      this.ElementScrollPercentageEvent.next(percent);
    }));
  }
}
