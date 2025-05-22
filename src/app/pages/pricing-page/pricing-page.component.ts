import { Meta, Title } from '@angular/platform-browser';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Component({
  selector        : 'app-pricing-page',
  imports         : [],
  templateUrl     : './pricing-page.component.html',
  styleUrl        : './pricing-page.component.css',
})
export default class PricingPageComponent implements OnInit {

  private title = inject(Title);
  private meta  = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    if( !isPlatformServer(this.platform) ) document.title = 'Pricing Page';
    if( isPlatformServer(this.platform) ) this.title.setTitle('Pricing Page');

    this.meta.updateTag({
      name    : 'Description',
      content : 'Este es mi Pricing page',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Pricing Page'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular,Curso,Developer'
    });
  }

}
