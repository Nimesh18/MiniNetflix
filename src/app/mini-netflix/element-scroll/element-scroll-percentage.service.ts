import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class ElementScrollPercentageService {

  constructor() { }

  getScrollStream(node: Document | Element = document): Observable<number> {
    const element = (node instanceof Element) ? node: window;
    return fromEvent(element, "scroll").pipe(debounceTime(400), distinctUntilChanged(), map((event: UIEvent): number => this.getScroll(node)));
  }

  getScroll(node: Document | Element = document): number {
    const currentScroll = this.getCurrentScroll(node),
    maxScroll = this.getMaxScroll(node);
    let percentage = currentScroll / Math.max(maxScroll, 1);
    if (percentage > 1) percentage %= 1;
    return percentage * 100;
  }

  private getMaxScroll(node: Document | Element): number {
    if (node instanceof Element)
      return node.scrollHeight - node.clientHeight;
    
    const scrollHeight = Math.max(
      node.body.scrollHeight,
      node.body.offsetHeight,
      node.body.clientHeight,
      node.documentElement.scrollHeight,
      node.documentElement.offsetHeight,
      node.documentElement.clientHeight);

    const clientHeight = node.documentElement.clientHeight;

    return scrollHeight - clientHeight;
  }

  private getCurrentScroll(node: Document | Element): number {
    return (node instanceof Element) ? node.scrollTop : window.pageYOffset;
  }
}
