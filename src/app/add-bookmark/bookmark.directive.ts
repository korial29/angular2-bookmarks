import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})
export class BookmarkDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}
