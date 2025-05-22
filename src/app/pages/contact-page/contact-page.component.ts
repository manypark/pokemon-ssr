import { Meta, Title } from '@angular/platform-browser';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector        : 'app-contact-page',
  imports         : [],
  templateUrl     : './contact-page.component.html',
  styleUrl        : './contact-page.component.css',
})
export default class ContactPageComponent implements OnInit {

  private title = inject(Title);
  private meta  = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({
      name    : 'Description',
      content : 'Este es mi Contact page',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Contact Page'
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Angular,Curso,Developer'
    });
  }

}
