import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAddAttribute]'
})

export class AddAttributeDirective implements OnInit {

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    //?? attribute shows but validation doesn't work
    this.renderer2.setAttribute(this.elementRef.nativeElement, 'maxlength', '6');
    this.elementRef.nativeElement.maxLength = 10;
  }

}